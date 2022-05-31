import React, { useEffect } from "react";
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

import { formatLabelDate, formatToolTipDate } from "./helpers";

const weather = {
  temperature_celsius: {
    symbol: "°C",
  },
  humidity_percent: {
    symbol: "%",
  },
  air_pressure: {
    symbol: "hPa",
  },
};

export default function Chart({ data, options }) {
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

  // Henter den som er True i options, for å vise den i grafen.
  const dataKeyDisplay = Object.keys(options)
    .filter((el) => options[el] === true)
    .join("");

  return (
    <ResponsiveContainer className="responsive" width="95%" height={300}>
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
          style={{ marginTop: "20px" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(d) => formatLabelDate(d)}
          dataKey="date"
          tickMargin={15}
        />
        <YAxis
          allowDecimals={true}
          tickMargin={15}
          tick={{ fill: "#fff" }}
          axisLine={false}
          tickFormatter={(value) =>
            `${value} ${dataKeyDisplay === "humidity_percent" ? "%" : ""}`
          }
          tickLine={false}
          tickCount={dataKeyDisplay == "air_pressure" ? 3 : 5}
          dataKey={dataKeyDisplay}
        />
        <CartesianGrid opacity={0.05} vertical={false} />
        <Tooltip content={<CustomTooltip type={dataKeyDisplay} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ payload, label, active, type }) {
  //format tooltip based on type
  const formatedValue = (type) => {
    let formatedLabel = "";
    switch (type) {
      case "temperature_celsius":
        formatedLabel = "Temperatur";
        return [`${payload[0].value}°C`, formatedLabel];
        break;
      case "humidity_percent":
        formatedLabel = "Luftfuktighet";
        return [`${payload[0].value}%`, formatedLabel];
        break;
      case "air_pressure":
        formatedLabel = "Lufttrykk";
        return [`${payload[0].value}hPa`, formatedLabel];
        break;
      default:
        return "";
        break;
    }
  };

  if (active) {
    return (
      <div className={`custom-tooltip ${type}-label`}>
        <p className="label-date">{`${formatToolTipDate(label)}`}</p>
        <p className="label">{`${formatedValue(type)[1]} : ${
          formatedValue(type)[0]
        }`}</p>
      </div>
    );
  }

  return null;
}
