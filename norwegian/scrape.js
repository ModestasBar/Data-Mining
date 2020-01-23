const flightScrape = async (page) => {
    const timeAndAirpor = await page.evaluate(() => {
        return [...document.querySelectorAll('.headerbox td[nowrap], .depdest > div, .arrdest > div, .fareselect.standardlowfare')]
        .map(val => val.innerText);
      })
    return timeAndAirpor;
}

const daysScrape = async (page) => {
    const days = await page.evaluate(() => {
        return [...document.querySelectorAll('button:not(.lowfare-calendar__item--empty) .lowfare-calendar__date')]
        .map(val => ('0' + Number(val.innerHTML)).slice(-2));
      })
    return days;
}
exports.daysScrape = daysScrape;
exports.flightScrape = flightScrape;