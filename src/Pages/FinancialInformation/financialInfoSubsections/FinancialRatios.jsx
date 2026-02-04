import { useState } from "react";
import CurrencyBtn from "../../../Components/Common/CurrencyBtn/CurrencyBtn";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import Loader from "../../../Layout/Loader/Loader";
import {
  changeCurrencyFromRiyalToDollar,
  colorAndBgColorDependOnNumber,
  exportToExcel,
  formatNumber,
} from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import PrintOptions from "../../../Components/Common/printOptions/PrintOptions";
import CustomDropdown from "../../../Components/Common/customDropdown/CustomDropdown";
import ChartModal from "../../../Components/Common/ChartModal/ChartModal";
function FinancialRatios() {
  const [choosenCurrency, setChoosenCurrency] = useState({
    value: "sar",
    label: useLang("Riyal", "ريال"),
  });

  const [chartValues, setChartValues] = useState({
    years: [],
    values: [],
    title: "",
  });

  const [activeTab, setActiveTab] = useState({
    label: useLang("annual", "سنوي"),
    tab: "annual",
  });

  const customTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
  ];

  // get financial statements data from useRequest depend on activeTab
  const { data: finincialRatios, isLoading } = useRequest(
    [`${APIS?.FINANCIAL_RATIOS?.KEY},${activeTab?.tab}`],
    `${APIS?.FINANCIAL_RATIOS?.URL}${
      activeTab?.tab == "annual" ? "year" : activeTab?.tab
    }`
  );

  // function to sorting and slicing array depend on forYears and fiscalPeriodValueID keys
  const sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID = (
    array
  ) => {
    const sortedAndSlicedArray = array?.slice().sort((a, b) => {
      const yearA = Number(a.year);
      const yearB = Number(b.year);
      if (yearA !== yearB) {
        return yearB - yearA;
      }
      const dateA = new Date(a.period.split("/").reverse().join("-"));
      const dateB = new Date(b.period.split("/").reverse().join("-"));
      return dateB - dateA;
    });

    return sortedAndSlicedArray.slice(0, 5);
  };

  // get last five years
  const lastFiveYears = [
    ...new Map(
      finincialRatios?.financialRatioFieldsGroups
        .flatMap((fieldsGroup) => fieldsGroup.financialRatioFieldsGroupFields)
        .flatMap((group) =>
          sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
            group.values
          )
        )
        .map((item) => [`${item.year}-${item.period}`, item])
    ).values(),
  ];
  // function to get chart data
  const getChartValues = (group) => {
    setChartValues({
      years: sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
        group?.values
      )?.map((value) =>
        value?.fiscalPeriodType === "Quarter" ? value?.period : value?.year
      ),
      values: sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
        group?.values
      ).map((value) =>
        choosenCurrency?.value === "sar"
          ? Number(value?.value)
          : changeCurrencyFromRiyalToDollar(value?.value)
      ),
      title: useLang(group?.nameEn, group?.nameAr),
    });
  };
  // export to excel
  const handleExportToExcel = async () => {
    const formData = {
      languageId: useLang(2, 1),
      fromYear: lastFiveYears[lastFiveYears.length - 1].year,
      toYear: lastFiveYears[0].year,
      isYearly: activeTab?.tab == "annual",
      isQuarterly: activeTab?.tab == "quarter",
      isInterm: false,
      currencyId: choosenCurrency.value == "sar" ? 3 : 10,
    };
    const fileName = `financial-ratios-${
      activeTab?.tab == "annual" ? "yearly" : "quarterly"
    }-${lastFiveYears[lastFiveYears.length - 1].year}-${
      lastFiveYears[0].year
    }-${useLang("en", "ar")}-${choosenCurrency.value}.xlsx`;
    await exportToExcel("get-company-financial-ratios", formData, fileName);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* Currency Buttons */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <CurrencyBtn
          activeCurrency={choosenCurrency}
          setActiveCurrency={setChoosenCurrency}
        />
        <div className="d-flex justify-content-between align-items-center">
          <CustomDropdown
            list={customTabs}
            choosenValue={activeTab?.label}
            setChoosenValue={setActiveTab}
          />
          <PrintOptions onClick={handleExportToExcel} />
        </div>
      </div>
      {/* Body */}
      <div
        className="accordion accordion-flush global-accordion table-container table-responsive print-table-wrapper"
        id="accordionFlushExample"
      >
        <table className=" table" style={{ minWidth: "900px" }}>
          <thead className="table-light">
            <tr>
              <CustomTd
                label={useLang("details", "التفاصيل")}
                isCentered={false}
              />
              <CustomTd label={useLang("Chart", "تشارت")} />
              {lastFiveYears?.map((item, idx) => (
                <CustomTd
                  key={idx}
                  label={
                    item?.fiscalPeriodType === "Quarter"
                      ? item?.period
                      : item?.year
                  }
                />
              ))}
            </tr>
          </thead>

          {finincialRatios?.financialRatioFieldsGroups?.map(
            (fieldsGroup, fieldsGroupIdx) => (
              <tbody
                key={fieldsGroupIdx}
                className="accordion"
                id="accordionExample"
              >
                <tr className="accordion-item">
                  <td colSpan={7} className="p-0 m-0">
                    <button
                      className={`accordion-button rounded sticky-left py-2 px-2 custom-fs-5 fw-semibold ${
                        fieldsGroupIdx === 0 ? "show" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne` + fieldsGroupIdx}
                      aria-expanded="false"
                      aria-controls={`collapseOne` + fieldsGroupIdx}
                    >
                      <span className="m-0 p-0">
                        {useLang(
                          fieldsGroup?.fieldGroupEn,
                          fieldsGroup?.fieldGroupAr
                        )}
                      </span>
                    </button>
                  </td>
                </tr>

                {fieldsGroup?.financialRatioFieldsGroupFields?.map(
                  (group, groupIdx) => (
                    <tr
                      key={groupIdx}
                      id={"collapseOne" + fieldsGroupIdx}
                      className={
                        fieldsGroupIdx === 0
                          ? "accordion-collapse collapse show position-relative"
                          : "accordion-collapse collapse"
                      }
                      data-bs-parent="#accordionFlushExample"
                    >
                      <CustomTd
                        label={useLang(group?.nameEn, group?.nameAr)}
                        isCentered={false}
                        style={{ maxWidth: "200px" }}
                      />

                      <CustomTd>
                        <i
                          className="mx-2 bi bi-bar-chart-fill"
                          style={{ color: "var(--main-color)" }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#chartModal"
                          onClick={() => getChartValues(group)}
                        />
                      </CustomTd>

                      {sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
                        group?.values
                      )?.map((value, valueIdx) => (
                        <CustomTd
                          key={valueIdx}
                          style={{
                            color: colorAndBgColorDependOnNumber(value?.value),
                          }}
                          label={formatNumber(
                            choosenCurrency.value === "sar"
                              ? value?.value
                              : changeCurrencyFromRiyalToDollar(value?.value)
                          )}
                        />
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            )
          )}
        </table>
      </div>

      <p className="mt-3 custom-fs-5">
        {useLang(
          "Figures are normalized — the number of shares has been adjusted to ensure comparability across years.",
          "تم توحيد الأرقام - تم تعديل عدد الأسهم لضمان إمكانية المقارنة عبر السنوات."
        )}
      </p>

      <ChartModal chartValues={chartValues} />
    </div>
  );
}

export default FinancialRatios;
