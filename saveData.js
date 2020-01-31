const ObjectsToCsv = require('objects-to-csv');

const csv = (async (data, fileName) => {
  const flight = new ObjectsToCsv(data);
  await flight.toDisk(`./${fileName}.csv`);

  console.log('Data saved!');
});

module.exports = { csv };

