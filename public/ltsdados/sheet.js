// Hero background: a faint spreadsheet that fills itself, one cell at a time.
// The selected cell steps like a cursor, types a bar of "data", and old entries fade out.
(function () {
  var hero = document.querySelector("section.hero");
  if (!hero || !document.createElement("canvas").getContext) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.createElement("canvas");
  canvas.className = "sheet";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext("2d");

  var CW = 128, RH = 36, HEAD = 28, GUTTER = 44; // cell size, header row, row-number gutter
  var TICK = 110; // ms per step: the motion is stepped on purpose, like keystrokes
  var LIFE = 26000; // ms an entry stays before it is fully faded
  var W = 0, H = 0, cols = 0, rows = 0, dpr = 1, minCol = 0;
  var cells = {}; // "c,r" -> { w: target width 0..1, shown: steps typed, at: time filled }
  var cur = { c: 0, r: 0, typed: 0, target: 0, dwell: 0 };

  function letters(i) {
    var s = "";
    i++;
    while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); }
    return s;
  }
  function rand(a, b) { return a + Math.random() * (b - a); }

  function size() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil((W - GUTTER) / CW);
    rows = Math.ceil((H - HEAD) / RH);
    // On wide screens the copy sits on the left: keep the cursor and new entries on the right half.
    minCol = W > 900 ? Math.min(cols - 1, Math.ceil((W * 0.56 - GUTTER) / CW)) : 0;
  }

  function seed(now) {
    // Start with some history so the sheet is never blank.
    for (var i = 0; i < cols * rows * 0.18; i++) {
      var c = Math.floor(rand(minCol, cols)), r = Math.floor(Math.random() * rows);
      var w = rand(0.25, 0.8);
      cells[c + "," + r] = { w: w, shown: 99, at: now - rand(0, LIFE * 0.8) };
    }
    jump();
  }

  function jump() {
    // Pick a new place to start typing: a random row, from one of the first columns.
    cur.r = Math.floor(rand(0, rows));
    cur.c = Math.floor(rand(minCol, minCol + Math.max(1, (cols - minCol) / 3)));
    startCell();
  }
  function startCell() {
    cur.typed = 0;
    cur.target = Math.round(rand(3, 9)); // bar grows in this many steps
    cur.dwell = Math.round(rand(2, 5)); // pause after typing, before moving on
    cells[cur.c + "," + cur.r] = { w: cur.target / 10, shown: 0, at: performance.now() };
  }

  function step() {
    var cell = cells[cur.c + "," + cur.r];
    if (cell.shown < cur.target) { cell.shown++; return; }
    if (cur.dwell-- > 0) return;
    // Tab to the next cell; sometimes the row ends and the cursor jumps elsewhere.
    if (cur.c + 1 < cols && Math.random() > 0.18) { cur.c++; startCell(); }
    else jump();
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.055)";
    ctx.beginPath();
    for (var x = GUTTER; x <= W; x += CW) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, H); }
    for (var y = HEAD; y <= H; y += RH) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(W, Math.round(y) + 0.5); }
    ctx.stroke();

    // Headers: column letters and row numbers
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.font = "500 10px 'Space Grotesk', ui-sans-serif, system-ui, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (var c = 0; c < cols; c++) ctx.fillText(letters(c), GUTTER + c * CW + CW / 2, HEAD / 2);
    for (var r = 0; r < rows; r++) ctx.fillText(String(r + 1), GUTTER / 2, HEAD + r * RH + RH / 2);

    // Entries: bars of "data", fading with age
    for (var k in cells) {
      var e = cells[k], age = now - e.at;
      if (age > LIFE) { delete cells[k]; continue; }
      var p = k.split(","), cx = GUTTER + p[0] * CW, cy = HEAD + p[1] * RH;
      var fade = age < LIFE * 0.6 ? 1 : 1 - (age - LIFE * 0.6) / (LIFE * 0.4);
      var w = Math.min(e.shown / 10, e.w) * (CW - 24);
      ctx.fillStyle = "rgba(255,255,255," + (0.13 * fade).toFixed(3) + ")";
      ctx.fillRect(cx + 12, cy + RH / 2 - 2, w, 4);
    }

    // Selected cell
    if (!reduce) {
      var sx = GUTTER + cur.c * CW, sy = HEAD + cur.r * RH;
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.strokeRect(Math.round(sx) + 0.5, Math.round(sy) + 0.5, CW, RH);
      // Highlight the matching headers, like a real sheet
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText(letters(cur.c), sx + CW / 2, HEAD / 2);
      ctx.fillText(String(cur.r + 1), GUTTER / 2, sy + RH / 2);
    }
  }

  var visible = false, timer = 0;
  function loop() {
    timer = 0;
    if (!visible || document.hidden) return;
    step();
    draw(performance.now());
    timer = setTimeout(loop, TICK);
  }
  function resume() { if (!timer && visible && !document.hidden) loop(); }

  size();
  seed(performance.now());
  draw(performance.now());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(performance.now()); });

  var rt = 0;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      size();
      if (cur.c >= cols || cur.r >= rows) jump();
      draw(performance.now());
    }, 150);
  });
  if (reduce) return;
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; resume(); }).observe(canvas);
  document.addEventListener("visibilitychange", resume);
})();
