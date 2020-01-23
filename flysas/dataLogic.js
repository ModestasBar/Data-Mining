const sortData = (rawData) => {
  const directFlightPrice = [];
  const connectFlightPrice = [];
  const cheapestDirectFlight = [];
  const cheapestConnectFlight = [];
  rawData.price.forEach((val, i) => {
    if (rawData.airports[i].includes('||') && rawData.airports[i].includes('Oslo')) {
      connectFlightPrice.push(val);
    } else if (!rawData.airports[i].includes('||')) {
      directFlightPrice.push(val);
    }
  });

  const cheapestDirect = Math.min(...directFlightPrice);
  const cheapestConnect = Math.min(...connectFlightPrice);

  rawData.price.forEach((val, i) => {
    if (rawData.airports[i].includes('||') && rawData.airports[i].includes('Oslo') && val === cheapestConnect) {
      cheapestConnectFlight.push({
        Price: val,
        Airports: rawData.airports[i],
        'Depart/Arrive': rawData.time[i],
      });
    } else if (!rawData.airports[i].includes('||') && val === cheapestDirect) {
      cheapestDirectFlight.push({
        Price: val,
        Airports: rawData.airports[i],
        'Depart/Arrive': rawData.time[i],
      });
    }
  });

  return {
    cheapestDirectFlight,
    cheapestConnectFlight,
  };
};

exports.sortData = sortData;
