// Chat demo on the landing: the AI answers a few local questions, and "Sua marca" never shows up.
// Plays only while the chat is on screen and the tab is visible. Without this script, or with
// reduced motion, the static answer in the HTML stays as it is.
(function () {
  var chat = document.querySelector(".chat");
  if (!chat || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SCENES = [
    { q: "Qual o melhor dentista em Belém?", names: ["Clínica A", "Clínica B", "Clínica C"] },
    { q: "Qual contador você indica em Belém?", names: ["Escritório A", "Escritório B", "Escritório C"] },
    { q: "Qual pet shop entrega em Belém?", names: ["Pet shop A", "Pet shop B", "Pet shop C"] },
  ];

  var q = chat.querySelector(".q");
  var rows = Array.prototype.slice.call(chat.querySelectorAll("li"));
  var hits = rows.filter(function (li) { return !li.classList.contains("miss"); });
  var miss = chat.querySelector("li.miss");
  var foot = chat.querySelector(".foot");
  if (foot) foot.textContent = "Exemplo ilustrativo. Os nomes são genéricos.";
  chat.classList.add("live");

  var inView = false;
  var waiters = [];
  function ready() {
    return inView && !document.hidden;
  }
  function wake() {
    if (!ready()) return;
    var w = waiters; waiters = [];
    w.forEach(function (f) { f(); });
  }
  // Waits ms of on-screen time; pauses while the chat is off screen or the tab is hidden.
  function wait(ms) {
    return new Promise(function (done) {
      function go() {
        if (!ready()) return waiters.push(go);
        setTimeout(function () { ready() ? done() : waiters.push(done); }, ms);
      }
      go();
    });
  }

  function reset() {
    chat.classList.remove("clearing");
    rows.forEach(function (li) { li.classList.remove("on", "flash", "searching", "stamped"); });
    q.textContent = "";
    q.className = "q";
  }

  async function play(scene) {
    reset();
    q.classList.add("typing");
    for (var i = 1; i <= scene.q.length; i++) {
      q.textContent = scene.q.slice(0, i);
      await wait(scene.q[i - 1] === " " ? 70 : 34);
    }
    q.classList.replace("typing", "thinking");
    await wait(900);
    q.classList.remove("thinking");

    for (var n = 0; n < hits.length; n++) {
      hits[n].firstChild.nodeValue = scene.names[n] + " ";
      hits[n].classList.add("on", "flash");
      await wait(90);
      hits[n].classList.remove("flash");
      await wait(330);
    }

    miss.classList.add("on");
    await wait(250);
    miss.classList.add("searching");
    await wait(1150);
    miss.classList.remove("searching");
    miss.classList.add("stamped");

    await wait(3200);
    chat.classList.add("clearing");
    await wait(450);
  }

  var started = false;
  async function loop() {
    for (var k = 0; ; k = (k + 1) % SCENES.length) await play(SCENES[k]);
  }

  new IntersectionObserver(function (entries) {
    inView = entries[0].isIntersecting;
    if (inView && !started) { started = true; loop(); }
    wake();
  }, { threshold: 0.5 }).observe(chat);
  document.addEventListener("visibilitychange", wake);
})();

// Landing sections. Everything here starts from the finished, readable state and only animates with motion allowed.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("motion");

  function once(el, threshold, fn) {
    if (!el) return;
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      fn();
    }, { threshold: threshold });
    io.observe(el);
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // Causes -> fixes: each row shows its cause, then the fix plays once it has been on screen a moment.
  document.querySelectorAll(".fix-row").forEach(function (row) {
    var bars = row.querySelectorAll(".g-dados i"), jitter = 0, seen = false;
    function shake() {
      // "Dados desencontrados": the three values never agree until fixed.
      bars.forEach(function (bar) { bar.style.setProperty("--j", (0.55 + Math.random() * 0.75).toFixed(2)); });
    }
    if (bars.length) shake();
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting || seen) return;
      seen = true;
      io.disconnect();
      if (bars.length) jitter = setInterval(shake, 420);
      setTimeout(function () {
        clearInterval(jitter);
        bars.forEach(function (bar) { bar.style.removeProperty("--j"); });
        row.classList.add("fixed");
      }, 1500);
    }, { threshold: 0.7 });
    io.observe(row);
  });

  // Stats: the cursor selects each cell and the whole value lands at once with an inverted flash.
  var stats = Array.prototype.slice.call(document.querySelectorAll(".stat"));
  stats.forEach(function (st) { st.classList.add("wait"); });
  once(stats[0] && stats[0].parentNode, 0.5, async function () {
    for (var i = 0; i < stats.length; i++) {
      var v = stats[i].querySelector(".v");
      stats[i].classList.add("sel");
      await sleep(320);
      stats[i].classList.remove("wait");
      v.classList.add("flash");
      await sleep(110);
      v.classList.remove("flash");
      await sleep(420);
      stats[i].classList.remove("sel");
    }
  });

  // CTA: "a sua empresa." is found and selected.
  var cta = document.querySelector("section.cta");
  if (cta && cta.querySelector(".record")) cta = null; // the record carries the closing beat there
  once(cta, 0.6, function () { setTimeout(function () { cta.classList.add("found"); }, 300); });
})();

// Mobile dock: independent of motion preferences (it is navigation, not decoration).
(function () {
  if (!("IntersectionObserver" in window)) return;
  // Mobile dock: appears once the hero button has scrolled away, hides at the final CTA.
  var dock = document.querySelector(".dock"), heroCta = document.getElementById("hero-cta");
  var finalCta = document.getElementById("verificacao");
  if (dock && heroCta && finalCta) {
    dock.hidden = false;
    var heroGone = false, atEnd = false;
    var sync = function () { dock.classList.toggle("on", heroGone && !atEnd); };
    new IntersectionObserver(function (en) {
      heroGone = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; sync();
    }).observe(heroCta);
    new IntersectionObserver(function (en) { atEnd = en[0].isIntersecting; sync(); }, { threshold: 0.2 }).observe(finalCta);
  }
})();
