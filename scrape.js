const puppeteer = require('puppeteer');
 
const initUrl = 'https://www.norwegian.com/en/'


const sortData = (data) => {
  const lowestPrice = Math.min(...data.filter(val => Number(val)));
  let flightData = [];
  data.forEach((val, i) => {
  if(val == lowestPrice) {
      flightData = data.slice(i - 2, i + 3);
    }
  })
  return flightData
}

const data = (rawTimeAndData) => {
  const flightDate = rawTimeAndData[0];
  const flightInfo = sortData(rawTimeAndData);

  return {
    "Date" : flightDate,
    "DepartDate" : flightInfo[0],
    "ArrivalDate" : flightInfo[1],
    "CheapestPrice" : flightInfo[2],
    "DepartAirport" : flightInfo[3],
    "ArriveAirport" : flightInfo[4]
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);
  await page.goto(initUrl, {waitUntil: 'networkidle0'});

  // await page.waitForSelector('#nas-airport-select-dropdown-input-0');

  //Destination
  await page.evaluate(function() {
    document.querySelector('input#airport-select-origin').value = ''
  })
  await page.type('#airport-select-origin', ' OSL', {delay: 100});
  await page.click('.airport-select__item--focus');
  await page.type('#airport-select-destination', ' RIX', {delay: 100});
  await page.click('.airport-select__item--focus');
  await page.waitFor(1000);

  //One way
  await page.waitForSelector('#tripType, .outboundDate');
  await page.click('#tripType span:nth-child(2) .radio__control-indicator');

  // //Direct only
  // await page.click('.travel-details nas-dropdown:nth-child(3)');
  // await page.waitForSelector('.travel-details__actions');
  // await page.click('.travel-details__dropdown--transit-type .travel-details__actions button:nth-child(2)');

  //Get flight calender
  await page.click('#resultTypeGroups + div span:nth-child(2) .radio__control-indicator');

  await page.waitFor(500);
  //Get depart date
  await page.click('.calendar__input');
  await page.waitForSelector('tbody button:not([disabled])');
  await page.click('.pull-right');
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.waitFor(1000)
  await page.click('.ui-datepicker-content tbody tr:nth-child(1) td:nth-child(5)');

  await page.waitForSelector('.calendar__datepicker.ng-hide');
  await page.click('#searchButton');

  //Get calender days
  await page.waitFor(10000);

   const days = await page.evaluate(() => {
      return [...document.querySelectorAll('button:not(.lowfare-calendar__item--empty) .lowfare-calendar__date')]
      .map(val => ('0' + Number(val.innerHTML)).slice(-2));
  })
  // console.log(days);

  await page.click('tbody tr td:nth-child(6)');
  // await page.waitForSelector('.nas-continue__action button:not([disabled])');
  await page.waitFor(20000);

  console.log('not clicked');
  await page.click('.nas-continue__action button:not([disabled])');
  console.log('clicked');
  
  await page.waitForNavigation();
  // Scrape date for the flight
  for(let i = 1; i < days.length; i++) {
    const timeAndAirpor = await page.evaluate(() => {
      return [...document.querySelectorAll('.headerbox td[nowrap], .depdest > div, .arrdest > div, .fareselect.standardlowfare')]
      .map(val => val.innerText);
    })

    console.log(data(timeAndAirpor));

    await page.select('#ctl00_MainContent_ipcAvaDay_ipcAvaDaySearchBar_ddlDepartureDay', days[i]);
    await page.waitForNavigation();
  }

  await browser.close();
})();
