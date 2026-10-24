using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;

namespace SeoWatcher
{
    /// <summary>A private, per-launch loopback capability for the worker. No
    /// browser origins, CORS, cookies, request bodies or arbitrary commands.</summary>
    internal sealed class WindowsSettingsBridge : IDisposable
    {
        private readonly TcpListener listener;
        private readonly Func<string> read;
        private readonly Action<string, bool> write;
        private volatile bool stopped;
        public int Port { get; private set; }
        public string Token { get; private set; }

        public WindowsSettingsBridge(Func<string> read, Action<string, bool> write)
        {
            this.read = read;
            this.write = write;
            var bytes = new byte[32];
            using (var random = RandomNumberGenerator.Create()) random.GetBytes(bytes);
            Token = BitConverter.ToString(bytes).Replace("-", "").ToLowerInvariant();
            listener = new TcpListener(IPAddress.Loopback, 0);
            listener.Start(4);
            Port = ((IPEndPoint)listener.LocalEndpoint).Port;
            new Thread(Serve) { IsBackground = true, Name = "Windows settings" }.Start();
        }

        private void Serve()
        {
            while (!stopped)
            {
                try
                {
                    using (var client = listener.AcceptTcpClient())
                    {
                        client.SendTimeout = 2000;
                        using (var stream = client.GetStream()) Handle(stream);
                    }
                }
                catch (Exception) { /* An invalid or disconnected peer is isolated. */ }
            }
        }

        private void Handle(NetworkStream stream)
        {
            // Bound both size and total read time, including slow partial headers.
            var header = new StringBuilder();
            var deadline = DateTime.UtcNow.AddSeconds(2);
            while (header.Length < 8192)
            {
                int remaining = (int)(deadline - DateTime.UtcNow).TotalMilliseconds;
                if (remaining <= 0) return;
                stream.ReadTimeout = remaining;
                int value = stream.ReadByte();
                if (value < 0) return;
                if (value > 127) { Reply(stream, 400, "{}"); return; }
                header.Append((char)value);
                int n = header.Length;
                if (n >= 4 && header[n - 4] == '\r' && header[n - 3] == '\n' && header[n - 2] == '\r' && header[n - 1] == '\n') break;
            }
            string text = header.ToString();
            if (!text.EndsWith("\r\n\r\n")) { Reply(stream, 400, "{}"); return; }
            string[] lines = text.Split(new[] { "\r\n" }, StringSplitOptions.None);
            string[] first = lines[0].Split(' ');
            if (first.Length != 3 || first[2] != "HTTP/1.1") { Reply(stream, 400, "{}"); return; }
            var headers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            for (int i = 1; i < lines.Length && lines[i] != ""; i++)
            {
                int colon = lines[i].IndexOf(':');
                if (colon <= 0) { Reply(stream, 400, "{}"); return; }
                string key = lines[i].Substring(0, colon);
                if (headers.ContainsKey(key)) { Reply(stream, 400, "{}"); return; }
                headers.Add(key, lines[i].Substring(colon + 1).Trim());
            }
            string host, authorization, contentLength;
            if (!headers.TryGetValue("Host", out host) || host != "127.0.0.1:" + Port ||
                headers.ContainsKey("Origin") || headers.ContainsKey("Sec-Fetch-Site") ||
                !headers.TryGetValue("Authorization", out authorization) || !Matches(authorization, "Bearer " + Token))
            {
                Reply(stream, 403, "{}"); return;
            }
            if (first[0] != "POST") { Reply(stream, 405, "{}"); return; }
            if (headers.ContainsKey("Transfer-Encoding") ||
                (headers.TryGetValue("Content-Length", out contentLength) && contentLength != "0"))
            {
                Reply(stream, 400, "{}"); return;
            }
            string path = first[1];
            try
            {
                if (path != "/settings/read")
                {
                    string[] parts = path.Split('/');
                    if (parts.Length != 4 || parts[1] != "settings" ||
                        (parts[2] != "autostart" && parts[2] != "auto-update") ||
                        (parts[3] != "on" && parts[3] != "off"))
                    {
                        Reply(stream, 404, "{}"); return;
                    }
                    write(parts[2], parts[3] == "on");
                }
                Reply(stream, 200, read());
            }
            catch (InvalidOperationException) { Reply(stream, 409, "{}"); }
            catch (Exception) { Reply(stream, 500, "{}"); }
        }

        private static bool Matches(string actual, string expected)
        {
            if (actual.Length != expected.Length) return false;
            int difference = 0;
            for (int i = 0; i < actual.Length; i++) difference |= actual[i] ^ expected[i];
            return difference == 0;
        }

        private static void Reply(NetworkStream stream, int status, string json)
        {
            byte[] body = Encoding.UTF8.GetBytes(json);
            byte[] header = Encoding.ASCII.GetBytes("HTTP/1.1 " + status + " " + (status == 200 ? "OK" : "Error") +
                "\r\nContent-Type: application/json\r\nCache-Control: no-store\r\nConnection: close\r\nContent-Length: " + body.Length + "\r\n\r\n");
            stream.Write(header, 0, header.Length);
            stream.Write(body, 0, body.Length);
        }

        public void Dispose()
        {
            stopped = true;
            listener.Stop();
        }
    }
}
