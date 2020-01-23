const steps = async (page) => {
  // Select airports
  await page.type('#predictiveSearchFrom .predictiveSearchBox', 'ARN', { delay: 200 });
  await page.type('#predictiveSearchTo .predictiveSearchBox', 'Heathrow', { delay: 200 });

  await page.waitForSelector('#resultTo .selected');

  // Depart date
  await page.click('.flOutDate'),
  await page.click('.ui-icon-circle-triangle-e'),
  await page.click('.ui-icon-circle-triangle-e'),
  await page.click('.ui-icon-circle-triangle-e'),
  await page.click('.ui-icon-circle-triangle-e'),
  await page.click('.ui-datepicker-calendar tr:nth-child(2) td:nth-child(5)'),

  // Return date
  await page.click('.flInDate');
  await page.click('.ui-datepicker-calendar tr:nth-child(3) td:nth-child(5)');

  await page.waitFor(1000);
  await page.click('.cepBody .bluebutton .buttonBody');

  await page.waitForSelector('.flight.segmented .first', { visible: true, timeout: 0 });
};

exports.steps = steps;
