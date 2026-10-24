using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using SeoWatcher;

internal static class WindowsSettingsBridgeTests
{
    private static string state = "{\"autostart\":false,\"autostartManaged\":false,\"autoUpdate\":true,\"autoUpdateManaged\":false}";
    private static int changes;

    public static int Main(string[] args)
    {
        if (args.Length == 1 && args[0] == "--serve")
        {
            using (var bridge = new WindowsSettingsBridge(() => state, (setting, enabled) =>
            {
                string field = setting == "autostart" ? "autostart" : "autoUpdate";
                state = state.Replace("\"" + field + "\":" + (!enabled ? "true" : "false"), "\"" + field + "\":" + (enabled ? "true" : "false"));
            }))
            {
                // Private pipe to the consumer test, never a log or user config.
                Console.WriteLine(bridge.Port + " " + bridge.Token);
                Console.ReadLine();
            }
            return 0;
        }
        using (var bridge = new WindowsSettingsBridge(() => state, (setting, enabled) =>
        {
            if (setting == "auto-update") throw new InvalidOperationException("managed");
            changes++;
            state = state.Replace("\"autostart\":false", "\"autostart\":true");
        }))
        {
            Assert(Send(bridge, "POST", "/settings/autostart/on", "wrong", "").StartsWith("HTTP/1.1 403"), "reject missing capability");
            Assert(changes == 0, "unauthorized request must not write");
            Assert(Send(bridge, "POST", "/settings/read", bridge.Token, "Origin: https://example.com\r\n").StartsWith("HTTP/1.1 403"), "reject browser origins");
            Assert(Send(bridge, "GET", "/settings/read", bridge.Token, "").StartsWith("HTTP/1.1 405"), "reject GET");
            Assert(Send(bridge, "POST", "/settings/autostart/on", bridge.Token, "").Contains("\"autostart\":true"), "write returns confirmed state");
            Assert(changes == 1, "exactly one write");
            Assert(Send(bridge, "POST", "/settings/read", bridge.Token, "").Contains("\"autostart\":true"), "read reflects saved state");
            Assert(Send(bridge, "POST", "/settings/auto-update/off", bridge.Token, "").StartsWith("HTTP/1.1 409"), "managed preference stays locked");
            Assert(Send(bridge, "POST", "/settings/unknown/on", bridge.Token, "").StartsWith("HTTP/1.1 404"), "reject unknown setting");
            Assert(Send(bridge, "POST", "/settings/read", bridge.Token, "Content-Length: 1\r\n").StartsWith("HTTP/1.1 400"), "reject body");
            Assert(Send(bridge, "POST", "/settings/read", bridge.Token, "Transfer-Encoding: chunked\r\n").StartsWith("HTTP/1.1 400"), "reject chunked input");
        }
        Console.WriteLine("Native settings bridge: 10 invariants passed; no registry or user config changed.");
        return 0;
    }

    private static string Send(WindowsSettingsBridge bridge, string method, string path, string token, string extra)
    {
        using (var client = new TcpClient())
        {
            client.Connect(IPAddress.Loopback, bridge.Port);
            client.ReceiveTimeout = 5000;
            using (var stream = client.GetStream())
            {
                byte[] request = Encoding.ASCII.GetBytes(method + " " + path + " HTTP/1.1\r\nHost: 127.0.0.1:" + bridge.Port + "\r\nAuthorization: Bearer " + token + "\r\n" + extra + "\r\n");
                stream.Write(request, 0, request.Length);
                return new StreamReader(stream).ReadToEnd();
            }
        }
    }

    private static void Assert(bool ok, string name)
    {
        if (!ok) throw new Exception(name);
    }
}
