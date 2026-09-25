/* Magasépítés II. Tanulótárs – alkalmazás. Offline, localStorage-alapú. */
"use strict";

/* ---------- Segédek ---------- */
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function norm(s) {
  return String(s == null ? "" : s).toLowerCase()
    .replace(/[áàäâ]/g, "a").replace(/[éèëê]/g, "e").replace(/[íìïî]/g, "i")
    .replace(/[óòöőô]/g, "o").replace(/[úùüűû]/g, "u")
    .replace(/[^a-z0-9\u00f6\u00fc\u0151\u0171\/ ]/gi, " ").replace(/\s+/g, " ").trim();
}
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function todayStr() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function addDays(str, n) { var d = new Date(str + "T12:00:00"); d.setDate(d.getDate() + n); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function fmtDate(ts) { var d = new Date(ts); return d.getFullYear() + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

/* ---------- Tár ---------- */
var LS = "mag2-v1";
function defState() { return { theme: "dark", quizLen: 6, examLen: 20, timerMin: 0, secDone: {}, card: {}, quizHist: [], sec: {}, act: [] }; }
var S = (function () {
  try { var raw = localStorage.getItem(LS); if (raw) { var o = JSON.parse(raw); var d = defState(); for (var k in d) if (o[k] === undefined) o[k] = d[k]; return o; } } catch (e) {}
  return defState();
})();
function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }
function act(kind, label) { S.act.unshift({ ts: Date.now(), kind: kind, label: label }); if (S.act.length > 60) S.act.length = 60; save(); }

/* ---------- Adat ---------- */
var DB = { chapters: MAG_A.chapters.concat(MAG_B.chapters), sections: Object.assign({}, MAG_A.sections, MAG_B.sections) };
function secOrder() { var o = []; DB.chapters.forEach(function (c) { c.sections.forEach(function (id) { o.push(id); }); }); return o; }
function chOf(secId) { for (var i = 0; i < DB.chapters.length; i++) if (DB.chapters[i].sections.indexOf(secId) !== -1) return DB.chapters[i]; return null; }
function prevSec(id) { var o = secOrder(), i = o.indexOf(id); return i > 0 ? o[i - 1] : null; }
function nextSec(id) { var o = secOrder(), i = o.indexOf(id); return i < o.length - 1 ? o[i + 1] : null; }

/* ---------- Kártya SM-2 ---------- */
function cardSt(sec, i) {
  var k = sec + ":" + i;
  return S.card[k] || (S.card[k] = { ease: 2.5, int: 0, due: null, reps: 0, lapses: 0 });
}
function cardState(st) {
  if (!st.reps) return "new";
  if (st.due && st.due <= todayStr()) return "due";
  if (st.int >= 3) return "ok";
  return "learning";
}
function gradeCard(sec, i, q) {
  var st = cardSt(sec, i);
  if (q < 3) { st.reps = 0; st.lapses++; st.int = 0; st.due = todayStr(); }
  else {
    st.ease = Math.min(2.8, Math.max(1.3, st.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))));
    st.reps++;
    st.int = st.reps === 1 ? 1 : st.reps === 2 ? 3 : Math.round(st.int * st.ease);
    st.due = addDays(todayStr(), st.int);
  }
  save();
}
function dueQueue(secIds) {
  var t = todayStr(), q = [];
  (secIds || secOrder()).forEach(function (id) {
    DB.sections[id].cards.forEach(function (c, i) {
      var st = cardSt(id, i);
      if (!st.reps || (st.due && st.due <= t)) q.push({ sec: id, idx: i, card: c, st: st });
    });
  });
  q.sort(function (a, b) { return (b.st.lapses - a.st.lapses) || (a.st.ease - b.st.ease); });
  return q;
}
function countCards() {
  var total = 0, learned = 0, due = 0, t = todayStr();
  secOrder().forEach(function (id) {
    DB.sections[id].cards.forEach(function (_, i) {
      total++;
      var st = cardSt(id, i);
      if (st.int >= 3) learned++;
      if (!st.reps || (st.due && st.due <= t)) due++;
    });
  });
  return { total: total, learned: learned, due: due };
}

/* ---------- Kérdésmintavétel / adaptív ---------- */
function poolQuestions(secIds, onlyTypes) {
  var p = [];
  secIds.forEach(function (id) {
    var s = DB.sections[id]; if (!s) return;
    s.quiz.forEach(function (q) {
      if (onlyTypes && onlyTypes.indexOf(q.t) === -1) return;
      var c = {}; for (var k in q) c[k] = q[k];
      c.sec = id; c.secTitle = s.title; p.push(c);
    });
  });
  return shuffle(p);
}
function weakSecs() {
  var w = [];
  Object.keys(S.sec).forEach(function (id) {
    var s = S.sec[id];
    if (s.asked >= 3 && s.correct / s.asked < 0.7 && DB.sections[id]) w.push({ id: id, acc: s.correct / s.asked, asked: s.asked });
  });
  w.sort(function (a, b) { return a.acc - b.acc; });
  return w;
}

