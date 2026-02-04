import { useState } from "react";
import NestedNavs from "../../../Components/Common/nestedNavs/NestedNavs";
import useLang from "../../../Utils/useLang";
import RangeDatePicker from "../../../Components/Common/rangeDatePicker/RangeDatePicker";
import { formatDate, formatNumber } from "../../../Utils/helpers";
import useRequest from "../../../Utils/useRequest";
import APIS from "../../../services/APIS";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Loader from "../../../Layout/Loader/Loader";
function InvestmentCalculator() {
  const [activeTab, setActiveTab] = useState("amount");
  const [investmentAmountAndSharesValue, setInvestmentAmountAndSharesValue] =
    useState(0);
  const [apiUrl, setApiUrl] = useState(null);
  const [chartActiveTab, setChartActiveTab] = useState("cumulative");
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;
  const chartTabs = [
    {
      label: useLang("cumulative change", "التغير التراكمي"),
      tab: "cumulative",
    },
    {
      label: useLang("periodic change", "التغير الدوري"),
      tab: "periodic",
    },
  ];
  const tabs = [
    {
      label: useLang("by amount invested", "تنزيل سعر السهم"),
      tab: "amount",
    },
    {
      label: useLang("by shares bought", "محفوظات سعر السهم"),
      tab: "shares",
    },
  ];
  // function to get api url
  const getApiUrl = () => {
    if (investmentAmountAndSharesValue > 0) {
      if (activeTab == "amount") {
        setApiUrl(
          `/${investmentAmountAndSharesValue}/0/${formatDate(
            startDate,
            "yearFirst"
          )}/${formatDate(endDate, "yearFirst")}`
        );
      } else if (activeTab == "shares") {
        setApiUrl(
          `/0/${investmentAmountAndSharesValue}/${formatDate(
            startDate,
            "yearFirst"
          )}/${formatDate(endDate, "yearFirst")}`
        );
      }
    }
  };
  const { data: invesmentData, isLoading: dataLoading } = useRequest(
    [APIS.INVESMENT_CALCULATOR.KEY, apiUrl],
    `${APIS.INVESMENT_CALCULATOR.URL}${apiUrl}/false`,
    { enabled: !!apiUrl }
  );
  const { data: invesmentChartData, isLoading: invesmentChartLoading } =
    useRequest(
      [
        `${APIS.INVESMENT_CALCULATOR_CHART.KEY},${invesmentData?.amountInvested},${chartActiveTab}`,
      ],
      `${APIS.INVESMENT_CALCULATOR_CHART.URL}/${
        chartActiveTab == "cumulative"
          ? "investment-calculator-chart-data"
          : "investment-calculator-chart-data-periodic"
      }/${investmentAmountAndSharesValue}/${
        invesmentData?.sharesBought
      }/${formatDate(startDate, "yearFirst")}/${formatDate(
        endDate,
        "yearFirst"
      )}/false`,
      { enabled: invesmentData?.sharesBought > 0 }
    );
  const changeTableTab = (tab) => {
    if (activeTab != tab) {
      setInvestmentAmountAndSharesValue(0);
      setDateRange([]);
      setApiUrl(null);
      setActiveTab(tab);
    }
  };

  const options = {
    accessibility: {
      enabled: false,
    },
    chart: {
      type: chartActiveTab == "cumulative" ? "area" : "column",
      height: 350,
      backgroundColor: "transparent",
      borderRadius: 0,
      zoomType: "x",
      panning: true,
      panKey: "shift",
      animation: {
        duration: 500,
      },
    },
    title: null,
    xAxis: {
      title: {
        text: null,
      },
      type: "datetime",
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: 0,
        y: 25,
        align: "center",
        format: "{value:%b %e, %Y}",
      },
      crosshair: {
        width: 1,
        color: "#E0E0E0",
        dashStyle: "Dash",
      },
    },

    yAxis: {
      max:
        invesmentChartData?.length > 0 &&
        Math.max(...invesmentChartData?.map((item) => item.sharesValue)),
      min:
        chartActiveTab === "cumulative"
          ? invesmentChartData?.length > 0 &&
            Math.min(...invesmentChartData?.map((item) => item.sharesValue))
          : 0,

      minRange: 25,
      title: null,
      lineWidth: 0,
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: useLang(0, -20),
        y: 0 - 1,
        align: useLang("right", "left"),
      },
      opposite: useLang(false, true),
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [],
        },
        lineColor: "#374c5f",
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: "#374c5f",
              radius: 3,
            },
          },
        },
      },
      column: {
        color: "#374c5f",
        shadow: false,
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      xDateFormat: "%b %e,%Y",
      formatter: function () {
        const date = Highcharts.dateFormat("%b %e,%Y", this.x);
        return `<b>${date}</b><br/>
                <b>${this.y.toFixed(2)}</b>`;
      },
    },
    series: [
      {
        name: "Cumulative",
        data:
          invesmentChartData?.map((data) => ({
            y: data?.sharesValue,
            x: data?.forDate ? new Date(data.forDate).getTime() : null,
          })) || [],
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            chart: {
              height: 350,
            },
            xAxis: {
              labels: {
                rotation: -45,
              },
            },
          },
        },
      ],
    },
  };
  return (
    <div className="investment-calculator mt-3">
      <div>
        <div className="d-flex gap-3 text-capitalize bg-light">
          <NestedNavs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={changeTableTab}
          />
        </div>

        <div className="mb-3 p-3 bg-light d-flex justify-content-between align-items-end flex-wrap">
          <div>
            <p className="mb-2 text-capitalize">
              {useLang(
                "start end date of investment",
                "تاريخ البدايه والنهايه"
              )}
              :
            </p>
            <RangeDatePicker
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
            />
          </div>

          <div>
            <p className="mb-2 text-capitalize">
              {activeTab === "amount"
                ? useLang("amount invested", "المبلغ المستثمر")
                : useLang("number of shares invested", "عدد الأسهم المستثمرة")}
              :
            </p>
            <input
              type="text"
              className="form-control"
              value={investmentAmountAndSharesValue}
              onChange={(e) =>
                setInvestmentAmountAndSharesValue(e.target.value)
              }
            />
          </div>

          <div
            className="rounded p-1 m-2 show-results-btn text-capitalize custom-fs-6 px-2"
            onClick={() => getApiUrl()}
            style={{
              pointerEvents:
                !startDate || !endDate || !investmentAmountAndSharesValue
                  ? "none"
                  : undefined,
              opacity:
                !startDate || !endDate || !investmentAmountAndSharesValue
                  ? ".5"
                  : "1",
            }}
          >
            {useLang("show results", "إظهار النتائج")}
          </div>
        </div>

        <div
          className="row row-gap-3 text-capitalize m-0 justify-content-between position-relative"
          style={{ minHeight: "300px" }}
        >
          {!dataLoading ? (
            <>
              <div className="col-12 col-md-6 col-xxl-5">
                <div className="mb-3 pb-2 border-bottom d-flex align-items-center gap-2 custom-fs-3 fw-bold">
                  <h3
                    className="mb-0  custom-fs-3 fw-bold"
                    style={{ color: "var(--main-color)" }}
                  >
                    {useLang("initial investment", "الإستثمار الأولي")}
                  </h3>
                  {invesmentData && startDate && (
                    <time
                      dateTime={invesmentData?.investmentDate}
                      className="date custom-fs-6"
                    >
                      (
                      {formatDate(
                        invesmentData?.investmentDate || startDate,
                        "DD-MM-YYYY"
                      )}
                      )
                    </time>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value", "القيمه السوقية")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.amountInvested)
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("share price", "سعر السهم")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.initialSharePrice)
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("shares bought", "الأسهم المشتراة")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.sharesBought)
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-xxl-5">
                <div className="mb-3 pb-2 border-bottom d-flex align-items-center gap-2 custom-fs-3 fw-bold">
                  <h3
                    className="mb-0 custom-fs-3 fw-bold"
                    style={{ color: "var(--main-color)" }}
                  >
                    {useLang("end value", "القيمه النهائيه")}
                  </h3>
                  {invesmentData && endDate && (
                    <time className="date custom-fs-6">
                      (
                      {formatDate(
                        invesmentData?.endsDate || endDate,
                        "DD-MM-YYYY"
                      )}
                      )
                    </time>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value", "القيمه السوقية")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.currentStanding)
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("share price", "سعر السهم")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.endsSharePrice)
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("change (SAR)", "التغير (ريال)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.changeAmount)
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("change (%)", "التغير (%)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? `${formatNumber(
                          invesmentData?.changeAmountPercentage
                        )} %`
                      : "-"}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center custom-fs-5 mb-2 pb-2 border-bottom">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("annualizes change (%)", "معدل التغير سنوياً (%)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? `${formatNumber(
                          invesmentData?.changeAnnualizePercentage
                        )} %`
                      : "-"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <div>
        <NestedNavs
          tabs={chartTabs}
          activeTab={chartActiveTab}
          setActiveTab={setChartActiveTab}
        />
        <div className="mt-3 position-relative" style={{ minHeight: "250px" }}>
          {!invesmentChartLoading ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentCalculator;
