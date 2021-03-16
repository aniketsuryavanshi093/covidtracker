import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox.js";
import {prettyprint} from "./utils"
import Map from "./Map";
import Table from "./Table";
import sortdata from "./utils";
import Linegraph from "./Linegraph";
import "leaflet/dist/leaflet.css";
// https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setcountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [country, setcountry] = useState("worldwide");
  const [countryinfo, setcountryinfo] = useState([]);
  const [tabledata, settabledata] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([])
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setcountryinfo(data));
  }, []);

  useEffect(() => {
    const getcountry = async () => {
      // await fetch("https://disease.sh/v3/covid-19/countries")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     const countryie = data.map((country) => ({
      //       name: country.country,
      //       value: country.countryInfo.iso2,
      //     }
      //     ));
      //     setcountries(countryie);

      //   });
      const resopnse = await fetch("https://disease.sh/v3/covid-19/countries");
      const result = await resopnse.json();
      console.log(result)

      const sorteddata = sortdata(result);
      setcountries(sorteddata);
      setmapCountries(result)
      settabledata(sorteddata);
    };
    getcountry();
  }, []);
  const oncountrychange = async (event) => {
    const countryCode = event.target.value;
    // setcountry(countryCode)
    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setcountry(countryCode);
        setcountryinfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/Albania?strict=true
  };
  return (
    <div className="App">
      <div className="app_left">
        <div className="add_header">
          <h1>Aniket COVID 19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={oncountrychange}
            >
              <MenuItem value="worldwide">Worldwide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country?.countryInfo.iso3}>
                  {country?.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
          onClick = {(e) => setCasesType('cases')}
            title="COVID active Cases"
          active = {casesType === "cases"}


            cases={prettyprint(countryinfo?.todayCases) }
            total={prettyprint(countryinfo?.cases)}
          ></InfoBox>
          <InfoBox
          className ="infoboxisgreen"

           onClick = {(e) => setCasesType('recovered')}
           active = {casesType === "recovered"}
            title="Recovered"
            isgreen
            cases={prettyprint(countryinfo?.todayRecovered)}
            total={prettyprint(countryinfo?.cases)}
          ></InfoBox>

          <InfoBox
          

           onClick = {(e) => setCasesType('deaths')}
           active = {casesType === "deaths"}
            title="Death"
            cases={prettyprint(countryinfo?.todayDeaths)}
            total={prettyprint(countryinfo?.cases)}
          ></InfoBox>
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter}
          zoom={mapZoom}></Map>
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By country</h3>
          {/* table */}
          <Table countries={tabledata}></Table>
          <h3>Worldwide new {casesType}</h3>
          <Linegraph  className = "app_graph" casestype = {casesType}></Linegraph>

          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
