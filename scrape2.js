const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const initUrl = 'https://classic.flysas.com/en/de/';
const test = 'https://book.flysas.com/pl/SASC/wds/Override.action?SO_SITE_EXT_PSPURL=https://classic.sas.dk/SASCredits/SASCreditsPaymentMaster.aspx&SO_SITE_TP_TPC_POST_EOT_WT=50000&SO_SITE_USE_ACK_URL_SERVICE=TRUE&WDS_URL_JSON_POINTS=ebwsprod.flysas.com%2FEAJI%2FEAJIService.aspx&SO_SITE_EBMS_API_SERVERURL=%20https%3A%2F%2F1aebwsprod.flysas.com%2FEBMSPointsInternal%2FEBMSPoints.asmx&WDS_SERVICING_FLOW_TE_SEATMAP=TRUE&WDS_SERVICING_FLOW_TE_XBAG=TRUE&WDS_SERVICING_FLOW_TE_MEAL=TRUE&WDS_MIN_REQ_MIL=500';

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
    
      const page = await browser.newPage();
      await page.goto(initUrl, {waitUntil: 'networkidle0'});


      //Depart date
      await page.type('#predictiveSearchFrom .predictiveSearchBox', 'ARN', {delay: 200});
      await page.type('#predictiveSearchTo .predictiveSearchBox', 'LHR', {delay: 200});

      await page.waitForSelector('#resultTo .selected');
      
      await page.click('.flOutDate');
      await page.click('.ui-icon-circle-triangle-e');
      await page.click('.ui-icon-circle-triangle-e');
      await page.click('.ui-icon-circle-triangle-e');
      await page.click('.ui-icon-circle-triangle-e');
      await page.click('.ui-datepicker-calendar tr:nth-child(2) td:nth-child(5)');


      //Return date 
      await page.click('.flInDate');
      await page.click('.ui-datepicker-calendar tr:nth-child(3) td:nth-child(5)');
      
      await page.waitFor(1000);

      await page.click('.cepBody .bluebutton .buttonBody');
      
      await page.waitForSelector('.flight.segmented .first', { visible: true, timeout: 0 });

      const test = await page.evaluate(() => {
      const departArriveConnect = [...document.querySelectorAll('#panel_0 .first.time .time')]
      .map(val => val.innerHTML.trim());

      const departArriveDirect = [...document.querySelectorAll('#panel_0 .segmented .time .time')]
      .map(val => val.innerHTML.trim());

      const price = [...document.querySelectorAll('#panel_0 .segmented .first .number')]
      .map(val => val.innerHTML.trim());

      const locationAirport = [...document.querySelectorAll('#panel_0 .route.last .location')]
      .map(val => val.innerText);

      return {
        departArriveConnect,
        departArriveDirect,
        locationAirport,
        price
      }
    })

    console.log(test);

    await browser.close();
})()

