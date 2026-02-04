// get Tickerchart Data from its custom Hook
import APIS from "../../../../services/APIS";
import useRequest from "../../../../Utils/useRequest";

// Loader Component
import Loader from "../../../../Layout/Loader/Loader";

// Importing HeighCharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Exporting from "highcharts/modules/exporting";
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";

// handle access of heighCharts
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);
Exporting(Highcharts);
function TickerChart() {
  // get ticker Chart Data

  const { data, isLoading } = useRequest(
    [APIS?.SHARE_PERFORMANCE_CHART?.KEY],
    APIS?.SHARE_PERFORMANCE_CHART?.URL
  );

  // Chart Options
  const options = {
    chart: {
      height: 400,
      zoomType: "x",
    },
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "candlestick",
        id: "ticker-ohlc",
        color: "var(--main-color)",
        name: "Ticker OHLC",
        data:
          data?.data?.map((item) => [
            item.x,
            item.open,
            item.high,
            item.low,
            item.close,
          ]) || [],
        yAxis: 0,
      },
      {
        type: "column",
        id: "ticker-volume",
        name: "Ticker Volume",
        color: "var(--main-color)",
        data: data?.data?.map((item) => [item.x, item.volume]) || [],
        yAxis: 1,
      },
    ],
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    yAxis: [
      {
        labels: {
          align: "left",
        },
        height: "60%",
        resize: {
          enabled: true,
        },
        crosshair: true,
        gridLineWidth: 0,
      },
      {
        labels: {
          align: "left",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        crosshair: true,
        gridLineWidth: 0,
      },
    ],
    // Change Colors of CandleSticks
    plotOptions: {
      candlestick: {
        color: "var(--main-color)",
        lineColor: "darkblue",
        upColor: "lightgreen",
        upLineColor: "darkgreen",
      },
    },

    // The Stook tools bar
    stockTools: { gui: { enabled: true } },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
        },
      ],
    },

    // The navigator Color
    // navigator: {
    //   maskFill: "#4ca58451",
    // },
    // Hide The Zoom Section
    rangeSelector: {
      selected: 1,
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          align: "right",
          verticalAlign: "top",
          x: 0,
          y: 0,
          symbolStroke: "#000",
          theme: {
            fill: "transparent",
            states: {
              hover: {
                fill: "transparent",
              },
              select: {
                fill: "transparent",
              },
            },
          },
        },
      },
    },
  };
  if (isLoading) return <Loader />;
  return (
    <HighchartsReact
      constructorType="stockChart"
      highcharts={Highcharts}
      options={options}
      chartType
    />
  );
}

export default TickerChart;
