import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function Chart({ data, options }) {
  console.log(data);
  const colors = {
    temperature_celsius: {
      fill: "E94560",
      stroke: "E94560",
    },
    humidity_percent: {
      fill: "00A8CC",
      stroke: "46B5D1",
    },
    air_pressure: {
      fill: "5C7AEA",
      stroke: "639CD9",
    },
  };

  const dataKeyDisplay = Object.keys(options)
    .filter((el) => options[el] === true)
    .join("");

  function formatLabelDate(date) {
    const weekDays = [
      "Søndag",
      "Mandag",
      "Tirsdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lørdag",
    ];

    const monthNames = [
      "Januar",
      "Februar",
      "Mars",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const dateDay = dateObj.getDay();
    const year = dateObj.getFullYear();
    return ` ${day} ${monthNames[month]}`;
  }

  return (
    <ResponsiveContainer className="responsive" width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={`#${colors[dataKeyDisplay].fill}`}
              stopOpacity={0.4}
            />
            <stop
              offset="75%"
              stopColor={`#${colors[dataKeyDisplay].fill}`}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <Area
          stroke={`#${colors[dataKeyDisplay].stroke}`}
          dataKey={dataKeyDisplay}
          fill="url(#colorUv)"
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(d) => formatLabelDate(d)}
          dataKey="date"
          // tick={{ fill: "#ffffff" }}
        />
        <YAxis
          tick={{ fill: "#fff" }}
          axisLine={false}
          tickFormatter={(value) =>
            `${value} ${dataKeyDisplay === "humidity_percent" ? "%" : ""} `
          }
          tickLine={false}
          tickCount={7}
          dataKey={dataKeyDisplay}
        />
        <CartesianGrid opacity={0.05} vertical={false} />
        <Tooltip
          formatter={(f) => console.log("---" + f)}
          content={<CustomTooltip type={dataKeyDisplay} />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ payload, label, active, type }) {
  // switch (payload[0].dataKey) {
  //   case "temperature_celsius":
  //     payload[0].dataKey = "Temperatur";
  //     break;
  //   case "humidity_percent":
  //     payload[0].dataKey = "Luftfuktighet";
  //     break;
  //   case "air_pressure":
  //     payload[0].dataKey = "Lufttrykk";
  //     break;
  //   default:
  //     break;
  // }
  if (active) {
    return (
      <div className={`custom-tooltip ${type}-label`}>
        <p className="label-date">{`${label}`}</p>
        <p className="label">{`${payload[0].dataKey} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}
