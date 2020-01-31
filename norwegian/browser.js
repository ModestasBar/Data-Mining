const puppeteer = require('puppeteer-extra');
const dataLogic = require('./dataLogic');
const scrape = require('./scrape');
const saveData = require('../saveData');

//Enable stealth plugins with evasion
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

// Init urls
const calenderUrl = 'https://www.norwegian.com/en/booking/flight-tickets/farecalendar/?A_City=RIX&AdultCount=1&ChildCount=0&CurrencyCode=EUR&D_City=OSLALL&D_Day=01&D_Month=202005&D_SelectedDay=01&IncludeTransit=true&InfantCount=0&R_Day=30&R_Month=202001&TripType=1#/?origin=OSLALL&destination=RIX&outbound=2020-05&adults=1&oneWay=true&currency=EUR';
const iterrateUrl = (day) => {
  return `https://www.norwegian.com/en/ipc/availability/avaday?AdultCount=1&A_City=RIX&D_City=OSLALL&D_Month=202005&D_Day=${day}&IncludeTransit=true&TripType=1&CurrencyCode=EUR&dFare=55&mode=ab`;
}

(async () => {
  // Init settings
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const data = [];

  //Get calender days
  console.log('Getting availables flight days...')
  await page.goto(calenderUrl);
  const days = await scrape.daysScrape(page);

  console.log('Scraping data...')
  for (let i = 0; i < days.length; i++) {
    await page.goto(iterrateUrl(days[i]));
    data.push(dataLogic.data(await scrape.flightScrape(page)));
    console.log(`Day ${days[i]}`);
  }
  await browser.close();

  saveData.csv(data, 'norwegian');
})();



