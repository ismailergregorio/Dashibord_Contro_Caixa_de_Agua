import "./style-medidor.css";
import React, { useEffect, useRef } from "react";
import HighchartsReact from "highcharts-react-official";

export default function Medidor({ titulo }) {
  const chartRef = useRef(null);

  const options = {
    chart: {
      type: "solidgauge",
      height: "260px",
      backgroundColor: "#064663",
      plotBackgroundColor: null, // fundo da área de plotagem
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: null,
    pane: {
      center: ["50%", "85%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
        backgroundColor: "#041C32",
      },
      labels: {
        style: {
          color: "#ECB365", // 👈 cor dos números do eixo
          fontSize: "12px", // tamanho da fonte
          fontWeight: "bold", // opcional: deixa em negrito
        },
      },
    },
    yAxis: {
      min: 0,
      max: 200,
      title: { text: "Velocidade" },
      stops: [
        [0.1, "#55BF3B"],
        [0.5, "#DDDF0D"],
        [0.9, "#DF5353"],
      ],
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },
    series: [
      {
        name: "Velocidade",
        data: [1],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:29px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">km/h</span>' +
            "</div>",
        },
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      console.log("Chart pronto:", chartRef.current.chart);
    }
  }, []);

  return (
    <div className="conteiner-medidor">
      <h1>{titulo} </h1>
      <div id="containerMedidor" className="medidor">
        <HighchartsReact
          highcharts={window.Highcharts}
          options={options}
          ref={chartRef}
          containerProps={{ id: "containerMedidor" }} // 👈 aqui você define o id da div
        />
      </div>
    </div>
  );
}