/* ---------- Router ---------- */
var app = document.getElementById("app");
function go(h) { location.hash = h; }
window.addEventListener("hashchange", render);
function setNav(r) {
  var links = document.querySelectorAll("#mainNav a");
  links.forEach(function (a) {
    var on = (a.getAttribute("data-r") || "") === r;
    a.classList.toggle("on", on);
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
}
var navToggle = document.getElementById("navToggle"), mainNav = document.getElementById("mainNav");
if (navToggle) {
  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Menü bezárása" : "Menü megnyitása");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
  mainNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { mainNav.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); }
  });
}
function crumbsHTML(items) {
  var nav = document.getElementById("crumbs");
  if (!nav) return;
  if (!items || !items.length) { nav.hidden = true; nav.innerHTML = ""; return; }
  nav.hidden = false;
  nav.innerHTML = "<ol>" + items.map(function (it, i) {
    var last = i === items.length - 1;
    return "<li>" + (last || !it.href ? "<span aria-current='page'>" + esc(it.label) + "</span>"
      : "<a href='" + it.href + "'>" + esc(it.label) + "</a>") + "</li>";
  }).join("") + "</ol>";
}
function focusMain() {
  var h1 = app.querySelector("h1");
  if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  else { app.focus({ preventScroll: true }); }
}
var toTopBtn = document.getElementById("toTop");
if (toTopBtn) {
  window.addEventListener("scroll", function () {
    toTopBtn.hidden = window.scrollY < 600;
  }, { passive: true });
  toTopBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
}
function render() {
  if (window.__heroDestroy) { try { window.__heroDestroy(); } catch (e) {} window.__heroDestroy = null; }
  var h = location.hash || "#/";
  var parts = h.replace(/^#\/?/, "").split("/");
  var r = parts[0] || "";
  setNav(r);
  var mn = document.getElementById("mainNav"), nt = document.getElementById("navToggle");
  if (mn) mn.classList.remove("open");
  if (nt) nt.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  if (r === "") { crumbsHTML([]); pDashboard(); focusMain(); return; }
  if (r === "tananyag") { crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Tananyag" }]); pSubjects(); focusMain(); return; }
  if (r === "tanulas") {
    var s = DB.sections[parts[1]];
    crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Tananyag", href: "#/tananyag" }, { label: s ? s.title : "Lecke" }]);
    pStudy(parts[1]); focusMain(); return;
  }
  if (r === "kartyak") { crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Kártyák" }]); pCards(); focusMain(); return; }
  if (r === "kviz") {
    crumbsHTML(parts[1] === "play" ? [{ label: "Vezérlőpult", href: "#/" }, { label: "Kvíz", href: "#/kviz" }, { label: "Kitöltés" }] : [{ label: "Vezérlőpult", href: "#/" }, { label: "Kvíz" }]);
    if (parts[1] === "play") pQuizPlay(); else pQuizCenter();
    focusMain(); return;
  }
  if (r === "ismetles") { crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Ismétlés" }]); pRevision(); focusMain(); return; }
  if (r === "statisztika") { crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Statisztika" }]); pStats(); focusMain(); return; }
  if (r === "beallitasok") { crumbsHTML([{ label: "Vezérlőpult", href: "#/" }, { label: "Beállítások" }]); pSettings(); focusMain(); return; }
  crumbsHTML([]);
  app.innerHTML = "<h1>Ismeretlen oldal</h1><p class='mut'>Ilyen oldal nincs.</p>";
  focusMain();
}

/* ---------- Vezérlőpult ---------- */
function pDashboard() {
  var order = secOrder();
  var done = order.filter(function (id) { return S.secDone[id]; }).length;
  var cc = countCards();
  var last10 = S.quizHist.slice(0, 10);
  var avg = last10.length ? Math.round(last10.reduce(function (a, h) { return a + h.correct / h.total; }, 0) / last10.length * 100) : null;
  var weak = weakSecs().slice(0, 3);
  var firstOpen = order.filter(function (id) { return !S.secDone[id]; })[0];
  var htm = "<h1>Vezérlőpult</h1>" + heroHTML() + "<div class='grid g4'>"
    + statCard("Leckék kész", done + " / " + order.length, pct(done, order.length))
    + statCard("Kártya esedékes", cc.due + " / " + cc.total, pct(cc.total - cc.due, cc.total))
    + statCard("Megtanult kártya", cc.learned + " / " + cc.total, pct(cc.learned, cc.total))
    + statCard("Kvízátlag (10)", avg === null ? "–" : avg + "%", avg || 0)
    + "</div>";
  htm += "<div class='btnrow'>" + (firstOpen ? "<a class='btn' href='#/tanulas/" + firstOpen + "'>Folytatom: " + esc(DB.sections[firstOpen].title) + "</a>" : "<span class='chip done'>Minden lecke kész ✓</span>")
    + "<a class='btn ghost' href='#/ismetles'>Ismétlés</a><a class='btn ghost' href='#/kviz'>Kvíz</a></div>";
  htm += "<h2>Ajánlott következő lépés</h2>";
  if (weak.length) htm += "<div class='card'><b>Gyenge pontok:</b> " + weak.map(function (w) { return "<a href='#/tanulas/" + w.id + "'>" + esc(DB.sections[w.id].title) + "</a> (" + Math.round(w.acc * 100) + "%)"; }).join(" · ") + "<br><a class='btn warn' href='#/kviz'>Gyenge pontjaim gyakorlása</a></div>";
  else if (cc.due) htm += "<div class='card'>Nincs gyenge pontod. Van <b>" + cc.due + "</b> esedékes kártyád – <a href='#/ismetles'>ismételj most</a>.</div>";
  else htm += "<div class='card'>Még nincs adat. Kezdj egy leckével a <a href='#/tananyag'>tananyagban</a>.</div>";
  htm += "<h2>Friss tevékenység</h2>";
  htm += S.act.length ? "<div class='card'>" + S.act.slice(0, 8).map(function (a) { return "<div>· <span class='mut'>" + fmtDate(a.ts) + "</span> " + esc(a.label) + "</div>"; }).join("") + "</div>"
    : "<div class='empty'>Még nincs tevékenységed.</div>";
  app.innerHTML = htm;
  if (window.Hero3D) { try { window.__heroDestroy = window.Hero3D.mount("heroCv", "heroChips", "heroCap", "heroEx"); } catch (e) {} }
}
/* 3D hero a vezérlőpulton: a vásznat + rétegchippeket a Hero3D tölti meg. */
function heroHTML() {
  return "<div class='card hero3d'><div class='hero3d-head'><div>"
    + "<h2 style='margin:0'>Ház – rétegről rétegre</h2>"
    + "<p class='mut small' style='margin:2px 0 0'>Forgasd ujjal vagy egérrel · koppints egy rétegre a magyarázatért.</p></div></div>"
    + "<canvas id='heroCv' class='hero3d-cv' role='img' aria-label='Forgatható 3D házmodell: alap, fal áthidalóval, koszorú, födém, tető'></canvas>"
    + "<div class='chiprow' id='heroChips'></div>"
    + "<p class='mut small' id='heroCap' style='min-height:44px'></p>"
    + "<label class='small mut hero3d-ex'>Szétrobbantás <input type='range' id='heroEx' min='0' max='100' value='30' aria-label='Rétegek széthúzása'></label></div>";
}
/* Finom 3D-tilt a tanulókártyán (csak finom-mutatós, mozgásérzékeny eszközön nem). */
function addTilt(fc) {
  if (!fc) return;
  try {
    if (window.matchMedia && (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(hover: hover)").matches)) return;
  } catch (e) { return; }
  var raf = 0;
  fc.addEventListener("pointermove", function (e) {
    if (fc.classList.contains("flip")) return;
    var r = fc.getBoundingClientRect();
    var dx = (e.clientX - r.left) / Math.max(1, r.width) - 0.5;
    var dy = (e.clientY - r.top) / Math.max(1, r.height) - 0.5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      fc.style.transform = "rotateY(" + (dx * 8).toFixed(2) + "deg) rotateX(" + (-dy * 8).toFixed(2) + "deg)";
    });
  });
  fc.addEventListener("pointerleave", function () {
    if (raf) cancelAnimationFrame(raf);
    fc.style.transform = "";
  });
}
function statCard(label, val, p) {
  return "<div class='card'><div class='mut small'>" + label + "</div><div class='stat-num'>" + val + "</div><div class='bar" + (p >= 70 ? " good" : p >= 40 ? "" : " warn") + "'><i style='width:" + Math.min(100, p) + "%'></i></div></div>";
}

/* ---------- Tananyag ---------- */
function pSubjects() {
  var htm = "<h1>Tananyag</h1><p class='mut'>Magasépítés II. – 6 fejezet, " + secOrder().length + " lecke. Válassz leckét a tanuláshoz.</p>"
    + "<div class='filterrow'><label class='f' for='subFilter'>Keresés a leckék között</label><input type='text' id='subFilter' placeholder='pl. födém, koszorú, hő…' autocomplete='off'></div><nav class='toc' id='subToc'>";
  DB.chapters.forEach(function (c) {
    htm += "<h2 data-ch='" + c.id + "'>" + c.n + ". " + esc(c.title) + "</h2>";
    c.sections.forEach(function (id) {
      var s = DB.sections[id];
      var st = S.sec[id];
      var acc = st && st.asked ? " · " + Math.round(st.correct / st.asked * 100) + "% (" + st.asked + " kérdés)" : "";
      htm += "<a href='#/tanulas/" + id + "' data-sec='" + id + "' data-title='" + esc(norm(s.title)) + "'><div class='card'><b>" + esc(s.title) + "</b> "
        + (S.secDone[id] ? "<span class='chip done'>kész ✓</span>" : "<span class='chip'>nincs kész</span>")
        + "<span class='chip'>" + s.cards.length + " kártya</span><span class='chip'>" + s.quiz.length + " kérdés</span>"
        + "<br><span class='mut small'>" + esc(simplePreview(s.simple)) + acc + "</span></div></a>";
    });
  });
  app.innerHTML = htm + "</nav>";
  var inp = document.getElementById("subFilter");
  if (inp) inp.addEventListener("input", function () {
    var q = norm(inp.value);
    var links = document.querySelectorAll("#subToc a[data-sec]");
    var heads = document.querySelectorAll("#subToc h2[data-ch]");
    links.forEach(function (a) {
      var hit = !q || a.getAttribute("data-title").indexOf(q) !== -1;
      a.style.display = hit ? "" : "none";
    });
    heads.forEach(function (h2) {
      var ch = h2.getAttribute("data-ch");
      var any = false;
      links.forEach(function (a) {
        var sec = a.getAttribute("data-sec");
        var c = chOf(sec);
        if (c && c.id === ch && a.style.display !== "none") any = true;
      });
      h2.style.display = any ? "" : "none";
    });
  });
}
function simplePreview(s) { return s.length > 140 ? s.slice(0, 140) + "…" : s; }

/* ---------- Tanulási folyamat ---------- */
function bodyHTML(s) {
  return s.body.map(function (b) {
    if (typeof b === "string") return "<p>" + esc(b) + "</p>";
    return "<ul class='keys'>" + b.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
  }).join("");
}
function pStudy(id) {
  var s = DB.sections[id];
  if (!s) { app.innerHTML = "<h1>Nincs ilyen lecke</h1>"; return; }
  var ch = chOf(id), pv = prevSec(id), nx = nextSec(id);
  var htm = "<p class='mut'>" + ch.n + ". " + esc(ch.title) + "</p><h1>" + esc(s.title) + "</h1>";
  htm += "<div class='secnav'>" + (pv ? "<a class='btn ghost' href='#/tanulas/" + pv + "'>← " + esc(DB.sections[pv].title) + "</a>" : "<span></span>")
    + (nx ? "<a class='btn ghost' href='#/tanulas/" + nx + "'>" + esc(DB.sections[nx].title) + " →</a>" : "<span></span>") + "</div>";
  htm += "<nav class='studynav' aria-label='Lecke tartalomjegyzéke'><div class='studynav-in'>"
    + "<a href='#st-tananyag'>1. Tananyag</a><a href='#st-egyszeru'>2. Egyszerűen</a>"
    + "<a href='#st-kulcs'>3. Kulcspontok</a><a href='#st-kartya'>4. Kártyák</a>"
    + "<a href='#st-mini'>5. Minivizsga</a><a href='#st-kesz'>6. Kész?</a></div></nav>";
  htm += "<h2 id='st-tananyag'>1. Tananyag</h2><div class='card'>" + bodyHTML(s) + "</div>";
  htm += "<h2 id='st-egyszeru'>2. Egyszerűen</h2><div class='card'>" + esc(s.simple) + "</div>";
  htm += "<h2 id='st-kulcs'>3. Kulcspontok</h2><ul class='keys'>" + s.keys.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>";
  htm += "<h2 id='st-kartya'>4. Kártyák</h2><div id='studyCards'></div>";
  htm += "<h2 id='st-mini'>5. Minivizsga</h2><div id='studyQuiz'><button class='btn' id='startMini'>Minivizsga indítása (" + Math.min(S.quizLen, s.quiz.length) + " kérdés)</button></div>";
  htm += "<h2 id='st-kesz'>6. Kész?</h2><div id='studyDone'>" + doneBox(id) + "</div>";
  htm += "<div class='secnav'>" + (pv ? "<a class='btn ghost' href='#/tanulas/" + pv + "'>← Előző lecke</a>" : "<a class='btn ghost' href='#/tananyag'>← Tananyag</a>")
    + (nx ? "<a class='btn' href='#/tanulas/" + nx + "'>Következő lecke →</a>" : "<a class='btn' href='#/tananyag'>Tananyag áttekintés</a>") + "</div>";
  app.innerHTML = htm;
  flashWidget(document.getElementById("studyCards"), s.cards.map(function (c, i) { return { sec: id, idx: i, card: c }; }), { compact: true });
  document.getElementById("startMini").addEventListener("click", function () {
    var pool = poolQuestions([id]).slice(0, Math.min(S.quizLen, s.quiz.length));
    QZ = new Quiz.Session(pool, { title: "Minivizsga: " + s.title, mode: "mini", secIds: [id], feedback: "each" });
    go("#/kviz/play");
  });
}
function doneBox(id) {
  if (S.secDone[id]) return "<span class='chip done'>kész ✓</span> <button class='btn ghost' id='unDone'>Visszavonom</button>";
  return "<button class='btn good' id='markDone'>Késznek jelölöm</button>";
  }
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "markDone") {
    var id = (location.hash.split("/")[2] || "");
    S.secDone[id] = true; act("lecke", "Kész: " + (DB.sections[id] ? DB.sections[id].title : id)); save();
    document.getElementById("studyDone").innerHTML = doneBox(id);
  }
  if (e.target && e.target.id === "unDone") {
    var id2 = (location.hash.split("/")[2] || "");
    delete S.secDone[id2]; save();
    document.getElementById("studyDone").innerHTML = doneBox(id2);
  }
});

/* ---------- Kártya widget (ismétlés + SM-2) ---------- */
var KIND = { term: "Fogalom", def: "Fogalom", qa: "Kérdés–válasz", concept: "Összefüggés", date: "Dátum", fill: "Kiegészítős", fact: "Fontos tény" };
function flashWidget(mount, queue, opts) {
  opts = opts || {};
  queue = shuffle(queue.slice());
  var i = 0, again = {}, stats = { knew: 0, part: 0, dont: 0 };
  if (window.__fcKey) { document.removeEventListener("keydown", window.__fcKey); window.__fcKey = null; }
  function render() {
    if (i >= queue.length) {
      mount.innerHTML = "<div class='card'><b>Kártyázás vége.</b> Tudtam: " + stats.knew + " · Részben: " + stats.part + " · Nem tudtam: " + stats.dont
        + (opts.onDone ? "<br><br>" : "") + "</div>";
      act("kartya", "Kártyázás: " + stats.knew + "/" + (stats.knew + stats.part + stats.dont) + " tudtam");
      if (opts.onDone) opts.onDone(stats);
      return;
    }
    var it = queue[i], c = it.card;
    mount.innerHTML = "<div class='fcwrap'><div class='fcprog'><b>" + (i + 1) + " / " + queue.length + "</b><div class='bar' style='flex:1'><i style='width:" + Math.round(i / queue.length * 100) + "%'></i></div></div>"
      + "<div class='fc' id='fc' tabindex='0' role='button' aria-pressed='false' aria-label='Kártya " + (i + 1) + " / " + queue.length + ". Fordításhoz nyomj Entert vagy kattints.'><div class='fc-in'><div class='fc-face fc-front'><div><div class='fc-kind'>" + (KIND[c.kind] || "Kártya") + " · kattints a fordításhoz</div><br>" + esc(c.q) + "</div></div>"
      + "<div class='fc-face fc-back'><div>" + esc(c.a) + "</div></div></div></div>"
      + "<div class='grade-row' id='grades' style='display:none' aria-label='Önértékelés'>"
      + "<button class='btn bad' data-g='0'>Nem tudtam (1)</button>"
      + "<button class='btn warn' data-g='3'>Részben (2)</button>"
      + "<button class='btn good' data-g='5'>Tudtam (3)</button></div>"
      + "<p class='mut small'>Billentyű: <kbd>Szóköz</kbd> fordít, <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> értékel. (" + esc(DB.sections[it.sec].title) + ")</p></div>";
    var fc = document.getElementById("fc");
    addTilt(fc);
    function flip() { fc.classList.add("flip"); fc.setAttribute("aria-pressed", "true"); fc.style.transform = ""; document.getElementById("grades").style.display = "grid"; fc.onclick = null; var g1 = document.querySelector("#grades button"); if (g1) g1.focus(); }
    fc.onclick = flip;
    fc.onkeydown = function (e) {
      if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); flip(); }
    };
    document.getElementById("grades").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var g = +b.getAttribute("data-g");
      gradeCard(it.sec, it.idx, g);
      if (g === 5) stats.knew++; else if (g === 3) stats.part++; else stats.dont++;
      if (g === 0 && !again[it.sec + ":" + it.idx]) { again[it.sec + ":" + it.idx] = 1; queue.push(it); }
      i++; render();
    };
  }
  mount._key = function (e) {
    var fc = document.getElementById("fc"); if (!fc) return;
    if (e.key === " " || e.key === "Enter") { if (document.activeElement === document.body) { e.preventDefault(); fc.click(); } }
    else if (["1", "2", "3"].indexOf(e.key) !== -1) {
      var gr = document.getElementById("grades");
      if (gr && gr.style.display !== "none") {
        var map = { "1": 0, "2": 1, "3": 2 };
        var btns = gr.querySelectorAll("button");
        if (btns[map[e.key]]) btns[map[e.key]].click();
      }
    }
  };
  window.__fcKey = mount._key;
  document.addEventListener("keydown", mount._key);
  render();
}

