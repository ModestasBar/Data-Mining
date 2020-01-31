const puppeteer = require('puppeteer-extra');
const automation = require('./scrape');
const auto = require('./autoSteps');
const logic = require('./dataLogic');
const saveData = require('../saveData');

// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const initUrl = 'https://classic.flysas.com/en/de/';

(async () => {
  // Init puppeteer settings
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  // Open virtual window
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(initUrl, { waitUntil: 'networkidle0' });

  // Automate steps
  await auto.steps(page);

  // Scrape page
  const depart = await automation.scrape(page, '#panel_0', '.bound_FFCO.WDSBooking');
  const arrive = await automation.scrape(page, '#panel_1', '.inbound');

  console.log('Scrape finished!')
  await browser.close();

  const singleData = [
    ...logic.sortData(depart).cheapestDirectFlight,
    ...logic.sortData(depart).cheapestConnectFlight,
    ...logic.sortData(arrive).cheapestDirectFlight,
    ...logic.sortData(arrive).cheapestConnectFlight
  ];
  await saveData.csv(singleData, 'flysas');
})();