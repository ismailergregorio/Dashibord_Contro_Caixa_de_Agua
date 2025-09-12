import "./style-grafico.css";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Grafico({ titulo }) {
  const options = {
    colors: ["#3CC3DF", "#8979FF", "#FF928A"], // ordem das séries
    chart: {
      // width: 600, // largura em pixels
      height: 150, // altura em pixels
      type: "areaspline",
      backgroundColor: "transparent", // fundo transparente
    },
    title: {
      text: null,
    },

    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      x: 120,
      y: 70,
      floating: true,
      borderWidth: 1,
      backgroundColor: "var(--highcharts-background-color, #fff)",
    },
    xAxis: {
      gridLineWidth: 1.5, // espessura
      gridLineColor: "rgba(255, 255, 255, 0.1)", // cor da linha horizontal
      fillOpacity: 0.6,
      gridLineDashStyle: "ShortDash", // estilo pontilhado

      tickColor: "rgba(255, 255, 255, 0.1)",
      tickWidth: 1,

      lineColor: "rgba(255, 255, 255, 0.8)",
      lineWidth: 0.5,

      plotBands: [{}],
      labels: {
        style: {
          color: "#fff",
          fillOpacity: 0.6,
        },
      },
    },
    yAxis: {
      gridLineWidth: 1.5, // espessura
      gridLineColor: "rgba(255, 255, 255, 0.1)", // cor da linha horizontal
      gridLineDashStyle: "ShortDash", // estilo pontilhado

      tickColor: "rgba(255, 255, 255, 0.1)",
      tickWidth: 1,
      title: {
        text: "Quantity",
        style: {
          color: "#fff",
          fillOpacity: 0.6,
        },
      },
      labels: {
        style: {
          color: "#fff",
          fillOpacity: 0.6,
        },
      },
    },
    tooltip: {
      shared: true,
      headerFormat: "<b>Hunting season starting autumn {point.x}</b><br>",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointStart: 2000,
      },
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Moose",
        data: [63, 20, 58, 90, 10, 5, 80, 90, 80, 50],
        marker: {
          enabled: true, // habilita os pontos
          radius: 4, // tamanho do ponto
          symbol: "circle", // formato: 'circle', 'square', 'diamond', 'triangle', 'triangle-down'
          fillColor: "rgba(10,10,10, 2)", // cor interna
          lineWidth: 2, // borda
          lineColor: "rgba(60, 195, 223, 5)", // cor da borda
        },
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // vertical
          stops: [
            [0, "rgba(60, 195, 223, 10)"], // cor topo
            [1, "rgba(60, 195, 223, 0.0)"], // cor base
          ],
        },
        fillOpacity: 0.5,
      },
      {
        name: "Deer",
        data: [45, 10, 30, 59, 90, 70, 76, 36, 48, 40],
        marker: {
          enabled: true, // habilita os pontos
          radius: 4, // tamanho do ponto
          symbol: "circle", // formato: 'circle', 'square', 'diamond', 'triangle', 'triangle-down'
          fillColor: "rgba(10,10,10, 2)", // cor interna
          lineWidth: 2, // borda
          lineColor: "rgba(137,121, 255, 10)", // cor da borda
        },
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // vertical
          stops: [
            [0, "rgba(137,121, 255, 5)"], // cor topo
            [1, "rgba(137,121, 255, 0)"], // cor base
          ],
        },
        fillOpacity: 0.5,
      },
    ],
  };

  return (
    <div className="grafico">
      <h1 className="titulo_grafico">{titulo}</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
