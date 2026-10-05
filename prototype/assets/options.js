/* Lab 18 — Nguyễn Văn Sơn (2A202602744) — nhóm Ca Khô
   Ba Solution Options (A/B/C) + Note Editor dùng chung.
   Khác biệt nằm ở CƠ CHẾ chia công việc user–AI, không nằm ở màu/layout.
   Mọi tương tác gắn data-act để app.js xử lý bằng event delegation. */

(function () {

  var L = window.LAB;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function get() { return L.topics[window.S.t].modes[window.S.m]; }

  /* ================================================================
     1. MÔ HÌNH GHI CHÚ — dùng chung cho cả 3 options
     ================================================================ */

  var SEC_ORDER = {
    A: ['main', 'gap', 'q', 'shot'],
    B_default: ['main', 'gap', 'q', 'shot'],
    B_thi: ['main', 'gap', 'shot', 'q'],
    B_baitap: ['main', 'shot', 'gap', 'q'],
    B_hieu: ['gap', 'main', 'q', 'shot'],
    C: ['gap', 'main', 'q', 'shot']
  };

  var GOAL_HEAD = {
    thi: 'Xếp cho kỳ thi: định nghĩa và công thức lên trước, ví dụ và ảnh xuống sau.',
    baitap: 'Xếp để làm bài: quy trình và lỗi thường gặp lên trước.',
    hieu: 'Xếp để hiểu lại: phần còn chưa hiểu được đưa lên đầu.'
  };

  /* Dựng ghi chú từ dữ liệu chủ đề, rồi áp đè hành vi riêng của từng option. */
  function build(optId, ctx) {
    var md = get();
    var secs = L.sections.map(function (s) { return { key: s.key, title: s.title, items: [] }; });

    md.note.main.forEach(function (it, i) { pushItem(secs, 'main', 'main:' + i, it); });
    md.note.gap.forEach(function (it, i) { pushItem(secs, 'gap', 'gap:' + i, it); });
    md.note.q.forEach(function (it, i) { pushItem(secs, 'q', 'q:' + i, it); });
    md.note.shot.forEach(function (it, i) { pushItem(secs, 'shot', 'shot:' + i, it); });

    var order = ['main', 'gap', 'q', 'shot'];
    var head = null;

    if (optId === 'B') {
      var g = (ctx && ctx.bAns && ctx.bAns.goal) || 'hieu';
      order = SEC_ORDER['B_' + g] || SEC_ORDER.B_default;
      head = GOAL_HEAD[g] || null;
    } else if (optId === 'C') {
      order = SEC_ORDER.C;
    }

    secs.sort(function (a, b) { return order.indexOf(a.key) - order.indexOf(b.key); });

    /* -- Option B: đánh dấu mục người học chọn là quan trọng nhất -- */
    if (optId === 'B' && ctx && ctx.bAns && ctx.bAns.pri) {
      each(secs, function (it) {
        if (it.src === ctx.bAns.pri) it.pri = true;
      });
      secs.forEach(function (s) {
        s.items.sort(function (a, b) { return (b.pri ? 1 : 0) - (a.pri ? 1 : 0); });
      });
    }

    /* -- Option C: bỏ các mục người học bác bỏ cờ của AI -- */
    if (optId === 'C' && ctx && ctx.cFlags) {
      secs.forEach(function (s) {
        s.items = s.items.filter(function (it) {
          var f = ctx.cFlags[it.id];
          if (f === 'reject') return false;
          if (f === 'accept') { it.ai = true; it.conf = aiConf(md, it.id); it.why = aiWhy(md, it.id); }
          return true;
        });
      });
    }

    return { secs: secs, head: head };
  }

  function pushItem(secs, key, id, it) {
    var s = null;
    for (var i = 0; i < secs.length; i++) if (secs[i].key === key) { s = secs[i]; break; }
    if (!s) return;
    s.items.push({
      id: id,
      text: it.text,
      src: it.src || '',
      slide: it.slide,
      time: (it.time === null || it.time === undefined) ? null : it.time,
      isGap: key === 'gap',
      isShot: key === 'shot',
      pri: false, ai: false, conf: null, why: null,
      confirmed: false,
      derived: false
    });
  }

  function each(secs, fn) { secs.forEach(function (s) { s.items.forEach(fn); }); }
  function find(secs, id) {
    var hit = null;
    each(secs, function (it) { if (it.id === id) hit = it; });
    return hit;
  }
  function aiCfg(md, id) {
    for (var i = 0; i < md.cGaps.length; i++) if (md.cGaps[i].item === id) return md.cGaps[i];
    return { conf: 0.4, confLabel: 'Thấp', why: ['Chưa đủ tín hiệu hành vi để chắc chắn'] };
  }
  function aiConf(md, id) { return aiCfg(md, id).conf; }
  function aiWhy(md, id) { return aiCfg(md, id).why; }

  /* Suy ra neo vị trí cho ảnh chụp (ảnh không có số slide/phút). */
  function shotsWithoutAnchor() {
    var md = get();
    return md.traces.filter(function (t) { return t.type === 'shot'; });
  }

  function anchorText(it, optId, confirmed) {
    var slide = it.slide;
    if (it.time) return 'Slide ' + slide + ' · ' + it.time;
    if (optId === 'B' && confirmed) return 'Slide ' + slide + ' · bạn đã xác nhận';
    return 'Slide ' + slide + ' · không rõ phút';
  }
  function anchorBadge(it, optId, confirmed) {
    if (it.time) return '<span class="badge ghost">có số phút</span>';
    if (optId === 'B' && confirmed) return '<span class="badge pri">bạn xác nhận</span>';
    if (optId === 'C') return '<span class="badge ai">AI gắn · ' + Math.round((it.conf || 0.6) * 100) + '%</span>';
    return '<span class="badge noanchor">AI gắn tạm</span>';
  }

  /* ================================================================
     2. RENDER GHI CHÚ (dùng chung — khác nhau ở dữ liệu, không ở layout)
     ================================================================ */

  function renderNote(note, optId, ctx, saved) {
    var md = get();
    var h = '';

    h += '<div class="note"><div class="note-top">';
    h += '<span class="nm">Ghi chú · ' + esc(md.label) + '</span>';
    h += '<span class="aim">' + esc(L.topics[window.S.t].name) + '</span>';
    if (note.head) h += '<span class="aim" style="width:100%">' + esc(note.head) + '</span>';
    h += '</div>';

    var noShot = note.secs.some(function (s) { return s.key === 'shot' && s.items.length; });
    if (noShot) {
      h += '<div style="padding:8px 12px;background:#fff7ed;border-bottom:1px solid #fed7aa;font-size:12px;color:#c2410c">';
      if (optId === 'B') {
        h += '<b>2 ảnh chụp màn hình trong bài này không có số slide/phút.</b> Ở bước 3 bạn đã tự gán; vị trí ghi ở đây là do bạn xác nhận, không phải AI đoán.';
      } else if (optId === 'A') {
        h += '<b>2 ảnh chụp màn hình trong bài này không có số slide/phút.</b> AI đã tự gán vị trí để bạn khỏi tìm — nhưng đây là <b>phỏng đoán của AI</b>, bấm vào neo vị trí để kiểm tra lại.';
      } else {
        h += '<b>2 ảnh chụp màn hình trong bài này không có số slide/phút.</b> AI tự gán vị trí kèm mức độ chắc chắn ở từng mục; bạn có thể bỏ qua nếu thấy sai.';
      }
      h += '</div>';
    }

    note.secs.forEach(function (s) {
      h += '<div class="sec"><div class="sec-h">' + esc(s.title) +
        '<span class="cnt">(' + s.items.length + ')</span>' +
        '<button class="add" data-act="note.add" data-key="' + s.key + '">+ thêm mục</button></div>';
      if (!s.items.length) {
        h += '<div class="noitem">Chưa có mục nào — bấm "+ thêm mục" để tự viết.</div>';
      }
      s.items.forEach(function (it) { h += renderItem(it, optId, ctx, md); });
      h += '</div>';
    });

    h += '</div>';

    h += '<div class="row" style="margin-top:12px">';
    if (!saved) {
      h += '<button class="btn okc" data-act="note.save">Sửa xong · lưu ghi chú</button>';
      h += '<button class="btn sec" data-act="note.undo">Bỏ hết chỉnh sửa của tôi</button>';
    } else {
      h += '<div class="saved" style="flex:1"><b>Đã lưu.</b> Ghi chú có 4 mục, mọi mục đều có neo vị trí trong bài. Sáng mai mở lại được mà không cần xem video.</div>';
    }
    h += '</div>';
    return h;
  }

  function renderItem(it, optId, ctx, md) {
    var confirmed = !!(ctx && ctx.bAns && ctx.bAns.assign && ctx.bAns.assign[it.src]);
    var cls = 'item';
    if (it.pri) cls += ' pri';
    if (it.ai) cls += ' aflag';
    if (it.isGap) cls += ' gap';

    var h = '<div class="' + cls + '" data-item="' + it.id + '">';
    h += '<div class="it-text" contenteditable="true" data-edit="' + it.id + '">' + esc(it.text) + '</div>';

    h += '<div class="it-meta">';
    h += '<a class="anchor' + (it.time ? '' : ' locked') + '" data-act="anchor" data-id="' + it.id + '">' +
      esc(anchorText(it, optId, confirmed)) + '</a>';
    h += anchorBadge(it, optId, confirmed);
    if (it.src) h += '<span class="badge src">từ ' + esc(it.src) + '</span>';
    if (it.pri) h += '<span class="badge pri">quan trọng nhất</span>';
    if (it.ai) {
      h += '<span class="badge ai">AI tự gắn cờ</span>';
      h += '<details class="why" style="width:100%;margin:4px 0 0"><summary>Vì sao AI nghĩ vậy?</summary><ul>' +
        (it.why || []).map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul></details>';
    }
    h += '<span class="it-acts">' +
      '<button class="mini" data-act="note.up" data-id="' + it.id + '" title="Lên">↑</button>' +
      '<button class="mini" data-act="note.down" data-id="' + it.id + '" title="Xuống">↓</button>' +
      '<button class="mini d" data-act="note.del" data-id="' + it.id + '" title="Xoá">×</button>' +
      '</span>';
    h += '</div></div>';
    return h;
  }

  /* ================================================================
     3. OPTION A — AI tự chọn lọc dấu vết
     ================================================================ */

  function panelA() {
    var md = get();
    var S = window.S;
    var opt = L.options[0];
    var h = sideHead(opt);

    if (S.busy) { h += '<div class="empty"><span class="spin"></span> &nbsp;AI đang đọc ' + md.traces.length + ' dấu vết…</div>'; return h; }

    h += '<div class="hint">Bấm nút bên dưới. AI đọc toàn bộ <b>' + md.traces.length +
      ' dấu vết</b> bạn để lại trong bài này (highlight, "Chưa hiểu", câu hỏi, ghi chú, ảnh chụp) và tự nhóm thành ghi chú. ' +
      'Bạn không cần chọn gì cả. <b>Sau đó</b> bạn sửa và xác nhận như muốn.</div>';

    if (!S.generated) {
      h += tracesBox(md);
      h += '<button class="btn wide" data-act="a.start">Soạn ghi chú từ ' + md.traces.length + ' dấu vết này</button>';
      h += '<div class="hint" style="margin-top:12px;font-style:italic;color:#94a3b8;border-left-color:#cbd5e1">AI tự quyết định cách nhóm và thứ tự. Bạn không được hỏi ý kiến AI trước khi nó soạn.</div>';
      return h;
    }

    h += tracesBox(md, 'AI đã dùng các dấu vết sau:');
    h += renderNote(S.note, 'A', null, S.saved);
    return h;
  }

  /* ================================================================
     4. OPTION B — AI hỏi trước khi soạn
     ================================================================ */

  function panelB() {
    var md = get();
    var S = window.S;
    var opt = L.options[1];
    var h = sideHead(opt);
    var a = S.bAns;

    if (S.busy) { h += '<div class="empty"><span class="spin"></span> &nbsp;AI đang soạn theo câu trả lời của bạn…</div>'; return h; }

    if (!S.generated) {
      h += '<div class="hint">Trước khi soạn, AI hỏi bạn <b>3 câu</b> để biết bản ghi chú này dùng để làm gì. ' +
        'Không chấm điểm, không lưu vào hồ sơ học tập. Khoảng 40–60 giây.</div>';

      if (S.bStep === 0) {
        h += dots(1);
        h += '<div class="bq"><div class="bq-h"><span class="bq-n">Câu 1 / 3</span><span>Mai bạn dùng bản ghi chú này để làm gì?</span></div>';
        h += '<div class="chips">' + L.goals.map(function (g) {
          return '<button class="chip' + (a.goal === g.id ? ' on' : '') + '" data-act="b.q" data-v="' + g.id + '">' + esc(g.label) + '</button>';
        }).join('') + '</div><div class="bq-exp">AI sẽ xếp lại thứ tự các mục theo câu trả lời này.</div></div>';
        h += '<div class="row"><button class="btn sec" data-act="b.next" ' + (a.goal ? '' : 'disabled') + '>Tiếp</button>' +
          '<button class="btn ghost" data-act="b.skip">Bỏ qua, soạn luôn</button></div>';
      }

      if (S.bStep === 1) {
        var cands = md.traces.filter(function (t) { return t.type === 'hl' || t.type === 'note'; }).slice(0, 4);
        h += dots(2);
        h += '<div class="bq"><div class="bq-h"><span class="bq-n">Câu 2 / 3</span><span>Trong số thứ bạn đã đánh dấu, cái nào bạn cần nhất?</span></div>';
        h += '<div class="chips">' + cands.map(function (t) {
          var lb = t.text.length > 54 ? t.text.slice(0, 54) + '…' : t.text;
          return '<button class="chip' + (a.pri === t.id ? ' on' : '') + '" data-act="b.q" data-v="' + t.id + '">' + esc(lb) + '</button>';
        }).join('') + '<button class="chip' + (a.pri === 'x' ? ' on' : '') + '" data-act="b.q" data-v="x">Không rõ, tự quyết</button></div>' +
          '<div class="bq-exp">Mục bạn chọn sẽ được đánh dấu "quan trọng nhất" và đẩy lên đầu mục của nó.</div></div>';
        h += '<div class="row"><button class="btn sec" data-act="b.back">Quay lại</button>' +
          '<button class="btn" data-act="b.next" ' + (a.pri ? '' : 'disabled') + '>Tiếp</button></div>';
      }

      if (S.bStep === 2) {
        var shots = shotsWithoutAnchor();
        h += dots(3);
        h += '<div class="bq"><div class="bq-h"><span class="bq-n">Câu 3 / 3</span><span>' +
          shots.length + ' ảnh bạn chụp không có số slide. ' + shots.length + ' ảnh này thuộc slide nào?</span></div>';
        var slideNos = md.slides.map(function (s) { return String(s.n); });
        shots.forEach(function (t) {
          h += '<div style="margin-bottom:8px"><div style="font-size:12.5px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px;margin-bottom:5px">' +
            '<b>⊞</b> ' + esc(t.text) + '</div><div class="chips">';
          slideNos.forEach(function (sn) {
            h += '<button class="chip mono' + ((a.assign || {})[t.id] === sn ? ' on' : '') +
              '" data-act="b.assign" data-t="' + t.id + '" data-v="' + esc(sn) + '">Slide ' + esc(sn) + '</button>';
          });
          h += '<button class="chip mono' + ((a.assign || {})[t.id] === '?' ? ' on' : '') +
            '" data-act="b.assign" data-t="' + t.id + '" data-v="?">Không nhớ</button>';
          h += '</div></div>';
        });
        h += '<div class="bq-exp">AI không đoán hộ bạn ở bước này vì đoán sai slide thì cả ảnh và cả ghi chú đều vô nghĩa.</div></div>';
        var all = shots.every(function (t) { return (a.assign || {})[t.id]; });
        h += '<div class="row"><button class="btn sec" data-act="b.back">Quay lại</button>' +
          '<button class="btn" data-act="b.next" ' + (all ? '' : 'disabled') + '>Soạn ghi chú</button></div>';
      }
      return h;
    }

    if (S.busy) { h += '<div class="empty"><span class="spin"></span> &nbsp;AI đang soạn theo câu trả lời của bạn…</div>'; return h; }

    h += '<div class="saved" style="margin-bottom:12px"><b>Bạn đã trả lời:</b> ' +
      esc(goalLabel(a.goal)) + ' · ưu tiên ' + esc(a.pri === 'x' ? 'không rõ' : 'mục đã chọn') +
      ' · xác nhận ' + shotsWithoutAnchor().length + ' ảnh.</div>';
    h += '<div class="row" style="margin-bottom:10px"><button class="btn sm sec" data-act="b.redo">Làm lại 3 câu</button>' +
      '<button class="btn sm ghost" data-act="b.skip">Bỏ phần hỏi, soạn lại không cần ý kiến tôi</button></div>';
    h += renderNote(S.note, 'B', { bAns: a }, S.saved);
    return h;
  }

  function goalLabel(id) {
    for (var i = 0; i < L.goals.length; i++) if (L.goals[i].id === id) return L.goals[i].label;
    return 'không rõ';
  }
  function dots(n) {
    var h = '<div class="step-dots">';
    for (var i = 1; i <= 3; i++) h += '<div class="dot' + (i < n ? ' done' : (i === n ? ' on' : '')) + '"></div>';
    return h + '<span style="font-size:11px;color:#94a3b8;margin-left:4px">câu ' + n + '/3</span></div>';
  }

  /* ================================================================
     5. OPTION C — AI tự can thiệp khi nghi bạn kẹt
     ================================================================ */

  function panelC() {
    var md = get();
    var S = window.S;
    var opt = L.options[2];
    var h = sideHead(opt);

    /* -- vòng 1: AI đang theo dõi, chưa nhắc -- */
    if (!S.cDone) {
      h += '<div class="hint">Bạn không cần bấm gì. AI đang theo dõi bạn đọc phần này. ' +
        'Nếu AI thấy bạn bị kẹt, nó sẽ tự nhắc trước.</div>';
      h += '<div class="watch">';
      h += '<div class="lb">Tín hiệu hệ thống đang thấy</div>';
      md.cSignals.slice(0, S.cSeen || 2).forEach(function (s, i) {
        h += '<div class="ln"><span class="n">·</span><span>' + esc(s) + '</span></div>';
      });
      h += '</div>';

      if (S.cOff) {
        h += '<div class="hint" style="margin-top:12px;border-left-color:#94a3b8">Bạn đã tắt tự nhắc cho buổi này. ' +
          '<button class="btn sm sec" data-act="c.on" style="margin-left:4px">Bật lại tự nhắc</button></div>';
      } else {
        h += '<div class="row" style="margin-top:12px">' +
          '<button class="btn sm sec" data-act="c.nudge">Cho AI nhắc ngay bây giờ</button>' +
          '<button class="btn sm ghost" data-act="c.off">Tắt tự nhắc trong buổi này</button></div>';
        h += '<div style="margin-top:10px;font-size:11.5px;color:#94a3b8">AI sẽ tự nhắc sau 12 giây nếu bạn không làm gì.</div>';
      }
      return h;
    }

    /* -- vòng 2: thẻ nhắc chủ động -- */
    if (!S.cAck) {
      var g = md.cGaps[1] || md.cGaps[0];
      var pct = Math.round(g.conf * 100);
      h += '<div class="nudge"><span class="pin">AI NGHĨ BẠN KẸT Ở ĐÂY</span>';
      h += '<h4>2 chỗ trong bài này có vẻ chưa chắc chắn</h4>';
      h += '<div class="sig">' + md.cSignals.map(function (s) {
        return '<div class="sigrow"><span class="ic">▸</span><span>' + esc(s) + '</span></div>';
      }).join('') + '</div>';
      h += '<div class="conf"><div class="conf-l"><span>AI chắc chắn</span><span>' + esc(g.confLabel) + ' · ' + pct + '%</span></div>' +
        '<div class="conf-bar"><div class="conf-fill ' + (pct > 70 ? 'hi' : (pct > 45 ? 'md' : 'lo')) + '" style="width:' + pct + '%"></div></div></div>';
      h += '<details class="why"><summary>Vì sao AI nghĩ vậy?</summary><ul>' +
        g.why.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') +
        '<li>AI không hỏi bạn câu nào — nó suy ra hoàn toàn từ hành vi của bạn.</li></ul></details>';
      h += '<div class="row" style="margin-top:10px">' +
        '<button class="btn sec" data-act="c.ack">Đúng chỗ, để AI soạn đi</button>' +
        '<button class="btn dgr" data-act="c.fix">Không phải chỗ này, tôi tự chọn</button>' +
        '<button class="btn ghost" data-act="c.off">Tắt tự nhắc</button></div>';
      h += '<div style="font-size:11.5px;color:#94a3b8;margin-top:8px">Bấm "Không phải chỗ này" thì AI sẽ không gắn cờ nào cả và ghi chú sẽ không có phần "Chỗ chưa hiểu" do AI suy đoán.</div>';
      h += '</div>';
      return h;
    }

    /* -- vòng 3: ghi chú đã soạn + leo thang -- */
    if (S.busy) { h += '<div class="empty"><span class="spin"></span> &nbsp;AI đang soạn ghi chú…</div>'; return h; }

    var nRej = Object.keys(S.cFlags || {}).filter(function (k) { return S.cFlags[k] === 'reject'; }).length;
    h += '<div class="hint">AI đã soạn xong. ' + md.cGaps.length + ' chỗ bị gắn cờ tự động' +
      (nRej ? ', bạn đã bác <b>' + nRej + '</b>' : '') + '. Bạn vẫn sửa bình thường.</div>';
    h += renderNote(S.note, 'C', { cFlags: S.cFlags }, S.saved);

    if (S.escOpen) {
      var who = L.escalateTo.filter(function (x) { return x.id === S.escTo; })[0] || L.escalateTo[0];
      h += '<div class="esc"><h4>Leo thang: nhờ người thật</h4>' +
        '<div class="who"><span class="nm">' + esc(who.name) + '</span><span style="color:#7c3aed">(' + esc(who.rel) + (who.code ? ', ' + esc(who.code) : '') + ')</span></div>' +
        '<div class="draft">' + esc(md.cEscalate) + '</div>' +
        '<div class="chips" style="margin-top:8px">' + L.escalateTo.map(function (x) {
          return '<button class="chip' + (x.id === S.escTo ? ' on' : '') + '" data-act="c.esc.to" data-v="' + x.id + '">' + esc(x.name) + '</button>';
        }).join('') + '</div>' +
        '<div class="row" style="margin-top:10px">' +
        '<button class="btn" data-act="c.esc.send">Gửi câu hỏi này</button>' +
        '<button class="btn ghost" data-act="c.esc.cancel">Tự giải quyết, không hỏi</button></div></div>';
    } else {
      h += '<div class="row" style="margin-top:12px">' +
        '<button class="btn sec" data-act="c.esc.open">Vẫn chưa hiểu · hỏi người thật</button></div>';
    }
    return h;
  }

  /* ================================================================
     6. KHUNG CHUNG
     ================================================================ */

  function sideHead(opt) {
    return '<div class="side-h" style="margin:-14px -14px 14px">' +
      '<div class="oname">Option ' + opt.id + ' — ' + esc(opt.name) + '</div>' +
      '<div class="oagency">' + esc(opt.agency) + '</div></div>';
  }

  function tracesBox(md, title) {
    var h = '<div style="margin-bottom:12px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#64748b;margin-bottom:6px">' +
      (title || 'Dấu vết học tập bạn đã để lại trong bài này') + '</div><div class="traces">';
    md.traces.forEach(function (t) {
      var meta = L.trace[t.type];
      h += '<div class="tr ' + t.type + '"><span class="ic">' + meta.icon + '</span><span class="tx">' +
        esc(t.text) + (t.text2 ? ' — ' + esc(t.text2) : '') +
        '<span class="an">' + esc(meta.label) + ' · Slide ' + esc(t.slide) + (t.time ? ' · ' + esc(t.time) : ' · không rõ phút') + '</span>' +
        '</span></div>';
    });
    return h + '</div></div>';
  }

  window.NoteModel = {
    build: build, find: find, render: renderNote, shotsWithoutAnchor: shotsWithoutAnchor, esc: esc
  };
  window.OptionPanel = { A: panelA, B: panelB, C: panelC, sideHead: sideHead, tracesBox: tracesBox, goalLabel: goalLabel };

})();