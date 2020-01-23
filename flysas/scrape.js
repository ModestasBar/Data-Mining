const scrape = async (page, id, dateClass) => {

    const arrive = await page.evaluate((id, dateClass) => {
        const date = document.querySelector(`${dateClass} .list .selected .date`).innerHTML.trim();

        const airports = [...document.querySelectorAll(`${id} .container tbody`)]
        .map((val) => {
          return val.childElementCount > 4 ? 
          `${val.childNodes[2].childNodes[5].innerText} || ${val.childNodes[8].childNodes[5].innerText}`.replace(/ +/g, "")
          : val.childNodes[2].childNodes[3].innerText.replace(/ +/g, "");
        })

        const time = [...document.querySelectorAll(`${id} .segmented > .time`)]
        .map(val => val.innerText.trim());

        const price = [...document.querySelectorAll(`${id} .segmented .first .number`)]
        .map(val => Number(val.innerHTML.trim().replace(',', '.')));

        return {
          date,
          price,
          time,
          airports,
        }
    }, id, dateClass)
    return arrive;
}

// const steps = async (page) => {
//     //Select airports
//     await page.type('#predictiveSearchFrom .predictiveSearchBox', 'ARN', {delay: 200});
//     await page.type('#predictiveSearchTo .predictiveSearchBox', 'LHR', {delay: 200});

//     await page.waitForSelector('#resultTo .selected');

//     //Depart date
//     await page.click('.flOutDate'),
//     await page.click('.ui-icon-circle-triangle-e'),
//     await page.click('.ui-icon-circle-triangle-e'),
//     await page.click('.ui-icon-circle-triangle-e'),
//     await page.click('.ui-icon-circle-triangle-e'),
//     await page.click('.ui-datepicker-calendar tr:nth-child(2) td:nth-child(5)'),

//     //Return date 
//     await page.click('.flInDate');
//     await page.click('.ui-datepicker-calendar tr:nth-child(3) td:nth-child(5)');

//     await page.waitFor(1000);
//     await page.click('.cepBody .bluebutton .buttonBody');
    
//     await page.waitForSelector('.flight.segmented .first', { visible: true, timeout: 0 });
// }

exports.scrape = scrape;