const { chromium } = require('playwright');
const path = require('path');
const ROOT = process.argv[2];
const OUT = path.join(__dirname, 'shots');
require('fs').mkdirSync(OUT, { recursive: true });
const url = 'file:///' + path.join(ROOT, 'prototype', 'index.html').replace(/\\/g, '/');

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });

  let nav = 0;
  const shot = async (name, hash, prep) => {
    await pg.goto('about:blank');
    await pg.goto(url + '?n=' + (nav++) + '#' + hash);
    await pg.waitForTimeout(700);
    if (prep) await prep();
    await pg.waitForTimeout(400);
    await pg.screenshot({ path: path.join(OUT, name + '.png'), fullPage: false });
    console.log('shot', name);
  };

  await shot('1-optionA-idle', 'pipeline/theory/A');
  await shot('2-optionA-note', 'pipeline/theory/A', async () => {
    await pg.click('[data-act="a.start"]'); await pg.waitForTimeout(1600);
    await pg.evaluate(() => document.querySelector('#side').scrollIntoView());
  });
  const GOAL = '[data-act="b.q"]:has-text("Làm bài tập")';
  const step2 = async () => {
    await pg.click(GOAL); await pg.click('[data-act="b.next"]'); await pg.waitForTimeout(200);
    await pg.click('[data-act="b.q"] >> nth=0'); await pg.click('[data-act="b.next"]'); await pg.waitForTimeout(250);
  };

  await shot('3-optionB-q1', 'pipeline/theory/B');
  await shot('4-optionB-q3', 'pipeline/theory/B', step2);
  await shot('5-optionB-note', 'pipeline/theory/B', async () => {
    await step2();
    await pg.click('[data-act="b.assign"] >> nth=0'); await pg.waitForTimeout(150);
    await pg.click('[data-act="b.assign"] >> nth=3'); await pg.waitForTimeout(150);
    await pg.click('[data-act="b.next"]'); await pg.waitForTimeout(1400);
  });
  await shot('6-optionC-watch', 'pipeline/theory/C');
  await shot('7-optionC-nudge', 'pipeline/theory/C', async () => {
    await pg.click('[data-act="c.nudge"]'); await pg.waitForTimeout(400);
  });
  await shot('8-optionC-note', 'cache/theory/C', async () => {
    await pg.click('[data-act="c.nudge"]'); await pg.waitForTimeout(300);
    await pg.click('[data-act="c.ack"]'); await pg.waitForTimeout(1500);
    await pg.click('[data-act="c.esc.open"]'); await pg.waitForTimeout(300);
  });
  await shot('9-lab-context', 'context/lab/A', async () => {
    await pg.click('[data-act="a.start"]'); await pg.waitForTimeout(1500);
  });
  await shot('10-log', 'pipeline/theory/A', async () => {
    await pg.click('[data-act="a.start"]'); await pg.waitForTimeout(1500);
    await pg.click('[data-act="log"]'); await pg.waitForTimeout(400);
  });

  // checkpoint wrong-answer flow in lab mode
  await pg.goto(url + '#pipeline/lab/A'); await pg.waitForTimeout(600);
  await pg.click('[data-act="a.start"]'); await pg.waitForTimeout(1500);
  await pg.click('.cp-opt >> nth=0'); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(OUT, '11-checkpoint-wrong.png') });
  console.log('shot 11-checkpoint-wrong');

  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no page errors');
  await b.close();
})();