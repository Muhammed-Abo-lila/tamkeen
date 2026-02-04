// React Hooks
import { useEffect, useState } from "react";
// Currency Btns
import CurrencyBtn from "../../../Components/Common/CurrencyBtn/CurrencyBtn";
// add Formats & styles to Numbers
import {
  changeCurrencyFromRiyalToDollar,
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../Utils/helpers";
import { t } from "i18next";
// Icons
import useLang from "../../../Utils/useLang";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import ChartModal from "../../../Components/Common/ChartModal/ChartModal";
function FinancialHighlights({ data }) {
  const [activeCurrency, setActiveCurrency] = useState({
    value: "sar",
    label: useLang("Riyal", "ريال"),
  });
  const [years, setYears] = useState([]);
  const [chartValues, setChartValues] = useState({
    years: [],
    values: [],
    title: "",
  });
  // useEffect to get last 5 years
  useEffect(() => {
    const mapedYears = data?.flatMap((item) =>
      Object.keys(item).filter((key) => /^\d{4}$/.test(key))
    );
    const years = new Set(mapedYears);
    const arrayOfYears = Array.from(years);
    setYears(
      arrayOfYears.sort((oldest, newest) => newest - oldest).slice(0, 5)
    );
  }, [data]);
  // get chart values
  const getChartValues = (item) => {
    const yearsValues = years.map((year) =>
      activeCurrency?.value == "sar"
        ? item[year]
        : changeCurrencyFromRiyalToDollar(item[year])
    );
    const sortedAndSlicedValues = yearsValues.slice(0, 5);
    setChartValues({
      years: years,
      values: sortedAndSlicedValues,
      title: useLang(item?.DisplayNameEn, item?.DisplayNameAr),
    });
  };
  return (
    <div className="mt-5">
      <div className="d-flex flex-wrap row-gap-2 justify-content-between align-items-center">
        <h2 className="section-title p-0">
          <span className="text-capitalize">
            {useLang("financials highlights", "ملخص النتائج المالية")}
          </span>
          <span className="text-uppercase">
            &#40;{useLang("m", "مليون")} {t(`globals.${activeCurrency?.value}`)}
            &#41;
          </span>
        </h2>

        <div className={`${useLang("ms-auto", " me-auto")}`}>
          <CurrencyBtn
            activeCurrency={activeCurrency}
            setActiveCurrency={setActiveCurrency}
          />
        </div>
      </div>
      <CustomHr style="m-0 my-1" />

      <div className="my-3 ">
        <div className="table-responsive bg-body rounded my-3">
          <table
            className="table table-hover custom-fs-6"
            style={{ minWidth: "650px" }}
          >
            <thead className="table-light">
              <tr className="text-capitalize">
                <CustomTd
                  isCentered={false}
                  label={useLang("description", "البيان")}
                />
                <CustomTd label={useLang("chart", "تشارت")} />
                {years?.map((year, idx) => (
                  <CustomTd key={idx} label={year} />
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <CustomTd
                    isCentered={false}
                    label={useLang(item?.DisplayNameEn, item?.DisplayNameAr)}
                  />

                  <CustomTd>
                    <i
                      className="mx-2 bi bi-bar-chart-fill"
                      style={{color:"var(--main-color)"}}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#chartModal"
                      onClick={() => getChartValues(item)}
                    />
                  </CustomTd>
                  {years?.map((year) => (
                    <CustomTd
                      key={year}
                      style={{
                        color: colorAndBgColorDependOnNumber(
                          formatNumber(item[`${year}`])
                        ),
                      }}
                      label={formatNumber(
                        activeCurrency?.value == "sar"
                          ? item[year]
                          : changeCurrencyFromRiyalToDollar(item[year])
                      )}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Chart */}
      <ChartModal chartValues={chartValues} />
    </div>
  );
}

export default FinancialHighlights;
