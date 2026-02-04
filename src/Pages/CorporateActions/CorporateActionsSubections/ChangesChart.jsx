import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import useLang from "../../../Utils/useLang";
HighchartsAccessibility(Highcharts);
function ChangesChart({ chartData, type }) {
  const data = chartData
    ?.sort((oldest, newst) => newst?.FinancialYear - oldest?.FinancialYear)
    .slice(type === "capital" ? 1 : 0, 6);
  const options = {
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
      reversed: useLang(false, true),
      title: { text: null },
      categories: data?.map((item) => item.FinancialYear),
      labels: {
        skew3d: true,
        style: { fontSize: "13px" },
      },
    },
    yAxis: {
      title: { text: null },
    },
    plotOptions: {
      column: { depth: 25 },
      series: { showInLegend: false },
    },
    tooltip: {
      formatter: function () {
        const year = this.key;
        return `<b>${year}</b>: ${this.y.toFixed(2)}`;
      },
    },
    series: [
      {
        data:
          data?.map((item) => ({
            y: type === "capital" ? item?.Capital : item?.CashDividendPerShare,
            color:
              (type === "capital"
                ? item?.Capital
                : item?.CashDividendPerShare) > 0
                ? "var(--main-color)"
                : "var(--fail-color)",
          })) || [],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="col-12 col-md-6 col-xl-6 overflow-hidden">
      <h2 className="section-title overview-sections-title">
        {type === "capital"
          ? useLang("capital changes", "تطور رأس المال")
          : useLang("historical changes", "تطور التوزيعات النقدية")}
      </h2>
      <hr />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default ChangesChart;
