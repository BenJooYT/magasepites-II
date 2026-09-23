/* Kvízmotor: feleletválasztós, igaz-hamis, kiegészítős, rövid válasz, párosítás. */
var Quiz = (function () {
  function prep(q) {
    var c = { t: q.t, q: q.q, exp: q.exp || "", ref: q.ref || "", sec: q.sec || "", secTitle: q.secTitle || "" };
    if (q.t === "mc") {
      var order = shuffle(q.opts.map(function (_, i) { return i; }));
      c.opts = order.map(function (i) { return q.opts[i]; });
      c.ans = order.indexOf(q.ans);
    } else if (q.t === "tf") { c.ans = !!q.ans; }
    else if (q.t === "fill") { c.ans = q.ans.slice(); }
    else if (q.t === "short") { c.keywords = q.keywords.slice(); c.model = q.model; }
    else if (q.t === "match") {
      c.pairs = q.pairs.map(function (p) { return p.slice(); });
      c.rights = shuffle(q.pairs.map(function (p) { return p[1]; }));
    }
    return c;
  }

  function grade(q, given) {
    if (q.t === "mc") {
      var ok = given === q.ans;
      return { ok: ok, score: ok ? 1 : 0, correct: q.opts[q.ans] };
    }
    if (q.t === "tf") {
      var ok2 = given === q.ans;
      return { ok: ok2, score: ok2 ? 1 : 0, correct: q.ans ? "Igaz" : "Hamis" };
    }
    if (q.t === "fill") {
      var g = norm(given || "");
      var ok3 = q.ans.some(function (a) {
        var n = norm(a);
        return g === n || (n.length >= 3 && g.indexOf(n) !== -1);
      });
      return { ok: ok3, score: ok3 ? 1 : 0, correct: q.ans[0] };
    }
    if (q.t === "short") {
      var g2 = norm(given || "");
      var hit = q.keywords.filter(function (k) { return g2.indexOf(norm(k)) !== -1; }).length;
      var need = Math.max(1, Math.ceil(q.keywords.length * 0.6));
      var ok4 = hit >= need;
      return { ok: ok4, score: ok4 ? 1 : 0, correct: q.model, detail: hit + "/" + q.keywords.length + " kulcsszó" };
    }
    if (q.t === "match") {
      var all = q.pairs.every(function (p) { return (given || {})[p[0]] === p[1]; });
      var corr = q.pairs.map(function (p) { return p[0] + " → " + p[1]; }).join("; ");
      return { ok: all, score: all ? 1 : 0, correct: corr };
    }
    return { ok: false, score: 0, correct: "" };
  }

  function typeName(t) {
    return { mc: "Feleletválasztós", tf: "Igaz–hamis", fill: "Kiegészítős", short: "Rövid válasz", match: "Párosítás" }[t] || t;
  }

  /* Aktív kvíz állapot. feedback: "each" | "end" */
  function Session(questions, opts) {
    this.qs = questions.map(prep);
    this.i = 0;
    this.given = new Array(this.qs.length);
    this.res = new Array(this.qs.length);
    this.feedback = (opts && opts.feedback) || "each";
    this.title = (opts && opts.title) || "Kvíz";
    this.mode = (opts && opts.mode) || "quiz";
    this.secIds = (opts && opts.secIds) || [];
    this.done = false;
    this.left = (opts && opts.seconds) || 0;
    this.timerId = null;
  }
  Session.prototype.answer = function (i, given) {
    this.given[i] = given;
    if (this.feedback === "each" && this.res[i] === undefined) {
      var r = grade(this.qs[i], given);
      this.res[i] = r;
      recordStat(this.qs[i], r);
      return r;
    }
    return null;
  };
  Session.prototype.finish = function () {
    var self = this;
    this.qs.forEach(function (q, i) {
      if (self.res[i] === undefined) {
        var r = grade(q, self.given[i]);
        self.res[i] = r;
        recordStat(q, r);
      }
    });
    this.done = true;
    var correct = this.res.filter(function (r) { return r.ok; }).length;
    saveHist(this, correct);
  };
  Session.prototype.score = function () {
    var c = this.res.filter(function (r) { return r && r.ok; }).length;
    return { correct: c, total: this.qs.length };
  };

  function recordStat(q, r) {
    if (!q.sec) return;
    var s = S.sec[q.sec] || (S.sec[q.sec] = { asked: 0, correct: 0 });
    s.asked++; if (r.ok) s.correct++;
    save();
  }
  function saveHist(sess, correct) {
    S.quizHist.unshift({ ts: Date.now(), mode: sess.mode, title: sess.title, total: sess.qs.length, correct: correct, secs: sess.secIds });
    if (S.quizHist.length > 80) S.quizHist.length = 80;
    act("kviz", sess.title + ": " + correct + "/" + sess.qs.length);
    save();
  }

  return { Session: Session, grade: grade, typeName: typeName };
})();
