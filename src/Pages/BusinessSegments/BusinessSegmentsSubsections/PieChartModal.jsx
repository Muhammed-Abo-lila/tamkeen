import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
HighchartsAccessibility(Highcharts);
function PieChartModal({ chartValues }) {
  const chartOptions = {
    accessibility: {
      enabled: false,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: null,

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format:
            '<span style="font-size:12px"><b>{point.name}</b></span><br>' +
            '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
          connectorColor: "rgba(128,128,128,0.5)",
        },
      },
    },

    tooltip: {
      pointFormat: "<b>share</b>: {point.percentage:.1f}%",
      valueDecimals: 2,
    },

    series: [
      {
        name: "share",
        data: chartValues?.map((item) => ({
          name: item.label,
          y: item.value,
        })),
      },
    ],

    credits: {
      enabled: false,
    },
  };
  return (
    <div className="modal fade modal-md"
      id="pieModal"
      tabIndex="-1"
      aria-labelledby="chartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChartModal;
