import { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineLocationOn } from "react-icons/md";
import rowData from "./data.js";

import Chart from "./Chart.jsx";

function App() {
  const [options, setOptions] = useState({
    temperature_celsius: true,
    humidity_percent: false,
    air_pressure: false,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([...rowData]);
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

    //sette andre options til false og sette den valgte til true
    // Hvis den valgte option er allerede true, behold den
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

  return (
    <div className="App">
      <header>
        <h1>
          DIAGRAM SOM VISER <span className="bold">VÆROBSERVASJONER I MAI</span>
        </h1>
      </header>
      <main className="dashboard">
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
            <div className="date">Mai 2022</div>
          </div>
        </div>
        <div className="highest-record">
          Høyest målt: <span className="bold">100</span>
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

// function getHighestRecorded() {
//   let highestTemp = 0;
//   let highestHum = 0;
//   let highestAir = 0;
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].temperature_celsius > highestTemp) {
//       highestTemp = data[i].temperature_celsius;
//     }
//     if (data[i].air_pressure > highestAir) {
//       highestAir = data[i].temperature_celsius;
//     }
//     if (data[i].humidity_percent > highestHum) {
//       highestHum = data[i].temperature_celsius;
//     }
//   }
//   return highestTemp;
// }
