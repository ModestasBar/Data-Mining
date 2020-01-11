const puppeteer = require('puppeteer');
 
const calenderUrl = 'https://www.norwegian.com/en/booking/flight-tickets/farecalendar/?D_City=OSLALL&A_City=RIX&TripType=1&D_Day=02&D_Month=202005&D_SelectedDay=02&R_Day=03&R_Month=202005&R_SelectedDay=03&dFlight=DY1074OSLRIX&dCabinFareType=1&IncludeTransit=false&CurrencyCode=EUR&message=noFlightsOnDate&processid=39576&mode=ab#/?origin=OSLALL&destination=RIX&outbound=2020-05&adults=1&direct=true&oneWay=true&currency=EUR';
const initUrl = 'https://www.norwegian.com/en/ipc/availability/avaday?D_City=OSLALL&A_City=RIX&TripType=1&D_Day=03&D_Month=202005&D_SelectedDay=03&R_Day=03&R_Month=202005&R_SelectedDay=03&dFlight=DY1074OSLRIX&dCabinFareType=1&IncludeTransit=false&AgreementCodeFK=-1&CurrencyCode=EUR&rnd=30991&mode=ab';


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

  // Calculate calendar days
  await page.goto(calenderUrl, {waitUntil: 'networkidle0'})
  const days = await page.evaluate(() => {
      return [...document.querySelectorAll('button:not(.lowfare-calendar__item--empty) .lowfare-calendar__date')]
      .map(val => ('0' + Number(val.innerHTML)).slice(-2));
  })
  // Scrape date for the flight
  await page.goto(initUrl, {waitUntil: 'networkidle0'})
  for(let i = 0; i < days.length; i++) {
    await page.select('#ctl00_MainContent_ipcAvaDay_ipcAvaDaySearchBar_ddlDepartureDay', days[i]);
    await page.waitForNavigation(); 
    const timeAndAirpor = await page.evaluate(() => {
      return [...document.querySelectorAll('.headerbox td[nowrap], .depdest > div, .arrdest > div, .fareselect.standardlowfare')]
      .map(val => val.innerText);
    })

    console.log(data(timeAndAirpor));
  }

  await browser.close();
})();
