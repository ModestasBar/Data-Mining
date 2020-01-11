// const dummy = [ 
// ' Friday 1. May 2020',
// '11:20',
// '13:50',
// '150.21',
// 'Oslo-Gardermoen',
// 'Riga',
// '19:20',
// '21:50',
// '65.70',
// 'Oslo-Gardermoen',
// 'Riga' ]

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

module.exports ;