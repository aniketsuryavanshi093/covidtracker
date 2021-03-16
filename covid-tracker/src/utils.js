import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
// import { green, red } from "@material-ui/core/colors";
const casesTypeColors = {
  cases: {
    rgb: "rgb(204, 16, 52)",
    multiplier: 800,
  },
  recovered: {
    rgb: "rgb(125, 215, 29)",
    multiplier: 1200,
  },
  deaths: {
    rgb: "rgb(251, 68, 67)",
    multiplier: 2000,
  },
};
const sortdata = (data) => {
  const sorteddata = [...data];

  sorteddata.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sorteddata;
};
// export const showdataonmap = (data, casestype = "cases") => {
//   console.log(data)
//   data.map((country) => {
//     return( <Circle
//       fillOpacity={0.4}
//       color={casesTypeColors[casestype].hex}
//       radius={
//         Math.sqrt(country[casestype]) * casesTypeColors[casestype].multiplier
//       }
//       center={[country.countryInfo.lat, country.countryInfo.long]}
//     >
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Circle>)
   
//   });
// };
export const prettyprint = (stat)=>{
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0"
}
export const showDataOnMap = (data, casesType = "cases") =>
  
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      // color={casesTypeColors[casesType].hex}
      pathOptions={{color: casesTypeColors[casesType].rgb,
        fillColor: casesTypeColors[casesType].rgb }}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
export default sortdata;
