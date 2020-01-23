const puppeteer = require('puppeteer');
const dataLogic = require('./dataLogic');
const autoSteps = require('./automationSteps');
const scrape = require('./scrape');

//Base url
const initUrl = 'https://www.norwegian.com/en/';

(async () => {
  //Init settings
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto(initUrl, {waitUntil: 'networkidle0'});

  //All automated steps in init page
  await autoSteps.initPage(page);

  //Scrape available days to flight
  const days = await scrape.daysScrape(page);

  //All automated steps for calender data
  await autoSteps.calenderSteps(page);
  
  //Iterate all month
  for(let i = 1; i <= days.length; i++) {

    //Print cheapest flight each day
    console.log(dataLogic.data(await scrape.flightScrape(page)));

    //Select next day
    await autoSteps.selectSteps(page, days[i]);
  }
  await browser.close();
})();
