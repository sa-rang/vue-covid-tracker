export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

// const casesTypeColors = {
//   cases: {
//     hex: "#CC1034",
//     multiplier: 800,
//   },
//   recoverd: {
//     hex: "#7dd71d",
//     multiplier: 1200,
//   },
//   deaths: {
//     hex: "#fb4443",
//     multiplier: 2000,
//   },
// };
// export const showDataOnMap = (data, casesType = "cases") =>
//   data.map((country) => (
//     <Circle
//       center={[country.countryInfo.lat, country.countryInfo.long]}
//       fillOpacity={0.4}
//       color={casesTypeColors[casesType].hex}
//       fillColor={casesTypeColors[casesType].hex}
//       radius={
//         Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
//       }
//     >
//       <Popup>im a popup</Popup>
//     </Circle>
//   ));
