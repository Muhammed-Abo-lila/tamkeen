import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
HighchartsAccessibility(Highcharts);
const ChartModal = ({ chartValues }) => {
  const chartOptions = {
    accessibility: {
      enabled: false,
    },
    chart: {
      type: "column",
      backgroundColor: "transparent",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },

    title: null,

    xAxis: {
      categories: chartValues?.years,
      labels: {
        skew3d: true,
        style: {
          fontSize: "12px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    plotOptions: {
      column: {
        depth: 25,
      },
    },
    tooltip: {
      pointFormatter: function () {
        return `<span style="color:${this.color}">\u25CF</span> ${
          this.series.name
        }: <b>${Highcharts.numberFormat(this.y, 2)}</b><br/>`;
      },
    },
    series: [
      {
        name: chartValues?.title,
        color: "var(--main-color)",
        data: chartValues?.values.map((val) => ({
          y: val,
          color:
            val > 0
              ? "var(--main-color)"
              : val < 0
              ? "var(--danger-color)"
              : "var(--warn-color)",
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <div
      className="modal fade modal-md"
      id="chartModal"
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
};

export default ChartModal;