/* ---------- Kártyák oldal ---------- */
function pCards() {
  var chOpts = DB.chapters.map(function (c) { return "<option value='" + c.id + "'>" + c.n + ". " + esc(c.title) + "</option>"; }).join("");
  app.innerHTML = "<h1>Kártyatár</h1><div class='card'><label class='f'>Fejezet</label><select id='fCh'><option value=''>Mind</option>" + chOpts + "</select>"
    + "<label style='display:block;margin-top:10px'><input type='checkbox' id='fDue' checked> Csak az esedékesek</label>"
    + "<div class='btnrow'><button class='btn' id='fGo'>Gyakorlás indítása</button></div><div id='fList'></div></div><div id='fPlay'></div>";
  function list() {
    var ch = document.getElementById("fCh").value, dueOnly = document.getElementById("fDue").checked;
    var ids = ch ? DB.chapters.filter(function (c) { return c.id === ch; })[0].sections : secOrder();
    var rows = [], t = todayStr();
    ids.forEach(function (id) {
      DB.sections[id].cards.forEach(function (c, i) {
        var st = cardSt(id, i), cs = cardState(st);
        if (dueOnly && !(cs === "new" || cs === "due")) return;
        rows.push("<tr><td>" + esc(DB.sections[id].title) + "</td><td>" + esc(c.q.length > 70 ? c.q.slice(0, 70) + "…" : c.q) + "</td><td>" + stateName(cs) + "</td></tr>");
      });
    });
    document.getElementById("fList").innerHTML = rows.length ? "<div class='table-scroll'><table class='t'><tr><th>Lecke</th><th>Kérdés</th><th>Állapot</th></tr>" + rows.join("") + "</table></div>"
      : "<div class='empty'>Nincs ilyen kártya. Vegyed ki a pipát, vagy válassz másik fejezetet.</div>";
  }
  document.getElementById("fCh").onchange = list;
  document.getElementById("fDue").onchange = list;
  list();
  document.getElementById("fGo").onclick = function () {
    var ch = document.getElementById("fCh").value;
    var ids = ch ? DB.chapters.filter(function (c) { return c.id === ch; })[0].sections : secOrder();
    var q = dueQueue(ids);
    if (!q.length) { document.getElementById("fPlay").innerHTML = "<div class='empty'>Nincs esedékes kártya. Pipáld ki az „esedékes” szűrőt, vagy gyere vissza később.</div>"; return; }
    document.getElementById("fPlay").innerHTML = "<h2>Gyakorlás (" + q.length + " kártya)</h2><div id='fp'></div>";
    flashWidget(document.getElementById("fp"), q, {});
    window.scrollTo(0, document.getElementById("fPlay").offsetTop);
  };
}
function stateName(s) { return { new: "Új", learning: "Tanulás alatt", due: "Esedékes", ok: "Megtanulta" }[s] || s; }

