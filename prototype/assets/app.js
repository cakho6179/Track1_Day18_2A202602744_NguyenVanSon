/* Lab 18 — Nguyễn Văn Sơn (2A202602744) — nhóm Ca Khô
   App shell: hash router, state, logger CSV, action delegation. */

(function () {

  var L = window.LAB;
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ================================================================
     STATE
     ================================================================ */
  function fresh() {
    return {
      t: 'pipeline', m: 'theory', o: 'A',
      generated: false, busy: false, saved: false,
      note: null, note0: null,
      bStep: 0, bAns: { goal: null, pri: null, assign: {} },
      cDone: false, cAck: false, cFlags: {}, cOff: false, cSeen: 2,
      escOpen: false, escTo: 'minh',
      quiz: null,
      sessStart: 0
    };
  }
  window.S = fresh();

  function md() { return L.topics[S.t].modes[S.m]; }
  function opt() { return L.options.filter(function (o) { return o.id === S.o; })[0]; }

  /* ================================================================
     LOGGER — đo thời gian thực, xuất CSV
     ================================================================ */
  var LOG = { rows: [], t0: Date.now(), sessT0: Date.now() };
  window.LOG = LOG;

  function stamp() {
    var d = new Date();
    return d.toTimeString().slice(0, 8);
  }
  LOG.event = function (ev, detail) {
    LOG.rows.push({
      time: stamp(),
      option: S.o,
      t_sec: Math.round((Date.now() - LOG.sessT0) / 1000),
      event: ev,
      detail: detail || ''
    });
    if (LOG.open) paintLog();
  };
  LOG.reset = function () {
    LOG.rows = []; LOG.t0 = Date.now(); LOG.sessT0 = Date.now();
    LOG.event('start', 'phiên mới · ' + S.t + '/' + S.m + '/' + S.o);
    if (LOG.open) paintLog();
  };
  LOG.csv = function () {
    var out = 'time,option,t_sec,event,detail\n';
    LOG.rows.forEach(function (r) {
      var d = String(r.detail).replace(/"/g, '""');
      out += r.time + ',' + r.option + ',' + r.t_sec + ',' + r.event + ',"' + d + '"\n';
    });
    return out;
  };

  function paintLog() {
    var b = $('#logbody');
    if (!b) return;
    var h = '';
    LOG.rows.forEach(function (r) {
      h += '<div class="logline"><b>' + r.time + '</b> · ' + r.t_sec + 's · <b>' + r.event + '</b> · ' + r.detail + '</div>';
    });
    b.innerHTML = h || '<div class="empty">Chưa có sự kiện nào.</div>';
    b.scrollTop = b.scrollHeight;
    $('#logcount').textContent = LOG.rows.length + ' sự kiện';
  }
  function openLog(on) {
    LOG.open = on;
    $('#logdrawer').classList.toggle('open', on);
    $('#scrim').classList.toggle('on', on);
    if (on) paintLog();
  }

  /* ================================================================
     PROTO BAR
     ================================================================ */
  function paintBar() {
    var h = '<div class="pbar-row">';
    h += '<div class="pbar-brand">LAB 18 · PROTOTYPE<small>Nguyễn Văn Sơn · 2A202602744 · nhóm Ca Khô</small></div>';
    h += '<span class="pbar-label">Chủ đề</span><span class="pbar-group">';
    L.topicOrder.forEach(function (t) {
      h += '<button class="pbtn' + (S.t === t ? ' on' : '') + '" data-go="' + t + '/' + S.m + '/' + S.o + '">' + L.topics[t].name + '</button>';
    });
    h += '</span>';
    h += '<span class="pbar-label">Chế độ</span><span class="pbar-group">';
    L.modes.forEach(function (m) {
      h += '<button class="pbtn' + (S.m === m.id ? ' on' : '') + '" data-go="' + S.t + '/' + m.id + '/' + S.o + '">' + m.label + '</button>';
    });
    h += '</span>';
    h += '<span class="pbar-spacer"></span>';
    h += '<button class="pbtn ghost" data-act="reset">Làm lại</button>';
    h += '<button class="pbtn' + (LOG.open ? ' on' : '') + '" data-act="log">Facilitator log</button>';
    h += '</div>';

    h += '<div class="pbar-row"><span class="pbar-label">Option</span><span class="pbar-group">';
    L.options.forEach(function (o) {
      h += '<button class="pbtn' + (S.o === o.id ? ' on' : '') + '" data-go="' + S.t + '/' + S.m + '/' + o.id + '"' +
        (S.o === o.id ? ' style="border-color:#60a5fa"' : '') + '>' +
        '<b>' + o.id + '</b> · ' + o.short + '</button>';
    });
    h += '</span>';
    h += '<span style="font-size:11px;color:#64748b;margin-left:6px">' + opt().agency + '</span>';
    h += '</div>';

    $('#pbar').innerHTML = h;
  }

  /* ================================================================
     CỘT TRÁI — nội dung bài học / lab + checkpoint
     ================================================================ */
  function paintLesson() {
    var d = md();
    var t = L.topics[S.t];
    var h = '<div class="panel"><div class="phead">' + (S.m === 'theory' ? 'NỘI DUNG BÀI' : 'ĐỀ LAB') +
      '<span class="tag">' + esc(t.unit) + '</span></div><div class="pbody">';

    if (S.m === 'theory') {
      h += '<div class="hint" style="margin-bottom:12px"><b>Nhiệm vụ của bạn:</b> ' + esc(d.outcome) + '</div>';
      d.slides.forEach(function (s) {
        h += '<div class="slide" id="sl-' + esc(s.n) + '"><div class="slide-h">' +
          '<span class="slide-n">Slide ' + esc(s.n) + '</span>' +
          '<span class="slide-t">' + esc(s.title) + '</span>' +
          '<span class="slide-time">' + esc(s.time) + '</span></div><div class="slide-b">';
        s.blocks.forEach(function (b) {
          h += '<div class="blk ' + b.kind + '" data-blk="' + b.id + '">' + esc(b.text) + '</div>';
        });
        h += '</div></div>';
      });
    } else {
      h += '<div class="lab-task"><b>' + esc(d.task.title) + '</b><br>' + esc(d.task.body) + '</div>';
      d.slides.forEach(function (s) {
        h += '<div class="slide" id="sl-' + esc(s.n) + '"><div class="slide-h">' +
          '<span class="slide-n">' + esc(s.n) + '</span>' +
          '<span class="slide-t">' + esc(s.title) + '</span>' +
          '<span class="slide-time">' + esc(s.time) + '</span></div><div class="slide-b">';
        s.blocks.forEach(function (b) {
          h += '<div class="blk ' + b.kind + '" data-blk="' + b.id + '">' + esc(b.text) + '</div>';
        });
        h += '<div class="lab-out" style="margin-top:10px">$ python lab\n' + esc(d.out) + '\n\n' + esc(d.errorNote) + '</div>';
        h += '</div></div>';
      });
    }

    h += '<div class="cp"><div class="cp-q">Câu hỏi kiểm tra: ' + esc(d.quiz.q) + '</div><div class="cp-opts">';
    d.quiz.options.forEach(function (o) {
      var cls = '';
      if (S.quiz) {
        if (o.id === d.quiz.answer) cls = ' ok';
        else if (o.id === S.quiz.pick) cls = ' no';
      }
      h += '<button class="cp-opt' + cls + '" data-act="quiz" data-p="' + o.id + '"' + (S.quiz ? ' disabled' : '') + '>' +
        '<span class="k">' + o.id.toUpperCase() + '</span><span>' + esc(o.text) + '</span></button>';
    });
    h += '</div>';
    if (S.quiz) h += '<div class="cp-exp"><b>' + (S.quiz.ok ? 'Đúng.' : 'Sai.') + '</b> ' + esc(d.quiz.explain) + '</div>';
    h += '</div></div></div>';

    $('#lesson').innerHTML = h;
  }

  /* ================================================================
     CỘT PHẢI — panel của option
     ================================================================ */
  function paintSide() {
    var h = '<div class="side"><div class="side-b">';
    h += window.OptionPanel[S.o]();
    h += '</div></div>';
    $('#side').innerHTML = h;
  }

  function render() { paintBar(); paintLesson(); paintSide(); }

  /* ================================================================
     TIMER CHO OPTION C
     ================================================================ */
  var cTimer = null;
  function armC() {
    clearInterval(cTimer); clearTimeout(cTimer);
    if (S.o !== 'C' || S.cDone || S.cOff) return;
    var seen = 2;
    cTimer = setInterval(function () {
      if (S.o !== 'C' || S.cDone) return;
      seen++; S.cSeen = Math.min(seen, md().cSignals.length);
      if (seen >= md().cSignals.length) { clearInterval(cTimer); return; }
      paintSide();
    }, 4000);
    setTimeout(function () {
      if (S.o !== 'C' || S.cDone || S.cOff) return;
      S.cDone = true;
      LOG.event('c-nudge', 'tự nhắc sau 12s không thao tác');
      paintSide();
    }, 12000);
  }

  /* ================================================================
     HÀNH ĐỘNG
     ================================================================ */
  function busyFor(ms, then, ev, det) {
    S.busy = true; paintSide();
    setTimeout(function () {
      S.busy = false; then();
      if (ev) LOG.event(ev, det);
      render();
    }, ms);
  }

  function genNote(optId) {
    var ctx = optId === 'B' ? { bAns: S.bAns } : (optId === 'C' ? { cFlags: S.cFlags } : null);
    S.note = window.NoteModel.build(optId, ctx);
    S.note0 = JSON.parse(JSON.stringify(S.note));
    S.generated = true;
  }

  var ACT = {

    /* --- A --- */
    'a.start': function () {
      LOG.event('a-start', 'AI đọc ' + md().traces.length + ' dấu vết');
      busyFor(1100, function () { genNote('A'); }, 'a-built', 'AI tự chọn lọc và nhóm: 4 mục');
    },

    /* --- B --- */
    'b.q': function (el) {
      var v = el.dataset.v;
      if (S.bStep === 0) S.bAns.goal = v;
      else S.bAns.pri = v;
      LOG.event('b-q' + (S.bStep + 1), v);
      paintSide();
    },
    'b.assign': function (el) {
      var t = el.dataset.t, v = el.dataset.v;
      S.bAns.assign[t] = v;
      LOG.event('b-assign', 'ảnh ' + t + ' → slide ' + v);
      paintSide();
    },
    'b.next': function () {
      if (S.bStep === 2) {
        LOG.event('b-built', 'soạn sau 3 câu · goal=' + S.bAns.goal + ' pri=' + S.bAns.pri +
          ' ảnh xác nhận=' + Object.keys(S.bAns.assign).length);
        busyFor(900, function () { genNote('B'); });
        return;
      }
      S.bStep = Math.min(2, S.bStep + 1);
      LOG.event('b-next', 'sang câu ' + (S.bStep + 1));
      paintSide();
    },
    'b.back': function () {
      S.bStep = Math.max(0, S.bStep - 1);
      paintSide();
    },
    'b.skip': function () {
      LOG.event('b-skip', 'bỏ qua phần hỏi');
      busyFor(900, function () {
        S.bAns = { goal: 'hieu', pri: 'x', assign: {} };
        genNote('B');
      }, 'b-built', 'soạn không hỏi');
    },
    'b.redo': function () {
      LOG.event('b-redo', 'làm lại 3 câu');
      S.bStep = 0; S.bAns = { goal: null, pri: null, assign: {} }; S.generated = false; S.saved = false;
      paintSide();
    },

    /* --- C --- */
    'c.nudge': function () {
      S.cDone = true; clearInterval(cTimer); clearTimeout(cTimer);
      LOG.event('c-nudge', 'người dùng bấm cho nhắc ngay');
      paintSide();
    },
    'c.off': function () {
      S.cOff = true; clearInterval(cTimer); clearTimeout(cTimer);
      LOG.event('c-off', 'tắt tự nhắc trong buổi này');
      paintSide();
    },
    'c.on': function () {
      S.cOff = false;
      LOG.event('c-on', 'bật lại tự nhắc');
      render(); armC();
    },
    'c.ack': function () {
      S.cAck = true;
      md().cGaps.forEach(function (g) { S.cFlags[g.item] = 'accept'; });
      LOG.event('c-ack', 'chấp nhận ' + md().cGaps.length + ' cờ AI gắn');
      busyFor(900, function () { genNote('C'); }, 'c-built', 'AI soạn với ' + md().cGaps.length + ' cờ tự động');
    },
    'c.fix': function () {
      S.cAck = true;
      md().cGaps.forEach(function (g) { S.cFlags[g.item] = 'reject'; });
      LOG.event('c-fix', 'bác toàn bộ cờ AI → ghi chú mất phần "Chỗ chưa hiểu"');
      busyFor(900, function () { genNote('C'); }, 'c-built', 'AI soạn không có cờ');
    },
    'c.esc.open': function () { S.escOpen = true; LOG.event('c-escalate-open', ''); paintSide(); },
    'c.esc.to': function (el) { S.escTo = el.dataset.v; LOG.event('c-escalate-to', el.dataset.v); paintSide(); },
    'c.esc.send': function () {
      LOG.event('c-escalate-send', 'gửi cho ' + S.escTo + ' · kèm 4 mục đã lưu');
      S.escOpen = false;
      toast('Đã gửi câu hỏi kèm ghi chú của bạn.');
      render();
    },
    'c.esc.cancel': function () { S.escOpen = false; LOG.event('c-escalate-cancel', ''); paintSide(); },

    /* --- Ghi chú dùng chung --- */
    'note.add': function (el) {
      var k = el.dataset.key;
      for (var i = 0; i < S.note.secs.length; i++) {
        if (S.note.secs[i].key === k) {
          S.note.secs[i].items.push({
            id: k + ':' + Date.now(), text: '', src: '', slide: md().slides[0].n,
            time: null, isGap: k === 'gap', isShot: false, pri: false, ai: false,
            conf: null, why: null, confirmed: false, derived: true
          });
        }
      }
      LOG.event('note-add', 'tự thêm mục vào ' + k);
      render();
    },
    'note.del': function (el) {
      var id = el.dataset.id;
      S.note.secs.forEach(function (s) {
        s.items = s.items.filter(function (i) { return i.id !== id; });
      });
      LOG.event('note-del', id);
      render();
    },
    'note.up': function (el) { move(el.dataset.id, -1); },
    'note.down': function (el) { move(el.dataset.id, 1); },
    'note.save': function () {
      var n = 0, noAnc = 0;
      S.note.secs.forEach(function (s) {
        s.items.forEach(function (i) { n++; if (!i.time && i.src) noAnc++; });
      });
      S.saved = true;
      LOG.event('note-save', n + ' mục · ' + noAnc + ' mục neo vị trí phỏng đoán');
      toast('Đã lưu ghi chú.');
      render();
    },
    'note.undo': function () {
      S.note = JSON.parse(JSON.stringify(S.note0));
      S.saved = false;
      LOG.event('note-undo', 'trả về bản AI vừa soạn');
      render();
    },
    'anchor': function (el) {
      var it = window.NoteModel.find(S.note.secs, el.dataset.id);
      if (!it) return;
      LOG.event('anchor-check', 'mục ' + it.id + ' → Slide ' + it.slide + (it.time ? ' · ' + it.time : ' · không rõ phút'));
      jump(it.slide);
      if (!it.time) toast('Đã nhảy tới Slide ' + it.slide + '. Nhưng bạn vẫn chưa biết phút nào — đây là điểm yếu còn lại.');
    },

    /* --- Checkpoint --- */
    'quiz': function (el) {
      var p = el.dataset.p;
      var ok = (p === md().quiz.answer);
      S.quiz = { pick: p, ok: ok };
      LOG.event('quiz', 'chọn ' + p + (ok ? ' — đúng' : ' — sai'));
      if (!ok && S.o === 'C' && !S.cDone && !S.cOff) {
        S.cDone = true; clearInterval(cTimer); clearTimeout(cTimer);
        LOG.event('c-nudge', 'kích hoạt do trả lời sai checkpoint');
      }
      render();
    },

    /* --- Khác --- */
    'reset': function () { doReset(); },
    'log': function () { openLog(!LOG.open); }
  };

  function move(id, dir) {
    S.note.secs.forEach(function (s) {
      var i = s.items.findIndex(function (x) { return x.id === id; });
      if (i < 0) return;
      var j = i + dir;
      if (j < 0 || j >= s.items.length) return;
      var tmp = s.items[i]; s.items[i] = s.items[j]; s.items[j] = tmp;
      LOG.event('note-move', id + (dir < 0 ? ' lên' : ' xuống'));
    });
    render();
  }

  function jump(slide) {
    var el = document.getElementById('sl-' + slide);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.transition = 'box-shadow .2s';
    el.style.boxShadow = '0 0 0 4px #93c5fd';
    setTimeout(function () { el.style.boxShadow = ''; }, 1400);
  }

  function doReset() {
    LOG.event('reset', 'làm lại phiên ' + S.t + '/' + S.m + '/' + S.o);
    var keep = { t: S.t, m: S.m, o: S.o };
    window.S = fresh();
    Object.assign(window.S, keep);
    LOG.sessT0 = Date.now();
    S.generated = false;
    render(); armC();
    toast('Đã làm lại phiên này.');
  }

  var toastT = null;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg; el.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove('on'); }, 3400);
  }
  window.__toast = toast;

  /* ================================================================
     ROUTER
     ================================================================ */
  function parse() {
    var h = (location.hash || '').replace(/^#/, '');
    if (h === 'log') return { log: true };
    var p = h.split('/');
    return {
      t: L.topics[p[0]] ? p[0] : 'pipeline',
      m: (p[1] === 'lab' ? 'lab' : 'theory'),
      o: (['A', 'B', 'C'].indexOf((p[2] || '').toUpperCase()) >= 0 ? p[2].toUpperCase() : 'A')
    };
  }

  function apply() {
    var r = parse();
    if (r.log) { openLog(true); return; }
    var same = (r.t === S.t && r.m === S.m && r.o === S.o);
    S.t = r.t; S.m = r.m; S.o = r.o;
    if (!same) {
      var f = fresh();
      Object.assign(window.S, f, { t: r.t, m: r.m, o: r.o });
      S = window.S;
      LOG.sessT0 = Date.now();
      LOG.event('start', 'bắt đầu ' + r.t + '/' + r.m + '/' + r.o);
    }
    openLog(false);
    render();
    armC();
  }

  /* ================================================================
     EVENT DELEGATION
     ================================================================ */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'scrim') { openLog(false); return; }
    if (!e.target || !e.target.closest) return;
    var go = e.target.closest('[data-go]');
    if (go) { location.hash = '#' + go.dataset.go; return; }

    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;

    if (act === 'note.up' || act === 'note.down') e.preventDefault();

    /* lưu nội dung sửa tay trước khi re-render */
    if (act.indexOf('note.') === 0 || act === 'anchor') flushEdits();

    var fn = ACT[act];
    if (fn) { fn(el); return; }

    if (act === 'logclose') openLog(false);
  });

  document.addEventListener('blur', function (e) {
    var t = e.target;
    if (t && t.dataset && t.dataset.edit) flushOne(t.dataset.edit, t.textContent);
  }, true);

  function flushOne(id, val) {
    if (!S.note) return;
    var it = window.NoteModel.find(S.note.secs, id);
    if (!it) return;
    if (it.text === val) return;
    it.text = val;
    LOG.event('note-edit', id);
  }
  function flushEdits() {
    document.querySelectorAll('[data-edit]').forEach(function (t) {
      flushOne(t.dataset.edit, t.textContent);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (LOG.open) { openLog(false); return; }
      if (window.getSelection && String(window.getSelection()).length > 20) { document.activeElement.blur(); }
    }
  });

  /* ================================================================
     BOOT
     ================================================================ */
  window.addEventListener('hashchange', apply);
  document.addEventListener('DOMContentLoaded', function () {
    if (!location.hash) location.hash = '#pipeline/theory/A';
    apply();
  });

  /* nếu script chạy sau DOMContentLoaded */
  if (document.readyState !== 'loading') {
    if (!location.hash) location.hash = '#pipeline/theory/A';
    apply();
  }

})();