import React, { useState, useEffect } from 'react';
import Loader from "../loader/loader";

const DataList = () => {
  const [weatherData, refreshWeatherData ] = useWeatherData();

  if(weatherData === null){
    return <Loader/>
  }

  const elements = weatherData.map((item) => {
    const {...weatherData} = item;
    return (
      <tr key = { item.weatherId }>
        <td>{item.year}</td>
        <td>{item.month}</td>
        <td>{item.tMax}</td>
        <td>{item.tMin}</td>
        <td>{item.sunH}</td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={refreshWeatherData}>
      </button>
      <table className="table head-table-style">
        <thead>
          <tr>
            <th>Years</th>
            <th>Month</th>
            <th>t max</th>
            <th>t min</th>
            <th>Sun hours</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </table>
    </div>
  )
};

function useWeatherData() {
  const [weatherData, setWeatherData] = useState([]);

  function splitString(stringToSplit) {
    // state weatherData
    const separator = '\n';
    const arrayOfStrings = stringToSplit.split(separator);

    // state weather
    let weatherList = [];
    for(let i=0; i < arrayOfStrings.length; i++){
      if(arrayOfStrings[i] !== undefined){
        const arrayLine = arrayOfStrings[i];
        const trimBksp = arrayLine.trim();
        const separator = ' ';
        const arraySplit = trimBksp.split(separator);
        const result = arraySplit.filter(word => word.length > 0);

        if(result[0] > 1989) {
          const newItem = {
            weatherId: i,
            year: result[0],
            month: result[1],
            tMax: Math.round(parseFloat(result[2])),
            tMin: Math.round(parseFloat(result[3])),
            sunH: Math.round(parseFloat(result[6]))
          };
          weatherList.push(newItem);
        }
      }
    }
    return weatherList;
  }

  function refresh() {
      setWeatherData(null);
      fetch('https://mowd-bouncer.now.sh/api/bounce?city=bradford')
          .then(res => res.text()).then(splitString).then(setWeatherData);
  }

  useEffect(refresh, []);

  return [weatherData, refresh];
};

export default DataList;