/* ---------- Kvízközpont ---------- */
function pQuizCenter() {
  var chOpts = DB.chapters.map(function (c) { return "<option value='" + c.id + "'>" + c.n + ". " + esc(c.title) + "</option>"; }).join("");
  var weak = weakSecs();
  app.innerHTML = "<h1>Kvízközpont</h1>"
    + "<div class='card'><h3>Gyors teszt</h3><p class='mut'>Rövid véletlen kvíz a beállításokban megadott kérdésszámmal (" + S.quizLen + "). Válaszadás után azonnal látsz magyarázatot.</p>"
    + "<label class='f'>Fejezetek (üresen hagyva: mind)</label><select id='qCh' multiple size='6'>" + chOpts + "</select>"
    + "<div class='btnrow'><button class='btn' id='qGo'>Gyors teszt indítása</button></div></div>"
    + "<div class='card'><h3>Vizsgaszimuláció</h3><p class='mut'>" + S.examLen + " kérdés több leckéből, magyarázat csak a beadás után." + (S.timerMin ? " Időkeret: " + S.timerMin + " perc." : " Időkeret nélkül.") + "</p>"
    + "<div class='btnrow'><button class='btn' id='eGo'>Vizsga indítása</button></div></div>"
    + "<div class='card'><h3>Gyenge pontjaim</h3>" + (weak.length ? weak.map(function (w) { return "<div>· <a href='#/tanulas/" + w.id + "'>" + esc(DB.sections[w.id].title) + "</a> – " + Math.round(w.acc * 100) + "% (" + w.asked + " válaszból)</div>"; }).join("") + "<div class='btnrow'><button class='btn warn' id='wGo'>Gyakorlókvíz a gyenge pontokból</button></div>"
      : "<p class='mut'>Még nincs gyenge pontod (3+ válasz és 70% alatti eredmény kell hozzá). Tölts ki pár minivizsgát!</p>") + "</div>"
    + "<div class='card'><h3>Villámismétlés (cram)</h3><p class='mut'>Csak a legfontosabb tények + gyors feleletválasztós kvíz.</p><div class='btnrow'><button class='btn ghost' id='cGo'>Villámismétlés</button></div><div id='cram'></div></div>";
  function selSecs() {
    var sel = Array.prototype.slice.call(document.getElementById("qCh").selectedOptions).map(function (o) { return o.value; });
    if (!sel.length) return secOrder();
    var ids = []; sel.forEach(function (c) { ids = ids.concat(DB.chapters.filter(function (x) { return x.id === c; })[0].sections); });
    return ids;
  }
  document.getElementById("qGo").onclick = function () {
    var pool = poolQuestions(selSecs()).slice(0, S.quizLen);
    if (!pool.length) return;
    QZ = new Quiz.Session(pool, { title: "Gyors teszt", mode: "quick", secIds: selSecs(), feedback: "each" });
    go("#/kviz/play");
  };
  document.getElementById("eGo").onclick = function () {
    var pool = poolQuestions(secOrder()).slice(0, S.examLen);
    QZ = new Quiz.Session(pool, { title: "Vizsgaszimuláció", mode: "exam", secIds: secOrder(), feedback: "end", seconds: S.timerMin * 60 });
    go("#/kviz/play");
  };
  var wBtn = document.getElementById("wGo");
  if (wBtn) wBtn.onclick = function () {
    var ids = weak.map(function (w) { return w.id; });
    var pool = poolQuestions(ids).slice(0, Math.max(S.quizLen, 8));
    QZ = new Quiz.Session(pool, { title: "Gyenge pontjaim", mode: "weak", secIds: ids, feedback: "each" });
    go("#/kviz/play");
  };
  document.getElementById("cGo").onclick = function () {
    var ids = weak.length ? weak.slice(0, 3).map(function (w) { return w.id; }) : secOrder().slice(0, 3);
    var keys = [];
    ids.forEach(function (id) { DB.sections[id].keys.forEach(function (k) { keys.push("<li>" + esc(k) + "</li>"); }); });
    var pool = poolQuestions(ids, ["mc", "tf"]).slice(0, S.quizLen);
    document.getElementById("cram").innerHTML = "<h3>Sűrítmény</h3><ul class='keys'>" + keys.join("") + "</ul><div class='btnrow'><button class='btn' id='cStart'>Kvíz a sűrítményből</button></div>";
    document.getElementById("cStart").onclick = function () {
      QZ = new Quiz.Session(pool, { title: "Villámkvíz", mode: "cram", secIds: ids, feedback: "each" });
      go("#/kviz/play");
    };
  };
}

