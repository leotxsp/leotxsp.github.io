// CTA record: an ASCII field the AI "reads" into a clean business record.
// Unread, the block is a field of density characters. When it scrolls into view, a reading head
// runs along each row (rows staggered), cells just ahead of it thicken, cells behind it lock into
// the record. Last, the status value is stamped, the positive mirror of the chat's "não apareceu".
// The HTML holds the finished record, so no-JS and reduced-motion visitors simply read it.
(function () {
  var pre = document.querySelector(".record .ascii");
  if (!pre || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ---- Read the finished record out of the markup ----
  var stampText = (pre.querySelector("b") || {}).textContent || "";
  var lines = pre.textContent.split("\n");
  var ROWS = lines.length;
  var COLS = lines.reduce(function (m, l) { return Math.max(m, l.length); }, 0);
  var finalCh = [], finalCls = [];
  lines.forEach(function (line, r) {
    var dots = line.search(/ \.{2,} /); // "nome ........ valor": key + leader end where the value starts
    var valueAt = dots < 0 ? 0 : line.indexOf(" ", dots + 2) + 1;
    var stampAt = stampText ? line.indexOf(stampText) : -1;
    finalCh[r] = []; finalCls[r] = [];
    for (var c = 0; c < COLS; c++) {
      finalCh[r][c] = line[c] || " ";
      var stamped = stampAt >= 0 && c >= stampAt && c < stampAt + stampText.length;
      finalCls[r][c] = stamped ? "s" : c < valueAt ? "k" : "v";
    }
  });

  // Screen readers get the record once, as plain text; the animated grid is decoration.
  var sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = lines.join("; ");
  pre.parentNode.insertBefore(sr, pre);
  pre.setAttribute("aria-hidden", "true");

  // ---- Deterministic noise (seeded) so every visit reads the same way ----
  var seed = 1913;
  function rnd() {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var RAMP = " .·:-=+*"; // light, quiet: the unread field
  var HEAVY = "+*#%";    // just ahead of the reading head
  function field(r, c, t) {
    // a slow drift of density, plus grain, so the block breathes instead of strobing
    var v = Math.sin(c * 0.33 + t * 0.0012) + Math.sin(r * 0.9 - t * 0.0009) + Math.sin((c + r * 2) * 0.17 + t * 0.0006);
    var lum = (v + 3) / 6 * 0.75 + rnd() * 0.25;
    return RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
  }

  function esc(ch) { return ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch; }
  // Render a grid of [char, class] as runs of spans.
  function paint(cell) {
    var html = "";
    for (var r = 0; r < ROWS; r++) {
      var run = "", cls = null;
      for (var c = 0; c < COLS; c++) {
        var x = cell(r, c);
        if (x[1] !== cls) {
          if (run) html += '<span class="' + cls + '">' + run + "</span>";
          run = ""; cls = x[1];
        }
        run += esc(x[0]);
      }
      if (run) html += '<span class="' + cls + '">' + run + "</span>";
      if (r < ROWS - 1) html += "\n";
    }
    pre.innerHTML = html;
  }

  var FPS = 24, SPEED = 40, STAGGER = 140, FOCUS = 3; // chars/s per row, ms between rows, cells of "thickening"
  var unread = function (t) { return function (r, c) { return [field(r, c, t), "n"]; }; };
  paint(unread(0));

  var visible = false, started = false, timer = 0, t0 = 0, idleT = 0;
  function idle() {
    // Before reading: the field drifts slowly while on screen.
    timer = 0;
    if (started || !visible || document.hidden) return;
    idleT += 1000 / 12;
    paint(unread(idleT));
    timer = setTimeout(idle, 1000 / 12);
  }

  function read() {
    var t = performance.now() - t0, done = true;
    paint(function (r, c) {
      var head = ((t - r * STAGGER) / 1000) * SPEED; // cells read so far in this row
      if (c < head) {
        var cls = finalCls[r][c];
        return [finalCh[r][c], cls === "s" ? "v" : cls]; // stamp comes after
      }
      done = false;
      if (c < head + FOCUS) return [HEAVY[Math.floor(rnd() * HEAVY.length)], "f"];
      return [field(r, c, idleT + t), "n"];
    });
    if (!done) { timer = setTimeout(read, 1000 / FPS); return; }
    stamp();
  }

  function stamp() {
    // Hard cuts, like the chat's stamp: on, off, on, off, on.
    var flips = 0;
    (function flip() {
      var on = flips % 2 === 0;
      paint(function (r, c) {
        var cls = finalCls[r][c];
        return [finalCh[r][c], cls === "s" ? (on ? "s" : "s off") : cls];
      });
      if (++flips < 5) setTimeout(flip, 170); // ends on: flips 0, 2, 4 are "on"
    })();
  }

  new IntersectionObserver(function (en) {
    visible = en[0].isIntersecting;
    if (visible && !started && en[0].intersectionRatio >= 0.6) {
      started = true;
      clearTimeout(timer);
      setTimeout(function () { t0 = performance.now(); read(); }, 450);
      return;
    }
    if (!timer) idle();
  }, { threshold: [0, 0.6] }).observe(pre);
  document.addEventListener("visibilitychange", function () { if (!timer) idle(); });
})();
