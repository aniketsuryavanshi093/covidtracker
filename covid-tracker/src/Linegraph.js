import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("0.0a");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        tricks: {
          callback: function (value, index, values) {
            return numeral(values).format("0.0a");
          },
        },
      },
    ],
  },
};
const buildchartdata = (data, casestype = "cases") => {
    const chartdata = [];
    let lastdatepoint;
    for (let date in data.cases) {
      if (lastdatepoint) {
        const newdatapoint = {
          x: date,
          y: data[casestype][date] - lastdatepoint,
        };
        chartdata.push(newdatapoint);
      }
      lastdatepoint = data[casestype][date];
    }
    return chartdata;
  }
function Linegraph({casestype ="cases" , ...props}) {
  const [data, setdata] = useState({});
  
  useEffect(() => {
    const fetchdata = async ()=>{
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=200")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildchartdata(data , casestype);
          setdata(chartData);
          // console.log(chartData)
        });
    }
    fetchdata()
   
  } , [casestype]);

  return (
    <div className = {props.className}>
    
      {data?.length > 0 && (
        <Line
        data={{
          datasets: [
            {
              backgroundColor: "red",
              borderColor: "green",
              data: data,
            },
          ],
        }}
        options={options}
      ></Line>
      )}
      
    </div>
  );
}

export default Linegraph;