/* ---------- Kvízlejátszás ---------- */
var QZ = null;
function pQuizPlay() {
  if (!QZ || !QZ.qs.length) { app.innerHTML = "<div class='empty'>Nincs aktív kvíz. Indíts egyet a <a href='#/kviz'>kvízközpontból</a>.</div>"; return; }
  if (QZ.done) return renderResults();
  var q = QZ.qs[QZ.i], r = QZ.res[QZ.i];
  var htm = "<p class='mut'>" + esc(QZ.title) + (QZ.left ? " · <span class='timer' id='tm'></span>" : "") + "</p><h1>" + (QZ.i + 1) + ". kérdés <span class='mut small'>/ " + QZ.qs.length + " · " + Quiz.typeName(q.t) + "</span></h1>";
  htm += "<div class='qdots' role='group' aria-label='Kérdések'>" + QZ.qs.map(function (_, i) {
    var cls = i === QZ.i ? "cur" : "";
    if (QZ.res[i]) cls += QZ.res[i].ok ? " ok" : " no";
    else if (QZ.given[i] !== undefined) cls += " cur";
    return "<button data-i='" + i + "' class='" + cls + "' aria-label='" + (i + 1) + ". kérdés" + (QZ.res[i] ? (QZ.res[i].ok ? ", helyes" : ", helytelen") : "") + "'" + (i === QZ.i ? " aria-current='true'" : "") + ">" + (i + 1) + "</button>";
  }).join("") + "</div>";
  htm += "<div class='card'><p><b>" + esc(q.q) + "</b></p><div id='qbody'></div><div id='qfb'></div></div>";
  htm += "<div class='secnav'><button class='btn ghost' id='qPrev'" + (QZ.i === 0 ? " disabled" : "") + ">← Előző</button>"
    + (QZ.i < QZ.qs.length - 1 ? "<button class='btn' id='qNext'>Következő →</button>" : "<button class='btn good' id='qFin'>Befejezem</button>") + "</div>";
  app.innerHTML = htm;
  renderQBody(q, r);
  app.querySelectorAll(".qdots button").forEach(function (b) { b.onclick = function () { QZ.i = +b.getAttribute("data-i"); pQuizPlay(); }; });
  document.getElementById("qPrev").onclick = function () { if (QZ.i > 0) { QZ.i--; pQuizPlay(); } };
  var nx = document.getElementById("qNext"); if (nx) nx.onclick = function () { QZ.i++; pQuizPlay(); };
  var fn = document.getElementById("qFin"); if (fn) fn.onclick = function () { QZ.finish(); pQuizPlay(); };
  if (QZ.left && !QZ.timerId) {
    var end = Date.now() + QZ.left * 1000;
    QZ.timerId = setInterval(function () {
      var s = Math.max(0, Math.round((end - Date.now()) / 1000));
      var el = document.getElementById("tm");
      if (el) el.textContent = Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
      if (s <= 0) { clearInterval(QZ.timerId); QZ.finish(); pQuizPlay(); }
    }, 1000);
  }
}
function renderQBody(q, r) {
  var box = document.getElementById("qbody");
  if (q.t === "mc") {
    box.innerHTML = q.opts.map(function (o, i) { return "<button class='opt" + (QZ.given[QZ.i] === i ? " sel" : "") + "' data-i='" + i + "'>" + esc(o) + "</button>"; }).join("");
    box.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        if (QZ.res[QZ.i] !== undefined) return;
        QZ.given[QZ.i] = +b.getAttribute("data-i");
        if (QZ.feedback === "each") { var rr = QZ.answer(QZ.i, QZ.given[QZ.i]); showFb(rr, q); markDots(); paintOpts(q); }
        else { save(); pQuizPlay(); }
      };
    });
  } else if (q.t === "tf") {
    box.innerHTML = "<button class='opt' data-v='1'>Igaz</button><button class='opt' data-v='0'>Hamis</button>";
    box.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        if (QZ.res[QZ.i] !== undefined) return;
        QZ.given[QZ.i] = b.getAttribute("data-v") === "1";
        if (QZ.feedback === "each") { var rr = QZ.answer(QZ.i, QZ.given[QZ.i]); showFb(rr, q); markDots(); }
        else { save(); pQuizPlay(); }
      };
    });
    if (QZ.given[QZ.i] !== undefined && QZ.feedback === "end") {
      var sel = QZ.given[QZ.i] ? 0 : 1;
      box.querySelectorAll(".opt")[sel].classList.add("sel");
    }
  } else if (q.t === "fill" || q.t === "short") {
    box.innerHTML = (q.t === "short" ? "<textarea id='tx' placeholder='Válaszod…'>" + esc(QZ.given[QZ.i] || "") + "</textarea>" : "<input type='text' id='tx' placeholder='Válaszod…' value='" + esc(QZ.given[QZ.i] || "") + "'>")
      + "<div class='btnrow'><button class='btn' id='ans'>Válaszolok</button></div>";
    document.getElementById("ans").onclick = function () {
      var v = document.getElementById("tx").value;
      if (!v.trim()) return;
      QZ.given[QZ.i] = v;
      if (QZ.feedback === "each") { var rr = QZ.answer(QZ.i, v); showFb(rr, q); markDots(); document.getElementById("ans").disabled = true; }
      else { save(); pQuizPlay(); }
    };
  } else if (q.t === "match") {
    box.innerHTML = q.pairs.map(function (p) {
      var cur = (QZ.given[QZ.i] || {})[p[0]] || "";
      return "<div class='matchrow'><b>" + esc(p[0]) + "</b><select data-k='" + esc(p[0]) + "'><option value=''>– válassz –</option>"
        + q.rights.map(function (r2) { return "<option" + (r2 === cur ? " selected" : "") + ">" + esc(r2) + "</option>"; }).join("") + "</select></div>";
    }).join("") + "<div class='btnrow'><button class='btn' id='ans'>Válaszolok</button></div>";
    document.getElementById("ans").onclick = function () {
      var g = {};
      box.querySelectorAll("select").forEach(function (s2) { g[s2.getAttribute("data-k")] = s2.value; });
      QZ.given[QZ.i] = g;
      if (QZ.feedback === "each") { var rr = QZ.answer(QZ.i, g); showFb(rr, q); markDots(); document.getElementById("ans").disabled = true; }
      else { save(); pQuizPlay(); }
    };
  }
  if (r) { showFb(r, q); if (q.t === "mc") paintOpts(q); }
}
function paintOpts(q) {
  var btns = document.querySelectorAll("#qbody .opt");
  btns.forEach(function (b, i) {
    if (i === q.ans) b.classList.add("right");
    else if (i === QZ.given[QZ.i]) b.classList.add("wrong");
  });
}
function showFb(r, q) {
  document.getElementById("qfb").innerHTML = "<div class='fb " + (r.ok ? "ok" : "no") + "'><b>" + (r.ok ? "Helyes ✓" : "Helytelen ✗") + "</b> Helyes válasz: " + esc(r.correct)
    + (r.detail ? " <span class='mut'>(" + esc(r.detail) + ")</span>" : "")
    + (q.exp ? "<br>" + esc(q.exp) : "") + (q.ref ? "<br><span class='ref'>Forrás: " + esc(q.ref) + (q.secTitle ? " · " + esc(q.secTitle) : "") + "</span>" : "") + "</div>";
}
function markDots() {
  app.querySelectorAll(".qdots button").forEach(function (b, i) {
    b.classList.remove("ok", "no");
    if (QZ.res[i]) b.classList.add(QZ.res[i].ok ? "ok" : "no");
  });
}
function renderResults() {
  var sc = QZ.score(), p = pct(sc.correct, sc.total);
  var htm = "<h1>Eredmény: " + sc.correct + " / " + sc.total + " (" + p + "%)</h1><div class='bar" + (p >= 70 ? " good" : " warn") + "'><i style='width:" + p + "%'></i></div>";
  htm += p >= 70 ? "<p><b>Szép munka!</b> Ezt a részt tudod.</p>" : "<p><b>Érdemes átnézni.</b> A hibás kérdések forrásánál megtalálod, mit kell újratanulni.</p>";
  QZ.qs.forEach(function (q, i) {
    var r = QZ.res[i];
    htm += "<div class='card'><b>" + (i + 1) + ". " + esc(q.q) + "</b> <span class='chip'>" + Quiz.typeName(q.t) + "</span> "
      + (r.ok ? "<span class='chip done'>helyes ✓</span>" : "<span class='chip' style='background:var(--bad);color:#fff'>helytelen ✗</span>")
      + "<br>Helyes válasz: <b>" + esc(r.correct) + "</b>" + (r.detail ? " <span class='mut'>(" + esc(r.detail) + ")</span>" : "")
      + (q.exp ? "<br>" + esc(q.exp) : "") + (q.ref ? "<br><span class='ref'>Forrás: " + esc(q.ref) + (q.secTitle ? " · " + esc(q.secTitle) : "") + "</span>" : "") + "</div>";
  });
  var back = QZ.mode === "mini" && QZ.secIds[0] ? "<a class='btn' href='#/tanulas/" + QZ.secIds[0] + "'>Vissza a leckéhez</a>" : "<a class='btn' href='#/kviz'>Új kvíz</a>";
  htm += "<div class='btnrow'>" + back + "<a class='btn ghost' href='#/statisztika'>Statisztika</a></div>";
  if (QZ.timerId) { clearInterval(QZ.timerId); QZ.timerId = null; }
  app.innerHTML = htm;
}

