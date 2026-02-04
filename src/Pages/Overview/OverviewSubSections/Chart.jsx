import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import Loader from "../../../Layout/Loader/Loader";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useLang from "../../../Utils/useLang";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
// handle access of heighCharts
HighchartsMore(Highcharts);

function Chart() {
  // get ticker Chart Data
  const { data, isLoading } = useRequest(
    [APIS?.CHART_TICKER?.KEY],
    APIS?.CHART_TICKER?.URL
  );
  // Loading Handler
  if (isLoading) return <Loader />;
  // chart Options
  const options = {
    chart: { height: 400, zoomType: "x" },
    accessibility: { enabled: false },
    credits: { enabled: false },
    stockTools: { gui: { enabled: false } },

    // Gredient colors
    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, Highcharts.getOptions().colors[4]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[4])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
    },

    series: [
      {
        data:
          data?.data?.map((item) => [
            item.x, // timestamp
            item.open,
            item.high,
            item.low,
            item.close,
          ]) || [],
        name: data?.data[0]?.name,
        type: "areaspline",
        threshold: null,
        turboThreshold: 2400,
        color: Highcharts.getOptions().colors[4],
      },
    ],
    // Tooltip formatting
    tooltip: {
      padding: 15,
      valueDecimals: 2,
      style: {},
      formatter: function () {
        const formattedDate = Highcharts.dateFormat(" %e %B %Y", this.x);
        return formattedDate + "<br />" + `  ` + this.y;
      },
    },
  };

  return (
    <div className="border border-top-0 ">
      <h2 className="section-title overview-sections-title">
        {useLang("chart ticker", "شريط الرسم البياني")}
      </h2>
      <CustomHr style="m-2 mb-0"/>
      <HighchartsReact
        constructorType="stockChart"
        highcharts={Highcharts}
        options={options}
      />
      <MoreBtn
        path="/share-performance/chart"
        title={useLang("more", "المزيد")}
      />
    </div>
  );
}

export default Chart;
