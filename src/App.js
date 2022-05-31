import { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineLocationOn } from "react-icons/md";
import rowData from "./data.js";

import Chart from "./Chart.jsx";
import { formatLabelDate, formatToolTipDate } from "./helpers";
const weather = {
  temperatur: {
    symbol: "°C",
  },
  luftfuktighet: {
    symbol: "%",
  },
  lufttrykk: {
    symbol: "hPa",
  },
};

function App() {
  // initialize the chart data
  const [options, setOptions] = useState({
    temperature_celsius: true,
    humidity_percent: false,
    air_pressure: false,
  });

  const [data, setData] = useState([]);
  const [currentMode, setCurrentMode] = useState("temperatur");
  const [highestRecorded, setHighestRecorded] = useState(getHighestRecorded());

  useEffect(() => {
    setData([...rowData]);
    setHighestRecorded(getHighestRecorded());
  }, []);

  function handleOptionChange(e) {
    e.preventDefault();

    //sette knappen til active
    e.target.classList.add("btn-active");

    let name = e.target.textContent.toLowerCase();

    //fjerne andre knapper som er active
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      if (btn.textContent.toLowerCase() !== name) {
        btn.classList.remove("btn-active");
      }
    });

    //setter currentMode til det valgte
    const dashbaord = document.querySelector(".dashboard");
    setCurrentMode(name);

    switch (name) {
      case "temperatur":
        name = "temperature_celsius";
        break;
      case "luftfuktighet":
        name = "humidity_percent";
        break;
      case "lufttrykk":
        name = "air_pressure";
        break;
      default:
        name = "temperature_celsius";
        break;
    }

    //setter andre options til false og den valgte til true
    // Hvis den valgte option er allerede true, beholder den
    let newOptions = { ...options };
    for (let key in newOptions) {
      if (key !== name) {
        newOptions[key] = false;
      } else if (key === name && options[key] === true) {
        newOptions[key] = true;
      } else {
        newOptions[key] = true;
      }
    }

    setOptions({
      ...newOptions,
    });
  }

  // get the highest recorded values and their dates
  function getHighestRecorded() {
    let highestTemp = 0;
    let highestTempDay = "";
    let highestHumidityDay = "";
    let highestAirPressureDay = "";
    let highestHum = 0;
    let highestAir = 0;
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i].temperature_celsius > highestTemp) {
        highestTempDay = formatLabelDate(rowData[i].date);
        highestTemp = rowData[i].temperature_celsius;
      }
      if (rowData[i].air_pressure > highestAir) {
        highestAirPressureDay = formatLabelDate(rowData[i].date);
        highestAir = rowData[i].air_pressure;
      }
      if (rowData[i].humidity_percent > highestHum) {
        highestHumidityDay = formatLabelDate(rowData[i].date);
        highestHum = rowData[i].humidity_percent;
      }
    }
    return {
      temperatur: {
        day: highestTempDay,
        value: highestTemp,
      },
      luftfuktighet: {
        day: highestHumidityDay,
        value: highestHum,
      },
      lufttrykk: {
        day: highestAirPressureDay,
        value: highestAir,
      },
    };
  }

  return (
    <div className="App">
      <header>
        <h1>
          VÆROBSERVASJONER I<span className="bold"> NORDSJØEN I MAI 2022</span>
        </h1>
      </header>
      <main className={"dashboard" + " " + `dashbaord-${currentMode}`}>
        <div className="dashboard-header">
          <form>
            <button
              onClick={handleOptionChange}
              className="btn btn-primary btn-active"
            >
              Temperatur
            </button>
            <button onClick={handleOptionChange} className="btn btn-primary">
              Luftfuktighet
            </button>
            <button onClick={handleOptionChange} className="btn btn-primary">
              lufttrykk
            </button>
          </form>

          <div className="location">
            <div className="location-place">
              <MdOutlineLocationOn /> <span>Nordsjøen</span>
            </div>
          </div>
        </div>
        <div className="highest-recorded">
          Høyest {currentMode} målt <span className="bold">:</span>
          {"  "}{" "}
          <span className="border-bottom  bold">
            {highestRecorded[currentMode]["value"]}{" "}
            {weather[currentMode].symbol}
          </span>
          <span className="thin">
            på {highestRecorded[currentMode].day.split(" ")[0]}. Mai
          </span>
        </div>

        <div className="dashboard-chart">
          <Chart data={data} options={options} />
        </div>
      </main>
      <footer>
        Design og utvikling av <span className="bold">Mascuud</span>
      </footer>
    </div>
  );
}

export default App;