/* ---------- Ismétlés ---------- */
function pRevision() {
  var q = dueQueue();
  var weak = weakSecs();
  var doneIds = secOrder().filter(function (id) { return S.secDone[id]; });
  app.innerHTML = "<h1>Ismétlőközpont</h1><div class='grid g3'>"
    + statCard("Esedékes kártya", q.length + "", 0)
    + statCard("Gyenge téma", weak.length + "", 0)
    + statCard("Kész lecke", doneIds.length + " / " + secOrder().length, pct(doneIds.length, secOrder().length))
    + "</div><div class='btnrow'><button class='btn' id='rGo'>Ismétlés most (" + q.length + " kártya)</button> "
    + "<button class='btn warn' id='rWeak'>Gyenge pontjaim</button> <button class='btn ghost' id='rCum'>Vegyes ismétlő kvíz</button></div><div id='rPlay'></div>"
    + (weak.length ? "<h2>Gyenge témák</h2>" + weak.map(function (w) { return "<div class='card'>· <a href='#/tanulas/" + w.id + "'>" + esc(DB.sections[w.id].title) + "</a> – " + Math.round(w.acc * 100) + "%</div>"; }).join("") : "");
  document.getElementById("rGo").onclick = function () {
    if (!q.length) { document.getElementById("rPlay").innerHTML = "<div class='empty'>Nincs esedékes kártya. Gyere vissza később!</div>"; return; }
    document.getElementById("rPlay").innerHTML = "<div id='rp'></div>";
    flashWidget(document.getElementById("rp"), q, {});
  };
  document.getElementById("rWeak").onclick = function () {
    var ids = weak.length ? weak.map(function (w) { return w.id; }) : secOrder();
    var pool = poolQuestions(ids).slice(0, Math.max(S.quizLen, 8));
    QZ = new Quiz.Session(pool, { title: "Gyenge pontjaim", mode: "weak", secIds: ids, feedback: "each" });
    go("#/kviz/play");
  };
  document.getElementById("rCum").onclick = function () {
    var oldies = poolQuestions(doneIds.length ? doneIds : secOrder());
    var fresh = poolQuestions(secOrder().filter(function (id) { return !S.secDone[id]; }));
    var pool = shuffle(oldies.slice(0, Math.ceil(S.quizLen / 2)).concat(fresh.slice(0, Math.floor(S.quizLen / 2))));
    if (!pool.length) pool = poolQuestions(secOrder()).slice(0, S.quizLen);
    QZ = new Quiz.Session(pool.slice(0, S.quizLen), { title: "Vegyes ismétlő kvíz", mode: "cum", secIds: secOrder(), feedback: "each" });
    go("#/kviz/play");
  };
}

