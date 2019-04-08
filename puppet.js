exports.run = (id, code, config) => {
  const puppeteer = require('puppeteer'); // Needs puppeteer

  // Define selectors
  const MESSAGE_SELECTOR = '#replay-msg-form > div > textarea';
  const SEND_SELECTOR = '#replay-msg-form > button';

  // Set cookie for "login"
  const cookies = [{
    'name': config.cookie_name,
    'value': config.cookie_value,
    'domain': '.gamekit.com'
  }];

  // Launch browser in async, this is necessary for page.goto, in order to let the browser finish loading
  (async () => {
    const browser = await puppeteer.launch({
	    args: ['--disable-gpu',
             '--disable-dev-shm-usage',
             '--disable-setuid-sandbox',
             '--no-first-run',
             '--no-sandbox',
             '--no-zygote',
             '--single-process'], // Trying to remove as much workload from the site as possible
  	  headless: true
    });
  		const page = await browser.newPage();
	  try{
      // Intercept image load
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (['image'].indexOf(request.resourceType()) !== -1) {
          request.abort();
        } else {
          request.continue();
        }
      });

  		// "login" xD
  		await page.setCookie(...cookies);

      await page.goto(`https://gamekit.com/messages/${id}/`, {timeout: 60000});

  		// Message
  		await page.focus(MESSAGE_SELECTOR);
  		await page.keyboard.type(`Please type following on Discord: >verify ${code}`);

  		// Click send AND evaluate a button click. This fixes the strange behaviour of Gamekit not recognizing the page.click on first messages with a user. Doesn't affect known users.
  		await page.click(SEND_SELECTOR);
  		await page.evaluate("$('#replay-msg-form > button').click();");

  		browser.close();
    } catch (err) {
       console.log(err);
       console.log(`URL: "${page.url()}"`);
	     browser.close();
    }
  })();
}
