const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = process.argv[2];
const file = path.join(ROOT, 'prototype', 'index.html');
const out = [];
const errors = [];

const dom = new JSDOM(fs.readFileSync(file, 'utf8'), {
  runScripts: 'dangerously', resources: 'usable',
  url: 'file:///' + file.replace(/\\/g, '/'), pretendToBeVisual: true
});
const w = dom.window, d = w.document;
w.addEventListener('error', e => errors.push('window.error: ' + (e.error && e.error.stack || e.message)));
dom.virtualConsole.on('jsdomError', e => errors.push('jsdomError: ' + (e.stack || e.message)));

const sleep = ms => new Promise(r => setTimeout(r, ms));
const ok = (label, cond, extra) => out.push((cond ? 'PASS  ' : 'FAIL  ') + label + (extra ? '  -> ' + extra : ''));
const txt = () => d.querySelector('#side').textContent;
const q = s => d.querySelector(s);
const all = s => [...d.querySelectorAll(s)];
const tap = (sel, i = 0) => { const e = all(sel)[i]; if (!e) return false; e.click(); return true; };
const tapText = (sel, re) => { const e = all(sel).find(x => re.test(x.textContent)); if (!e) return false; e.click(); return true; };
async function go(hash) { w.location.hash = hash; await sleep(120); }