/* ---------- Statisztika ---------- */
function pStats() {
  var htm = "<h1>Statisztika</h1><h2>Fejezetenként</h2>";
  DB.chapters.forEach(function (c) {
    var asked = 0, corr = 0, done = 0;
    c.sections.forEach(function (id) {
      var s = S.sec[id]; if (s) { asked += s.asked; corr += s.correct; }
      if (S.secDone[id]) done++;
    });
    htm += "<div class='card'><b>" + c.n + ". " + esc(c.title) + "</b> – kész " + done + "/" + c.sections.length
      + " · kvíz " + pct(corr, asked) + "% (" + asked + " válasz)<div class='bar" + (pct(corr, asked) >= 70 ? " good" : "") + "'><i style='width:" + pct(corr, asked) + "%'></i></div></div>";
  });
  htm += "<h2>Leckénként</h2><div class='table-scroll'><table class='t'><tr><th>Lecke</th><th>Kész</th><th>Helyes</th><th>Válasz</th></tr>";
  secOrder().forEach(function (id) {
    var s = S.sec[id] || { asked: 0, correct: 0 };
    htm += "<tr><td><a href='#/tanulas/" + id + "'>" + esc(DB.sections[id].title) + "</a></td><td>" + (S.secDone[id] ? "✓" : "–") + "</td><td>" + pct(s.correct, s.asked) + "%</td><td>" + s.asked + "</td></tr>";
  });
  htm += "</table></div><h2>Kvízelőzmény</h2>";
  htm += S.quizHist.length ? "<div class='table-scroll'><table class='t'><tr><th>Idő</th><th>Kvíz</th><th>Eredmény</th></tr>" + S.quizHist.slice(0, 20).map(function (h) {
    return "<tr><td>" + fmtDate(h.ts) + "</td><td>" + esc(h.title) + "</td><td>" + h.correct + "/" + h.total + " (" + pct(h.correct, h.total) + "%)</td></tr>";
  }).join("") + "</table></div>" : "<div class='empty'>Még nincs kvízelőzményed.</div>";
  app.innerHTML = htm;
}

