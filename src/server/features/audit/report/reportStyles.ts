/*
 * One inline stylesheet, light only. The report is read on screen and printed
 * to A4 PDF, and a dark variant would need every chart colour re-checked on a
 * second background for no reader who asked for it.
 */
export const STYLES = `
:root{color-scheme:light;--ink:#16191d;--muted:#5b6472;--line:#e3e6ea;--bg:#f4f5f7;--surface:#fff;--accent:#1d3b6e;--critical:#b4232a;--warning:#8a5a00;--info:#5b6472}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.6 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-variant-numeric:tabular-nums}
main{max-width:920px;margin:0 auto;padding:32px 28px 56px;background:var(--surface)}
.running{display:none}
a{color:var(--accent)}
section{margin-top:40px}
.cover{margin-top:0;padding-bottom:8px}
.eyebrow{margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
h1{margin:8px 0 6px;font-size:34px;line-height:1.1;letter-spacing:-.02em;word-break:break-all}
h2{font-size:20px;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid var(--accent);letter-spacing:-.01em}
h3{font-size:15px;margin:22px 0 8px}
h4{font-size:14px;margin:0;font-weight:600}
.sub{margin:2px 0;color:var(--muted);font-size:13px;word-break:break-all}
.scorebox{display:flex;align-items:center;gap:24px;margin:26px 0;padding:20px 24px;border:1px solid var(--line);border-radius:12px;background:#fafbfc}
.gauge{width:132px;height:132px;flex:none}
.gauge-num{font-size:34px;font-weight:700;fill:var(--ink)}
.gauge-sub{font-size:10px;fill:var(--muted)}
.score-label{margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.verdict{margin:6px 0 0;font-size:18px;font-weight:600;line-height:1.35}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.card{border:1px solid var(--line);border-radius:10px;padding:12px 14px;background:var(--surface)}
.card--critical{border-color:#e6b9bb}.card--warning{border-color:#e6d2a8}
.card-label{margin:0;font-size:12px;color:var(--muted)}
.card-value{margin:2px 0 0;font-size:22px;font-weight:600;letter-spacing:-.02em}
.fixlist{margin:0;padding-left:22px}
.fixlist li{padding:6px 0;border-bottom:1px solid var(--line)}
.fix-meta{color:var(--muted);font-size:12.5px;margin-left:6px}
.toc{margin-top:28px;padding:16px 20px;border:1px solid var(--line);border-radius:12px}
.toc h2{border:0;margin:0 0 6px;font-size:16px}
.toc ol{margin:0;padding-left:20px}
.toc-sub{margin:12px 0 4px;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.toc-issues{margin:0;padding-left:18px;columns:2;column-gap:28px;font-size:12.5px}
.toc-n{color:var(--muted)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.chart{margin:14px 0;padding:14px 16px;border:1px solid var(--line);border-radius:12px;break-inside:avoid}
.chart-title{margin:0 0 8px;font-size:13px;font-weight:600}
figcaption{margin-top:8px;color:var(--muted);font-size:11.5px;line-height:1.5}
.donut-wrap{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.donut{width:140px;height:140px;flex:none}
.donut-num{font-size:8px;font-weight:700;fill:var(--ink)}
.donut-sub{font-size:3.4px;fill:var(--muted)}
.legend{width:auto;flex:1;min-width:160px}
.legend th{text-align:left;font-weight:500;font-size:12.5px;padding:3px 10px 3px 0}
.legend td{padding:3px 0;font-size:12.5px}
.swatch{display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:middle}
.bars-svg,.cols-svg{width:100%;height:auto;display:block}
.ax{font-size:10.5px;fill:#3d4450}.val{font-size:10.5px;font-weight:600;fill:var(--ink)}.seg{font-size:10px;font-weight:700;fill:#fff}
table{width:100%;border-collapse:collapse}
.num{text-align:right;padding-left:10px;white-space:nowrap}
.note{color:var(--muted);font-size:12.5px;margin:6px 0 0}
.empty{color:var(--muted)}
.callout{margin-top:18px;padding:12px 16px;border-left:4px solid var(--accent);background:#f3f6fb;font-size:12.5px;border-radius:0 8px 8px 0}
.callout p{margin:4px 0}
.sev-head{font-size:17px;margin:30px 0 4px;padding:6px 12px;border-radius:8px;background:#f1f3f6}
.sev-block--critical .sev-head{border-left:5px solid var(--critical)}
.sev-block--warning .sev-head{border-left:5px solid var(--warning)}
.sev-block--info .sev-head{border-left:5px solid var(--info)}
.cat-head{font-size:13px;margin:18px 0 4px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.cat-n{font-weight:400;font-size:12px;color:var(--muted);text-transform:none;letter-spacing:0;margin-left:6px}
.issue{border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-top:10px}
.issue-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.issue-count{margin-left:auto;font-size:13px;color:var(--muted);white-space:nowrap}
.cat{font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.issue p{margin:8px 0 0;font-size:13px}
.why{color:#3d4450}
.chip{font-size:11px;padding:2px 9px;border-radius:999px;border:1px solid currentColor;font-weight:700}
.chip--critical{color:var(--critical)}.chip--warning{color:var(--warning)}.chip--info{color:var(--info)}
.rows{margin-top:10px;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.rows th{text-align:left;font-size:11.5px;color:var(--muted);font-weight:600;padding:6px 10px;border-bottom:1px solid var(--line);background:#fafbfc}
.rows td{padding:5px 10px;border-bottom:1px solid var(--line);font-size:12px;vertical-align:top}
.rows tr:last-child td{border-bottom:0}
.rows th.num{text-align:right}
.url{word-break:break-all}
.detail{color:var(--muted);font-size:11px;word-break:break-word}
.pages td,.pages th{font-size:11px;padding:4px 8px}
.ap-head{margin:16px 0 4px;font-size:13px}
.ap-list{margin:0;padding-left:18px;columns:2;column-gap:24px;font-size:11px;word-break:break-all}
.ap-list li{break-inside:avoid;padding:1px 0}
footer{margin-top:40px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}
@page{size:A4;margin:20mm 14mm 18mm;@bottom-right{content:counter(page);font-size:9pt;color:#5b6472}}
@media (max-width:700px){.grid2,.grid3,.cards{grid-template-columns:1fr}.scorebox{flex-direction:column;align-items:flex-start}.toc-issues,.ap-list{columns:1}}
@media print{
html{font-size:10.5pt}
body{background:#fff}
main{max-width:none;padding:0}
.running{display:block;position:fixed;top:-14mm;left:0;right:0;font-size:8.5pt;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:2mm}
section{break-before:page;margin-top:0}
.cover{break-before:auto}
.toc{break-inside:avoid}
.issue,.card,.chart,.scorebox,.callout{break-inside:avoid}
h2,h3,h4{break-after:avoid}
tr{break-inside:avoid}
thead{display:table-header-group}
a{color:inherit;text-decoration:none}
}
`;
