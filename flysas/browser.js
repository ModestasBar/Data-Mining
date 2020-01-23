const automation = require('./scrape');
const auto = require('./autoSteps');
const logic = require('./dataLogic');

const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const initUrl = 'https://classic.flysas.com/en/de/';

(async () => {
    //Init puppeteer settings
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
    
      //Open virtual window
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(initUrl, {waitUntil: 'networkidle0'});

      //Automate steps
      await auto.steps(page);

      //Scrape page
      const arrive = await automation.scrape(page, '#panel_0', '.bound_FFCO.WDSBooking');
      const depart = await automation.scrape(page, '#panel_1', '.inbound');

    //Log data
    console.log(arrive.date, ' - Depart');
    console.log(logic.sortData(arrive));
    console.log(depart.date, ' - Come back');
    console.log(logic.sortData(depart));

    await browser.close();
})()



