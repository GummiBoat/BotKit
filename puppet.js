exports.run = (id, code, config) => {
  require('dotenv').config();
  const puppeteer = require('puppeteer');

  const MESSAGE_SELECTOR = '#replay-msg-form > div > textarea';
  const SEND_SELECTOR = '#replay-msg-form > button';

  const cookies = [{
    'name': config.cookie_name,
    'value': config.cookie_value,
    'domain': '.gamekit.com'
  }];

  (async () => {
    const browser = await puppeteer.launch({
	  args: ['--no-sandbox'],
  	  headless: true
    });
    const page = await browser.newPage();

    //"login" xD
    await page.setCookie(...cookies);
    await page.goto(`https://gamekit.com/messages/${id}/`);

    //Message
    await page.focus(MESSAGE_SELECTOR);
    await page.keyboard.type(`Please type following on Discord: .verify ${code}`);

    await page.click(SEND_SELECTOR);

    await browser.close();
  })();
}
