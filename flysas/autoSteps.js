const steps = async (page) => {
  // Select airports
  await page.type('#predictiveSearchFrom .predictiveSearchBox', 'ARN', { delay: 100 });
  await page.type('#predictiveSearchTo .predictiveSearchBox', 'Heathrow', { delay: 100 });

  await page.waitForSelector('#resultTo .selected');

  // Depart date
  await page.click('.flOutDate'),
    await page.click('.ui-icon-circle-triangle-e'),
    await page.click('.ui-icon-circle-triangle-e'),
    await page.click('.ui-icon-circle-triangle-e'),
    await page.click('.ui-icon-circle-triangle-e'),
    await page.click('.ui-datepicker-calendar tr:nth-child(2) td:nth-child(5)'),
    console.log('Getting page...');
  // Return date
  await page.click('.flInDate');
  await page.click('.ui-datepicker-calendar tr:nth-child(3) td:nth-child(5)');

  await page.waitFor(1000);
  await page.click('.cepBody .bluebutton .buttonBody');
  console.log('Almost there...');
  await page.waitForSelector('.flight.segmented .first', { visible: true, timeout: 0 });
  console.log('Done...');
};

exports.steps = steps;