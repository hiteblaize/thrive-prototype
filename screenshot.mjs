import puppeteer from 'puppeteer';

const BASE = 'http://localhost:7823';

const screens = [
  { name: '01-home', url: '/preview.html', setup: null },
  { name: '02-home-done', url: '/preview.html', setup: async (page) => {
    await page.evaluate(() => {
      localStorage.setItem('carda_checkin',  JSON.stringify({ severity: 'good' }));
      localStorage.setItem('carda_protein',  JSON.stringify({ logged: 150, goal: 150 }));
      localStorage.setItem('carda_article',  JSON.stringify({ read: true }));
      localStorage.setItem('carda_exercise', JSON.stringify({ completed: true }));
      localStorage.setItem('carda_lifestyle',JSON.stringify({ completed: true }));
    });
    await page.reload({ waitUntil: 'networkidle0' });
  }},
  { name: '03-checkin',   url: '/checkin.html',       setup: null },
  { name: '04-article',   url: '/article.html',        setup: null },
  { name: '05-progress',  url: '/progress.html',       setup: null },
  { name: '06-chat',      url: '/chat.html',            setup: null },
  { name: '07-cardi',     url: '/cardi-insight.html',  setup: null },
  { name: '08-haley',     url: '/haley.html',           setup: null },
  { name: '09-maya',      url: '/maya.html',            setup: null },
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

for (const screen of screens) {
  // Clear state between screens
  await page.goto(BASE + '/preview.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    ['carda_checkin','carda_protein','carda_hydration','carda_article','carda_exercise','carda_lifestyle','carda_evening']
      .forEach(k => localStorage.removeItem(k));
  });

  await page.goto(BASE + screen.url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  if (screen.setup) await screen.setup(page);
  await new Promise(r => setTimeout(r, 400));

  const path = `/Users/blaize/Documents/Code/business_experiment1/exports/${screen.name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`✓ ${screen.name}`);
}

await browser.close();
console.log('\nDone — exports/ folder ready.');