/* ---------- Beállítások ---------- */
function pSettings() {
  app.innerHTML = "<h1>Beállítások</h1><div class='card'>"
    + "<label class='f'>Téma</label><select id='sTheme'><option value='dark'>Sötét</option><option value='light'>Világos</option></select>"
    + "<label class='f'>Kérdésszám (gyors teszt, minivizsga)</label><select id='sQ'>" + [5, 6, 7, 8, 9, 10].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select>"
    + "<label class='f'>Vizsgaszimuláció hossza</label><select id='sE'>" + [10, 15, 20, 30].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select>"
    + "<label class='f'>Vizsga időkeret (perc, 0 = nincs)</label><select id='sT'>" + [0, 15, 30, 45].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select>"
    + "<div class='btnrow'><button class='btn' id='sSave'>Mentés</button></div></div>"
    + "<div class='card'><h3>Haladás mentése / visszaállítása</h3><p class='mut'>A haladásod ebben a böngészőben tárolódik. Exporttal lementheted, importtal visszatöltheted.</p>"
    + "<div class='btnrow'><button class='btn ghost' id='sExp'>Export letöltése</button> <label class='btn ghost' style='cursor:pointer'>Import fájlból<input type='file' id='sImp' accept='.json' style='display:none'></label></div></div>"
    + "<div class='card'><h3>Veszélyzóna</h3><div class='btnrow'><button class='btn bad' id='sReset'>Minden haladás törlése</button></div></div>";
  document.getElementById("sTheme").value = S.theme;
  document.getElementById("sQ").value = String(S.quizLen);
  document.getElementById("sE").value = String(S.examLen);
  document.getElementById("sT").value = String(S.timerMin);
  document.getElementById("sSave").onclick = function () {
    S.theme = document.getElementById("sTheme").value;
    S.quizLen = +document.getElementById("sQ").value;
    S.examLen = +document.getElementById("sE").value;
    S.timerMin = +document.getElementById("sT").value;
    save(); applyTheme(); alert("Elmentve.");
  };
  document.getElementById("sExp").onclick = function () {
    var blob = new Blob([JSON.stringify(S)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "magasepites-haladas.json"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  };
  document.getElementById("sImp").onchange = function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o.secDone || !o.card) throw 0;
        S = Object.assign(defState(), o); save(); applyTheme();
        alert("Visszatöltve."); render();
      } catch (err) { alert("Érvénytelen fájl."); }
    };
    r.readAsText(f);
  };
  document.getElementById("sReset").onclick = function () {
    if (confirm("Biztosan törlöd az összes haladást?")) { S = defState(); save(); applyTheme(); render(); }
  };
}

/* ---------- Téma / indulás ---------- */
function applyTheme() { document.documentElement.setAttribute("data-theme", S.theme); }
applyTheme();
render();
