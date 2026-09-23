/* Magasépítés II. Tanulótárs – 3D hero (offline, függőség nélkül).
   Vanilla canvas 2D-re rajzolt izometrikus házmodell: sávalap, fal
   nyílásáthidalással (Porotherm áthidaló kiemelve), koszorú, E-gerendás
   födém, magastető. Egérrel / ujjal forgatható, szétszedhető nézet,
   rétegkijelölés tanulási magyarázattal.
   Mobil: pointer events, touch-action: pan-y (függőleges scroll megmarad),
   DPR cap, reszponzív vászonméret. */
(function () {
  "use strict";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COARSE = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  var TILT = 0.30;          // dőlésszög-faktor a dimetrikus vetítéshez
  var SPIN = 0.22;          // rad/s automatikus forgás
  var IDLE_RESUME = 3500;   // ms tétlenség után újraindul a forgás
  var IDLE_CLEAR = 5000;    // ms chip-tétlenség után a kijelölés elhalványul

  var LAYERS = [
    { id: "alap", name: "Sávalap",
      desc: "Sávalap: a falak terhét a talajra adja. Lábazatnál kívül XPS + vízszigetelés – ez tipikus hőhíd-csomópont (05-ös fejezet)." },
    { id: "fal", name: "Fal + áthidaló",
      desc: "Kék elem = Porotherm áthidaló (húzott öv). Felette min. 1 sor (20 cm) ráfalazás a nyomott öv – enélkül nincs végleges teherbírás. Kivétel: M-25, az azonnal terhelhető." },
    { id: "koszoru", name: "Koszorú",
      desc: "Zöld sáv = monolit vb koszorú a födémsíkban: teherelosztás + merevítés. U-zsalu bennmaradó zsaluként, kívül hőszigeteléssel, különben hőhíd." },
    { id: "fodem", name: "Födém",
      desc: "E-gerenda + béléstest + helyszíni felbeton. Felfekvés ≥ 10–12 cm; teherbírás csak kibetonozás és koszorú után. Az ablakon át a gerendák is látszanak." },
    { id: "teto", name: "Magastető",
      desc: "A fedélszék a koszorúra ül. Csomópontban kritikus: a hőszigetelés folytonossága és a légzárás a födém–tető találkozásánál." }
  ];
  var EX_STEP = [0, 1.1, 2.2, 3.3, 4.4]; // rétegenkénti szétcsúsztatás (modell-egység)

  /* ---------- geometria ---------- */
  function F(pts, n, color, layer) { return { p: pts, n: n, c: color, l: layer }; }
  function box(out, cx, cy, cz, sx, sy, sz, color, layer) {
    var x0 = cx - sx / 2, x1 = cx + sx / 2;
    var y0 = cy - sy / 2, y1 = cy + sy / 2;
    var z0 = cz - sz / 2, z1 = cz + sz / 2;
    out.push(F([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], color, layer));
    out.push(F([[x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [x1, y0, z0]], [0, 0, -1], color, layer));
    out.push(F([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0], color, layer));
    out.push(F([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], [1, 0, 0], color, layer));
    out.push(F([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0], color, layer));
    out.push(F([[x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0]], [0, 1, 0], color, layer));
  }

  /* Megj.: a dobozok szándékosan 0.02-es hézagokkal illeszkednek (sarok- és
     rétegcsatlakozások), hogy ne keletkezzen egy síkban fekvő / egymásba
     metsző lappár – azt a painter-rendezés nem tudná helyesen sorrendezni. */
  function buildModel(pal) {
    var faces = [];
    /* 0 – sávalap */
    box(faces, 5, 4, 0.5, 11, 9, 1, pal.found, 0);
    /* padlólemez az alap felett (alja az alap síkja fölött) */
    box(faces, 5, 4, 1.095, 9.1, 7.1, 0.15, pal.slab, 0);
    /* 1 – falak. Homlokfali ablaknyílás: x 3.5–6.5, z 1.9–3.22.
       Felette áthidaló (húzott öv, kicsit büszke a falsíkból),
       afelett ráfalazás (nyomott öv) a koszorúig. */
    var W = pal.brick;
    box(faces, 1.985, 0.225, 2.235, 3.03, 0.45, 2.47, W, 1); // bal pillér (x 0.47–3.5)
    box(faces, 8.015, 0.225, 2.235, 3.03, 0.45, 2.47, W, 1); // jobb pillér (x 6.5–9.53)
    box(faces, 5, 0.225, 1.45, 2.96, 0.45, 0.9, W, 1);       // parapet
    box(faces, 5, 0.225, 3.735, 9.06, 0.45, 0.53, W, 1);     // ráfalazás = nyomott öv (z 3.47–4.0)
    box(faces, 5, 0.225, 3.345, 2.96, 0.51, 0.25, pal.acc, 1); // Porotherm áthidaló (z 3.22–3.47)
    box(faces, 5, 7.775, 2.5, 9.06, 0.45, 3, W, 1);          // hátfal
    box(faces, 0.225, 4, 2.5, 0.45, 8, 3, W, 1);             // bal oldalfal
    box(faces, 9.775, 4, 2.5, 0.45, 8, 3, W, 1);             // jobb oldalfal
    /* 2 – koszorú (alja a falsík teteje fölött) */
    box(faces, 5, 0.25, 4.245, 10, 0.5, 0.45, pal.acc2, 2);
    box(faces, 5, 7.75, 4.245, 10, 0.5, 0.45, pal.acc2, 2);
    box(faces, 0.25, 4, 4.245, 0.5, 6.96, 0.45, pal.acc2, 2);
    box(faces, 9.75, 4, 4.245, 0.5, 6.96, 0.45, pal.acc2, 2);
    /* 3 – E-gerendás födém (gerendák teteje a lemez alja alatt) */
    var gx;
    for (gx = 1; gx <= 9; gx += 2) box(faces, gx, 4, 4.265, 0.35, 7.1, 0.33, pal.beam, 3);
    box(faces, 5, 4, 4.665, 10, 8, 0.35, pal.slab, 3);
    /* 4 – magastető (eresz z=4.86, gerinc z=6.42, y=4) */
    faces.push(F([[-0.7, -0.7, 4.86], [10.7, -0.7, 4.86], [10.7, 4, 6.42], [-0.7, 4, 6.42]],
      [0, -0.5, 0.87], pal.roof, 4));
    faces.push(F([[-0.7, 8.7, 4.86], [-0.7, 4, 6.42], [10.7, 4, 6.42], [10.7, 8.7, 4.86]],
      [0, 0.5, 0.87], pal.roof, 4));
    faces.push(F([[0, -0.7, 4.86], [0, 4, 6.42], [0, 8.7, 4.86]], [-1, 0, 0], pal.gable, 4));
    faces.push(F([[10, -0.7, 4.86], [10, 8.7, 4.86], [10, 4, 6.42]], [1, 0, 0], pal.gable, 4));
    return faces;
  }

  /* ---------- szín ---------- */
  function shade(hex, n) {
    var f = 1;
    if (Math.abs(n[2]) > 0.9) f = 1;
    else if (Math.abs(n[2]) > 0.5) f = 0.93;
    else if (Math.abs(n[0]) > 0.5) f = 0.78;
    else f = 0.88;
    var v = parseInt(hex.slice(1), 16);
    var r = Math.min(255, ((v >> 16) & 255) * f) | 0;
    var g = Math.min(255, ((v >> 8) & 255) * f) | 0;
    var b = Math.min(255, (v & 255) * f) | 0;
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  function cssVar(name, fb) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    } catch (e) { return fb; }
  }

  /* ---------- mount ---------- */
  function mount(cvId, chipsId, capId, exId) {
    var cv = typeof cvId === "string" ? document.getElementById(cvId) : cvId;
    if (!cv) return function () {};
    var ctx;
    try { ctx = cv.getContext("2d"); } catch (e) { ctx = null; }
    if (!ctx) { cv.style.display = "none"; return function () {}; }
    var chipsEl = document.getElementById(chipsId);
    var capEl = document.getElementById(capId);
    var exEl = document.getElementById(exId);

    var pal = {
      acc: cssVar("--acc", "#5aa9ff"), acc2: cssVar("--acc2", "#7ee2a8"),
      found: "#6b7280", slab: "#9aa3b2", brick: "#c27a56",
      beam: "#7c8698", roof: "#5b6b8c", gable: "#b98a68"
    };
    var faces = buildModel(pal);

    var state = {
      ang: 0.7, ex: 0.3, pinned: -1, hover: -1,
      lastAct: 0, lastChip: 0, dim: 0, dimTarget: 0, clearTimer: 0,
      raf: 0, dead: false, w: 0, h: 0
    };
    if (exEl) { state.ex = (parseInt(exEl.value, 10) || 0) / 100; }

    function sel() { return state.hover >= 0 ? state.hover : state.pinned; }
    function defaultCap() {
      return "Rétegek alulról: sávalap · fal nyílásáthidalással · koszorú · födém · tető. Koppints egy rétegre a magyarázatért.";
    }
    function paintCap() {
      if (!capEl) return;
      var s = sel();
      capEl.textContent = s >= 0 ? (LAYERS[s].name + " – " + LAYERS[s].desc) : defaultCap();
    }
    function paintChips() {
      if (!chipsEl) return;
      var s = sel(), i, html = "";
      for (i = 0; i < LAYERS.length; i++) {
        html += "<button type='button' class='chipbtn" + (s === i ? " on" : "") +
          "' data-l='" + i + "' aria-pressed='" + (state.pinned === i) + "'>" +
          LAYERS[i].name + "</button>";
      }
      chipsEl.innerHTML = html;
    }

    /* vetítés + rajz */
    function frame() {
      var i, j, cosA = Math.cos(state.ang), sinA = Math.sin(state.ang);
      var vx = cosA, vy = sinA; // nézeti irány (x,y)
      var proj = [], s = sel();
      for (i = 0; i < faces.length; i++) {
        var fc = faces[i];
        var dot = fc.n[0] * vx + fc.n[1] * vy + fc.n[2] * 0.35;
        if (dot <= 0.02) continue; // hátlap eldobása
        var dz = EX_STEP[fc.l] * state.ex, d = 0, z = 0, raw = [];
        for (j = 0; j < fc.p.length; j++) {
          var p = fc.p[j];
          var rx = p[0] * cosA + p[1] * sinA;
          var ry = -p[0] * sinA + p[1] * cosA;
          var zz = p[2] + dz;
          raw.push([ry, -zz + rx * TILT]);
          d += rx; z += zz;
        }
        proj.push({ pts: raw, depth: d / fc.p.length, z: z / fc.p.length,
          layer: fc.l, c: shade(fc.c, fc.n), dim: s >= 0 && fc.l !== s });
      }
      /* painter-rendezés: távolság, majd réteg/magasság mint determinisztikus
         döntetlen-feloldás (stabil sorrend, nincs vibrálás határesetekben) */
      proj.sort(function (a, b) { return a.depth - b.depth || a.layer - b.layer || a.z - b.z; });

      var w = state.w, h = state.h;
      ctx.clearRect(0, 0, w, h);
      if (!proj.length) return;
      var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, k, q;
      for (k = 0; k < proj.length; k++) {
        var pp = proj[k].pts;
        for (q = 0; q < pp.length; q++) {
          if (pp[q][0] < x0) x0 = pp[q][0];
          if (pp[q][0] > x1) x1 = pp[q][0];
          if (pp[q][1] < y0) y0 = pp[q][1];
          if (pp[q][1] > y1) y1 = pp[q][1];
        }
      }
      var sc = Math.min(w / Math.max(1e-6, x1 - x0), h / Math.max(1e-6, y1 - y0)) * 0.9;
      var ox = w / 2 - (x0 + x1) / 2 * sc, oy = h / 2 - (y0 + y1) / 2 * sc;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      for (k = 0; k < proj.length; k++) {
        var g = proj[k];
        ctx.globalAlpha = g.dim ? 1 - state.dim * 0.75 : 1;
        ctx.fillStyle = g.c;
        ctx.beginPath();
        ctx.moveTo(ox + g.pts[0][0] * sc, oy + g.pts[0][1] * sc);
        for (q = 1; q < g.pts.length; q++) ctx.lineTo(ox + g.pts[q][0] * sc, oy + g.pts[q][1] * sc);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    /* méretezés: DPR cap mobilon 1, egyébként max 2 */
    var dpr = 1;
    function fit() {
      var r = cv.getBoundingClientRect();
      var cssW = Math.max(1, r.width), cssH = Math.max(1, r.height || cv.clientHeight || 260);
      var small = window.innerWidth < 760 || COARSE;
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 2);
      state.w = cssW; state.h = cssH;
      cv.width = Math.round(cssW * dpr); cv.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frame();
    }

    /* hurok (csökkentett mozgásnál csak igény szerint rajzol) */
    var prev = 0;
    function loop(t) {
      if (state.dead) return;
      if (!prev) prev = t;
      var dt = Math.min(0.05, (t - prev) / 1000); prev = t;
      if (!REDUCED && t - state.lastAct > IDLE_RESUME) state.ang += dt * SPIN;
      /* halványítás-kiegyenlítés: kijelöléskor gyors, visszafelé lassú */
      var dd = state.dimTarget - state.dim;
      if (dd !== 0) {
        var step = (dd > 0 ? 5 : 1.2) * dt;
        state.dim += Math.abs(dd) <= step ? dd : (dd > 0 ? step : -step);
      }
      frame();
      state.raf = requestAnimationFrame(loop);
    }

    /* forgatás: egységes pointer-kezelés egérre + érintésre.
       touch-action: pan-y (CSS) → függőleges scroll megmarad, vízszintes húzás forgat. */
    var drag = null;
    function onDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { x: e.clientX, a: state.ang, id: e.pointerId };
      state.lastAct = performance.now();
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
    }
    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      state.ang = drag.a + dx * 0.008;
      state.lastAct = performance.now();
      if (REDUCED) frame();
    }
    function onUp(e) {
      if (drag && e.pointerId === drag.id) { drag = null; state.lastAct = performance.now(); }
    }

    /* kijelölés-érintés: órát indít; 5 mp chip-tétlenség után minden
       réteg lassan visszaúszik teljes fedettségre */
    function chipTouch() {
      state.lastChip = performance.now();
      state.dimTarget = sel() >= 0 ? 1 : 0;
      if (state.clearTimer) clearTimeout(state.clearTimer);
      state.clearTimer = setTimeout(clearSel, IDLE_CLEAR);
    }
    function clearSel() {
      state.clearTimer = 0;
      if (sel() < 0) return;
      state.pinned = -1; state.hover = -1;
      state.dimTarget = 0;
      paintChips(); paintCap();
      if (REDUCED) { state.dim = 0; frame(); }
    }
    function onChipsClick(e) {
      var b = e.target.closest ? e.target.closest("button[data-l]") : null;
      if (!b) return;
      var l = +b.getAttribute("data-l");
      state.pinned = (state.pinned === l) ? -1 : l;
      state.lastAct = performance.now();
      paintChips(); paintCap(); chipTouch();
      if (REDUCED) frame();
    }
    function onChipsOver(e) {
      if (COARSE) return; // érintőképernyőn csak koppintás jelöl ki
      var b = e.target.closest ? e.target.closest("button[data-l]") : null;
      state.hover = b ? +b.getAttribute("data-l") : -1;
      paintChips(); paintCap(); chipTouch();
    }
    function onChipsBlur(e) {
      if (COARSE) return;
      var to = e.relatedTarget;
      if (to && chipsEl.contains(to)) return; // jön a focusin a következő gombról
      state.hover = -1;
      paintChips(); paintCap(); chipTouch();
    }
    function onEx() {
      state.ex = (parseInt(exEl.value, 10) || 0) / 100;
      state.lastAct = performance.now();
      if (REDUCED) frame();
    }
    function onResize() { fit(); }

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    if (chipsEl) {
      chipsEl.addEventListener("click", onChipsClick);
      chipsEl.addEventListener("mouseover", onChipsOver);
      chipsEl.addEventListener("mouseout", onChipsOver);
      chipsEl.addEventListener("focusin", onChipsOver);
      chipsEl.addEventListener("focusout", onChipsBlur);
    }
    if (exEl) exEl.addEventListener("input", onEx);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    paintChips(); paintCap(); fit();
    state.lastAct = performance.now();
    if (!REDUCED) state.raf = requestAnimationFrame(loop);

    return function destroy() {
      state.dead = true;
      if (state.raf) cancelAnimationFrame(state.raf);
      if (state.clearTimer) { clearTimeout(state.clearTimer); state.clearTimer = 0; }
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      if (chipsEl) {
        chipsEl.removeEventListener("click", onChipsClick);
        chipsEl.removeEventListener("mouseover", onChipsOver);
        chipsEl.removeEventListener("mouseout", onChipsOver);
        chipsEl.removeEventListener("focusin", onChipsOver);
        chipsEl.removeEventListener("focusout", onChipsBlur);
      }
      if (exEl) exEl.removeEventListener("input", onEx);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }

  window.Hero3D = { mount: mount, layers: LAYERS,
    _debug: { build: buildModel, shade: shade } };
})();
