const { chromium } = require('playwright-core');

const BASE = process.env.TARGET_URL || 'http://wp-nuxt-app:3000';

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  let ok = true;

  function check(label, condition) {
    const s = condition ? 'PASS' : 'FAIL';
    if (!condition) ok = false;
    console.log(`  ${s}: ${label}`);
  }

  try {
    console.log('=== 1. Login page loads ===');
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    check('Login form renders', (await page.locator('form').count()) > 0);
    check('Username input', (await page.locator('#username').count()) > 0);
    check('Password input', (await page.locator('#password').count()) > 0);
    check('Submit button', (await page.locator('button').count()) > 0);
    const titleText = await page.locator('.self-center').textContent().catch(() => null);
    check('Title text rendered', titleText && titleText.length > 0);
    console.log(`    Title: "${titleText}"`);
    await page.screenshot({ path: '/tmp/screenshot-login.png', fullPage: true });

    console.log('\n=== 2. Route redirects ===');
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 });
    check('Root -> /login', page.url().includes('/login'));
    await page.goto(`${BASE}/movies`, { waitUntil: 'networkidle', timeout: 15000 });
    check('/movies -> /login', page.url().includes('/login'));
    await page.goto(`${BASE}/posts`, { waitUntil: 'networkidle', timeout: 15000 });
    check('/posts -> /login', page.url().includes('/login'));

    console.log('\n=== 3. Tailwind CSS ===');
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    const ff = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    check('Font family set', ff.length > 0);
    console.log(`    Font: ${ff}`);

    console.log('\n=== 4. Dark mode ===');
    const cls = await page.evaluate(() => document.documentElement.className);
    check('HTML has color-mode class', cls.includes('dark') || cls.includes('light'));
    console.log(`    class="${cls}"`);

    console.log('\n=== 5. No console errors ===');
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    check('No console errors', errors.length === 0);
    errors.forEach(e => console.log(`    ${e}`));

  } catch (e) {
    console.error('ERROR:', e.message);
    ok = false;
  }

  await browser.close();
  console.log(ok ? '\nALL CHECKS PASSED' : '\nSOME CHECKS FAILED');
  process.exit(ok ? 0 : 1);
}

run();
