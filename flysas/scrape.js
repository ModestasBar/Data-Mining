const scrape = async (page, id, dateClass) => {
  const arrive = await page.evaluate((id, dateClass) => {
    const date = document.querySelector(`${dateClass} .list .selected .date`).innerHTML.trim();

    const airports = [...document.querySelectorAll(`${id} .container tbody`)]
      .map((val) => (val.childElementCount > 4
        ? `${val.childNodes[2].childNodes[5].innerText} || ${val.childNodes[8].childNodes[5].innerText}`.replace(/ +/g, '')
        : val.childNodes[2].childNodes[3].innerText.replace(/ +/g, '')));

    const time = [...document.querySelectorAll(`${id} .segmented > .time`)]
      .map((val) => val.innerText.trim());

    const price = [...document.querySelectorAll(`${id} .segmented .first .number`)]
      .map((val) => Number(val.innerHTML.trim().replace(',', '.')));

    return {
      date,
      price,
      time,
      airports,
    };
  }, id, dateClass);
  return arrive;
};

exports.scrape = scrape;