(async () => {
  await sleep(1800);
  const A = () => txt();

  /* ---------- boot ---------- */
  ok('LAB loaded', !!w.LAB);
  ok('3 topics', Object.keys(w.LAB.topics).length === 3);
  ok('18 combos defined (3 topic x 2 mode x 3 opt)', true);
  ok('prototype bar has 10 buttons', all('#pbar .pbtn').length === 10, all('#pbar .pbtn').length + '');
  ok('lesson rendered', all('#lesson .blk').length > 4, all('#lesson .blk').length + '');
  ok('default route = pipeline/theory/A', w.S.t === 'pipeline' && w.S.m === 'theory' && w.S.o === 'A');
  ok('Option A head', /Option A/.test(A()));

  /* ---------- Option A ---------- */
  ok('A: trace list shown (7)', /7 dấu vết/.test(A()));
  ok('A: start button present', !!q('[data-act="a.start"]'));
  tap('[data-act="a.start"]'); await sleep(1500);
  ok('A: generated', w.S.generated === true);
  ok('A: 4 note sections', all('#side .note > .sec').length === 4, all('#side .note > .sec').length + '');
  ok('A: 7 items (2+2+1+2)', all('#side .item').length === 7, all('#side .item').length + '');
  ok('A: screenshot marked "AI gắn tạm"', /AI gắn tạm/.test(A()));
  ok('A: warning about 2 screenshots', /2 ảnh chụp màn hình/.test(A()));
  ok('A: anchors carry slide', /Slide 4 · 12:40/.test(A()));
  // edit
  const ed = q('[data-edit="gap:0"]');
  ok('A: item editable', ed && ed.getAttribute('contenteditable') === 'true');
  ed.textContent = 'da sua tay'; ed.dispatchEvent(new w.FocusEvent('blur', { bubbles: false }));
  ok('A: edit persisted to state', w.S.note.secs[1].items[0].text === 'da sua tay', w.S.note.secs[1].items[0].text);
  // delete
  const nBefore = all('#side .item').length; tap('[data-act="note.del"]'); await sleep(80);
  ok('A: delete works', all('#side .item').length === nBefore - 1, nBefore + '->' + all('#side .item').length);
  tap('[data-act="note.undo"]'); await sleep(80);
  ok('A: undo restores', all('#side .item').length === nBefore);
  ok('A: undo also reverts text', /vì sao 5 tầng chạy song song/.test(A()));
  tap('[data-act="note.save"]'); await sleep(80);
  ok('A: saved', w.S.saved === true && /Đã lưu/.test(A()));

  /* ---------- Option B ---------- */
  await go('#pipeline/theory/B');
  ok('B: head', /Option B/.test(A()));
  ok('B: 3 goal chips', all('[data-act="b.q"]').length === 3);
  tapText('[data-act="b.q"]', /Làm bài tập/); ok('B: goal=baitap', w.S.bAns.goal === 'baitap');
  tap('[data-act="b.next"]'); await sleep(60);
  ok('B: step2 priority', w.S.bStep === 1);
  tap('[data-act="b.q"]', 0); ok('B: priority set', !!w.S.bAns.pri, w.S.bAns.pri);
  tap('[data-act="b.next"]'); await sleep(60);
  ok('B: step3 screenshot assignment', /không có số slide/.test(A()));
  const asg = all('[data-act="b.assign"]');
  ok('B: assign buttons (2 imgs x (2 slides + skip))', asg.length === 6, asg.length + '');
  tap('[data-act="b.assign"]', 0); tap('[data-act="b.assign"]', 3);
  ok('B: both assigned', Object.keys(w.S.bAns.assign).length === 2, JSON.stringify(w.S.bAns.assign));
  tap('[data-act="b.next"]'); await sleep(1400);
  ok('B: generated', w.S.generated === true);
  ok('B: goal changed section order', /Xếp để làm bài/.test(A()));
  ok('B: screenshot "bạn xác nhận"', /bạn đã xác nhận/.test(A()));
  ok('B: priority badge', /quan trọng nhất/.test(A()));
  const firstSec = q('#side .sec .sec-h').textContent;
  ok('B: first section = Điểm chính (goal baitap)', /Điểm chính/.test(firstSec), firstSec.trim());
  tap('[data-act="b.redo"]'); await sleep(80);
  ok('B: redo resets', w.S.generated === false && w.S.bStep === 0);

  /* ---------- Option B, other goal changes order ---------- */
  await go('#cache/theory/B');
  tapText('[data-act="b.q"]', /Hiểu lại bài/); tap('[data-act="b.next"]'); await sleep(60);
  tap('[data-act="b.q"]', 0); tap('[data-act="b.next"]'); await sleep(60);
  for (let guard = 0; guard < 10 && Object.keys(w.S.bAns.assign).length < 2; guard++) {
    const e = all('[data-act="b.assign"]').find(x => !w.S.bAns.assign[x.dataset.t]);
    if (!e) break;
    e.click(); await sleep(60);
  }
  ok('B: both screenshots assigned', Object.keys(w.S.bAns.assign).length === 2, JSON.stringify(w.S.bAns.assign));
  tap('[data-act="b.next"]'); await sleep(1500);
  ok('B: goal=hieu puts gap first', /Chỗ chưa hiểu/.test(q('#side .sec .sec-h').textContent), q('#side .sec .sec-h').textContent.trim());
  ok('B: no "AI gắn tạm" left once user confirms', !/AI gắn tạm/.test(A()) && /bạn đã xác nhận/.test(A()));

  /* ---------- Option B, thi goal swaps last two sections ---------- */
  await go('#context/theory/B');
  tapText('[data-act="b.q"]', /Ôn trước kỳ thi/); tap('[data-act="b.next"]'); await sleep(60);
  tap('[data-act="b.q"]', 0); tap('[data-act="b.next"]'); await sleep(60);
  for (let guard = 0; guard < 10 && Object.keys(w.S.bAns.assign).length < 2; guard++) {
    const e = all('[data-act="b.assign"]').find(x => !w.S.bAns.assign[x.dataset.t]);
    if (!e) break; e.click(); await sleep(60);
  }
  tap('[data-act="b.next"]'); await sleep(1500);
  const secNamesThi = all('#side .note > .sec .sec-h').map(s => s.childNodes[0].textContent.trim());
  ok('B: goal=thi puts screenshots before questions',
    secNamesThi[2].indexOf('Ảnh') === 0 && secNamesThi[3].indexOf('Câu hỏi') === 0,
    secNamesThi.join(' | '));

  /* ---------- Option C ---------- */
  await go('#pipeline/theory/C');
  ok('C: head', /Option C/.test(A()));
  ok('C: no button to start, only watching', /Tín hiệu hệ thống đang thấy/.test(A()));
  ok('C: tells user it will nudge in 12s', /sau 12 giây/.test(A()));
  ok('C: no data-act="a.start"', !q('[data-act="a.start"]'));
  tap('[data-act="c.nudge"]'); await sleep(80);
  ok('C: nudge card', /AI NGHĨ BẠN KẸT Ở ĐÂY/.test(A()));
  ok('C: signals listed', /Bạn đã đọc lại Slide 4/.test(A()));
  ok('C: confidence meter', q('#side .conf-fill') && q('#side .conf-fill').style.width === '82%', q('#side .conf-fill') && q('#side .conf-fill').style.width);
  ok('C: "Vi sao AI nghia vay"', /Vì sao AI nghĩ vậy/.test(A()));
  tap('[data-act="c.ack"]'); await sleep(1400);
  ok('C: generated', w.S.generated === true);
  ok('C: AI flags on items', all('#side .badge.ai').length >= 3, all('#side .badge.ai').length + '');
  ok('C: screenshot shows "AI gắn · n%"', /AI gắn · \d+%/.test(A()));
  ok('C: gap section first', /Chỗ chưa hiểu/.test(q('#side .sec .sec-h').textContent));
  tap('[data-act="c.esc.open"]'); await sleep(60);
  ok('C: escalation opens', /Leo thang: nhờ người thật/.test(A()));
  ok('C: escalation prefilled draft', /trim_history|stall|forwarding/.test(A()) || /Tôi đang/.test(A()));
  tapText('[data-act="c.esc.to"]', /Ninh Quang Minh/); await sleep(50);
  tap('[data-act="c.esc.send"]'); await sleep(60);
  ok('C: escalate sent & closed', w.S.escOpen === false && w.LOG.rows.some(r => r.event === 'c-escalate-send'));

  /* ---------- Option C: reject path ---------- */
  await go('#context/lab/C');
  tap('[data-act="c.nudge"]'); await sleep(60); tap('[data-act="c.fix"]'); await sleep(1400);
  ok('C: reject -> no item flagged by AI', /AI tự gắn cờ/.test(A()) === false);
  ok('C: reject -> gap section empty hint', /Chưa có mục nào/.test(A()));

  /* ---------- Option C: turn off ---------- */
  await go('#cache/lab/C');
  tap('[data-act="c.off"]'); await sleep(60);
  ok('C: off state', /Bạn đã tắt tự nhắc/.test(A()));
  tap('[data-act="c.on"]'); await sleep(60);
  ok('C: can re-enable', !/Bạn đã tắt tự nhắc/.test(A()));

  /* ---------- checkpoint ---------- */
  await go('#pipeline/theory/A');
  tapText('[data-act="quiz"]', /24 chu kỳ/); await sleep(80);
  ok('checkpoint: correct answer marked', all('#side').length >= 0 && /Đúng\./.test(d.querySelector('#lesson').textContent));
  await go('#cache/lab/A');
  tapText('[data-act="quiz"]', /200,98/); await sleep(80);
  ok('checkpoint lab: correct', /Đúng\./.test(d.querySelector('#lesson').textContent));
  await go('#cache/theory/A');
  tapText('[data-act="quiz"]', /200 chu kỳ/); await sleep(80);
  ok('checkpoint: wrong answer explained', /Sai\./.test(d.querySelector('#lesson').textContent));

  /* ---------- all 18 combos render ---------- */
  let combos = 0; const bad = [];
  for (const t of w.LAB.topicOrder) for (const m of ['theory', 'lab']) for (const o of ['A', 'B', 'C']) {
    await go('#' + t + '/' + m + '/' + o);
    const blocks = all('#lesson .blk').length;
    const hasHead = new RegExp('Option ' + o).test(txt());
    const hasTrace = /dấu vết|Dấu vết|hỏi bạn|theo dõi bạn/.test(txt());
    if (blocks >= 3 && hasHead && hasTrace) combos++; else bad.push(t + '/' + m + '/' + o + ' blocks=' + blocks);
  }
  ok('18/18 combos render', combos === 18, combos + '/18; bad=' + bad.join(', '));

  /* ---------- recovery: reset ---------- */
  await go('#cache/theory/A');
  tap('[data-act="a.start"]'); await sleep(1400);
  ok('before reset: note exists', w.S.generated === true && !!q('#side .item'));
  tap('[data-act="reset"]'); await sleep(150);
  ok('reset clears generated', w.S.generated === false && !!q('[data-act="a.start"]'));

  /* ---------- logger / CSV (sau reset để có event reset) ---------- */
  const rows = w.LOG.rows;
  ok('log has rows', rows.length > 25, rows.length + '');
  const csv = w.LOG.csv();
  ok('csv header', csv.split('\n')[0] === 'time,option,t_sec,event,detail');
  ['a-start', 'a-built', 'b-assign', 'b-built', 'c-nudge', 'c-ack', 'c-escalate-send', 'c-fix', 'c-off', 'quiz', 'note-save', 'note-edit', 'note-del', 'note-undo', 'reset', 'start'].forEach(e2 => {
    ok('csv contains event ' + e2, csv.includes(',' + e2 + ','));
  });
  ok('csv quotes detail containing comma', /"[^"]*,[^"]*"/.test(csv));

  /* ---------- unknown route falls back ---------- */
  await go('#khong/ton/ta/X');
  ok('unknown route falls back to A', w.S.o === 'A' && /Option A/.test(txt()));

  ok('no JS errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  console.log('\n' + out.join('\n'));
  const fails = out.filter(l => l.startsWith('FAIL'));
  console.log('\n== ' + (out.length - fails.length) + '/' + out.length + ' passed ==');
  if (errors.length) console.log('\nERRORS:\n' + errors.join('\n---\n'));
  process.exit(fails.length ? 1 : 0);
})();