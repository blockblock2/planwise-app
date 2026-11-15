// Shared by every page in the PlanWise app: dark mode + the Home button.
// Theme is saved in localStorage, so every page in the app uses the same one.
(function () {
  var KEY = "planwise_theme";
  var root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function current() { return saved() || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function apply(t) { root.setAttribute("data-theme", t); }
  apply(current());

  // Path back to home.html from this page (plany/live.html is one folder down)
  var script = document.currentScript;
  var base = script ? script.getAttribute("src").replace(/theme\.js$/, "") : "";
  var page = (root.getAttribute("data-page") || "");

  var css = [
    // Floating Home + theme buttons
    ".pw-dock{position:fixed;left:14px;bottom:14px;z-index:99999;display:flex;gap:6px;font:600 13px/1 system-ui,-apple-system,sans-serif}",
    ".pw-dock a,.pw-dock button{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 13px;border-radius:999px;border:1px solid rgba(0,0,0,.14);background:rgba(255,255,255,.92);color:#23201B;text-decoration:none;cursor:pointer;font:inherit;box-shadow:0 4px 14px rgba(0,0,0,.12);backdrop-filter:blur(8px)}",
    ".pw-dock button{width:34px;padding:0;justify-content:center;font-size:15px}",
    "[data-page=plany] .pw-dock a,[data-theme=dark] .pw-dock a,[data-theme=dark] .pw-dock button{background:rgba(30,34,40,.92);color:#EDE7DC;border-color:rgba(255,255,255,.16)}",

    // PlanWise in dark mode
    "[data-theme=dark][data-page=planwise]{--paper:#15181C;--card:#1E2227;--card-2:#262B31;--ink:#EDE7DC;--ink-soft:#ADA597;--ink-faint:#7D766A;--ocean:#3FA7B5;--ocean-deep:#7FCAD3;--gold:#E3AE4F;--coral:#EE7461;--coral-deep:#F59384;--good:#76B288;--line:#2E343B;--line-strong:#3D444C;--shadow:0 1px 0 rgba(0,0,0,.2),0 10px 30px -18px rgba(0,0,0,.7)}",
    "[data-theme=dark][data-page=planwise] .site-head{background:radial-gradient(120% 90% at 80% -20%,rgba(63,167,181,.18),transparent 60%),linear-gradient(180deg,#1B1F24 0%,var(--paper) 100%)}",
    "[data-theme=dark][data-page=planwise] input,[data-theme=dark][data-page=planwise] select,[data-theme=dark][data-page=planwise] textarea,[data-theme=dark][data-page=planwise] .tabs button.on,[data-theme=dark][data-page=planwise] .tinybtn,[data-theme=dark][data-page=planwise] .chip{background:var(--card-2);color:var(--ink)}",
    "[data-theme=dark][data-page=planwise] .auth-poster{background:radial-gradient(140% 120% at 20% 0%,rgba(206,145,42,.16),transparent 55%),linear-gradient(160deg,#0F5F6C 0%,#0A3B44 100%)}",
    "[data-theme=dark][data-page=planwise] .btn-primary:hover{background:#2E8E9B}",
    "[data-theme=dark][data-page=planwise] .empty{background:rgba(255,255,255,.03)}",
    "[data-theme=dark][data-page=planwise] .pill.owner{background:#3A2F18;color:#E9C46A}",
    "[data-theme=dark][data-page=planwise] .vote.on{background:#3A211C}",
    "[data-theme=dark][data-page=planwise] ::selection{background:#5A4520}",

    // PlanwiseER in dark mode
    "[data-theme=dark][data-page=planwiseer]{--cream:#1B1E22;--paper:#23272C;--ink:#EDE7DC;--muted:#ADA597;--faint:#7D766A;--coral:#EE7A55;--coral-d:#F39274;--jade:#4FB8A8;--gold:#E9B44C;--line:#343A41;--shadow:0 10px 30px rgba(0,0,0,.45);--shadow-sm:0 4px 14px rgba(0,0,0,.35)}",
    "[data-theme=dark][data-page=planwiseer] body{background:var(--cream);color:var(--ink)}",
    "[data-theme=dark][data-page=planwiseer] .btn-primary{background:#EDE7DC;color:#15181C}",
    "[data-theme=dark][data-page=planwise] .toast,[data-theme=dark][data-page=planwise] .thumbwrap button{background:#EDE7DC;color:#15181C}",
    "[data-theme=dark][data-page=planwiseer] .sug.added{border-color:#2D5A50;background:#17302B}",
    "[data-theme=dark][data-page=planwiseer] .notice.warn{border-color:#5A4420;background:#2C2416}"
  ].join("\n");

  function mount() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    if (page === "home") return; // home has its own toggle
    var dock = document.createElement("div");
    dock.className = "pw-dock";
    dock.innerHTML = '<a href="' + base + 'home.html" title="Back to the home screen">⌂ Home</a><button type="button" title="Dark mode"></button>';
    var btn = dock.querySelector("button");
    if (page === "plany") { btn.remove(); document.body.appendChild(dock); return; } // Plany is always dark
    function label() { btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"; }
    btn.addEventListener("click", function () {
      var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, t); } catch (e) {}
      apply(t); label();
    });
    label();
    document.body.appendChild(dock);
  }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  window.pwTheme = {
    get: function () { return root.getAttribute("data-theme"); },
    set: function (t) { try { localStorage.setItem(KEY, t); } catch (e) {} apply(t); }
  };
})();
