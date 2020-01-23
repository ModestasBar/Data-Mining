const initPage = async (page) => {

  //Clear input field
  await page.evaluate(function() {
    document.querySelector('input#airport-select-origin').value = ''
  })
  //Select airports
  await page.type('#airport-select-origin', ' OSL', {delay: 200});
  await page.click('.airport-select__item--focus');
  await page.type('#airport-select-destination', ' RIX', {delay: 200});
  await page.click('.airport-select__item--focus');
  await page.waitFor(1000);

  //One way
  await page.waitForSelector('#tripType, .outboundDate');
  await page.click('#tripType span:nth-child(2) .radio__control-indicator');

  //Get flight calender
  await page.click('#resultTypeGroups + div span:nth-child(2) .radio__control-indicator');

  //Remove cookies settings
  await page.click('.cookie-disclaimer__close-button button');
  await page.waitFor(500);

  //Get depart date
  await page.click('.calendar__input');
  await page.waitFor(500);
  await page.waitForSelector('tbody button:not([disabled])');
  await page.click('.pull-right');
  await page.waitFor(500);
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitFor(500);
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitFor(500);
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.pull-right');
  await page.waitFor(500);
  await page.waitForSelector('.calendar__footer--busy.ng-hide');
  await page.click('.ui-datepicker-content tbody tr:nth-child(1) td:nth-child(5)');

  await page.waitForSelector('.calendar__datepicker.ng-hide');
  await page.click('#searchButton');

  await page.waitForSelector('tbody tr td:nth-child(6)');
  await page.waitFor(500);

  //Get calender days
  await page.click('tbody tr td:nth-child(6)');
}

const calenderSteps = async (page) => {
    await page.waitForSelector('.nas-continue__action button:not([disabled])');
    await page.click('.nas-continue__action button');
    await page.waitForSelector('.headerbox td[nowrap]');
}

const selectSteps = async (page, days) => {
    await page.select('#ctl00_MainContent_ipcAvaDay_ipcAvaDaySearchBar_ddlDepartureDay', days);
    await page.waitForNavigation();
}

exports.initPage = initPage;
exports.calenderSteps = calenderSteps;
exports.selectSteps = selectSteps;