export const adminStyles = String.raw`
    :root { color-scheme: dark; --surface:#20221f; --panel:#292c28; --ink:#f1f0e8; --muted:#b0b2a8; --line:#41443d; --accent:#e9a743; --radius:14px; font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif; }
    * { box-sizing:border-box; } body { margin:0; color:var(--ink); background:#191b19; }
    main { width:min(1040px,100%); margin:auto; padding:clamp(20px,5vw,56px) 20px 72px; }
    h1,h2,p { margin-top:0; } h1 { margin-bottom:8px; font-size:clamp(1.7rem,4vw,2.4rem); line-height:1.15; letter-spacing:-.035em; }
    .intro,.hint { color:var(--muted); } .intro { max-width:62ch; margin-bottom:28px; }
    .panel { border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); padding:20px; }
    .auth { display:flex; align-items:end; gap:12px; margin-bottom:22px; } .auth label { flex:1; }
    label { display:grid; gap:6px; color:var(--muted); font-size:.88rem; }
    input,textarea,select { width:100%; border:1px solid #55594f; border-radius:9px; background:var(--panel); color:var(--ink); padding:10px 12px; font:inherit; }
    input:focus,textarea:focus,select:focus,button:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
    textarea { min-height:116px; resize:vertical; } .grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .wide { grid-column:1/-1; } .row { display:flex; flex-wrap:wrap; align-items:end; gap:12px; margin-top:16px; }
    .row label { flex:1 1 190px; } button { min-height:42px; border:1px solid var(--line); border-radius:999px; padding:8px 16px; color:var(--ink); background:var(--panel); font:600 .92rem inherit; cursor:pointer; }
    button.primary { color:#21190c; background:var(--accent); border-color:var(--accent); } button:hover { filter:brightness(1.08); }
    h2 { margin:30px 0 12px; font-size:1.18rem; } .notice { min-height:1.6em; margin:12px 0 0; color:var(--accent); }
    .item { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; align-items:center; border-top:1px solid var(--line); padding:15px 0; }
    .item:first-child { border-top:0; } .item h3 { margin:0 0 3px; font-size:1rem; } .item p { margin:0; color:var(--muted); font-size:.88rem; }
    .actions { display:flex; flex-wrap:wrap; gap:7px; } .empty { color:var(--muted); }
    .workspace { display:grid; grid-template-columns:minmax(340px,.78fr) minmax(0,1.22fr); gap:18px; align-items:start; }
    .compose,.archive { min-width:0; } .section-head { display:flex; justify-content:space-between; align-items:center; gap:12px; }
    .section-head h2,.section-head h3 { margin:0; } .eyebrow { color:var(--accent); font-size:.68rem; font-weight:750; letter-spacing:.12em; margin:0 0 4px; }
    .language-mark { border:1px solid var(--line); border-radius:999px; padding:4px 10px; font-size:.72rem; font-weight:700; color:var(--muted); }
    .language-mark i { color:var(--accent); font-style:normal; padding:0 3px; } .interaction-box { margin-top:18px; padding:14px; border:1px solid var(--line); border-radius:12px; background:var(--panel); }
    .translate-row { display:flex; flex-wrap:wrap; align-items:center; gap:4px 14px; margin-top:12px; } .translate-row .hint { margin:0; flex:1 1 260px; }
    .prompt-grid { margin-top:12px; } .hint { color:var(--muted); font-size:.78rem; margin:12px 0 0; }
    .option-row { display:grid; grid-template-columns:1fr 1fr auto; gap:8px; margin-top:9px; align-items:end; }
    .filters { display:grid; grid-template-columns:minmax(0,1fr) 150px; gap:10px; margin:18px 0 8px; }
    .publish-toggle { display:flex; flex:0 1 auto !important; align-items:center; gap:8px; align-self:center; white-space:nowrap; }
    .publish-toggle input { width:18px; height:18px; margin:0; accent-color:var(--accent); }
    .item { grid-template-columns:minmax(0,1fr); align-items:start; } .item-top { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .status { border-radius:999px; padding:2px 9px; background:var(--panel); color:var(--muted); font-size:.72rem; }
    .actions { margin-top:9px; } .actions button { min-height:34px; padding:5px 11px; font-size:.8rem; }
    .pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:12px; color:var(--muted); font-size:.82rem; }
    .response-pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:10px; color:var(--muted); font-size:.82rem; }
    .responses { border-top:1px solid var(--line); margin-top:18px; padding-top:14px; }
    .response-row { display:flex; justify-content:space-between; gap:10px; align-items:start; border-top:1px solid var(--line); padding:10px 0; }
    .response-row p { white-space:pre-wrap; overflow-wrap:anywhere; } .response-row button { min-height:32px; padding:4px 10px; font-size:.78rem; }
    @media (max-width:900px) { .workspace { grid-template-columns:1fr; } .archive { order:2; } }
    @media (max-width:650px) { .grid { grid-template-columns:1fr; } .wide { grid-column:auto; } .auth { align-items:stretch; flex-direction:column; } .item { grid-template-columns:1fr; } .actions button { flex:1; } .filters { grid-template-columns:1fr; } .option-row { grid-template-columns:1fr; } }
    @media (prefers-color-scheme:light) { :root { color-scheme:light; --surface:#f4f3ed; --panel:#fffefa; --ink:#272821; --muted:#5f6257; --line:#d8d8ce; --accent:#a95c00; } body { background:#eae9e1; } button.primary { color:white; } }
`;
