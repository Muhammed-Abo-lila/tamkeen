import { useState } from "react";
import CurrencyBtn from "../../../Components/Common/CurrencyBtn/CurrencyBtn";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import Loader from "../../../Layout/Loader/Loader";
import {
  changeCurrencyFromRiyalToDollar,
  colorAndBgColorDependOnNumber,
  exportToExcel,
  formatDate,
  formatNumber,
} from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import PrintOptions from "../../../Components/Common/printOptions/PrintOptions";
import CustomDropdown from "../../../Components/Common/customDropdown/CustomDropdown";
import ChartModal from "../../../Components/Common/ChartModal/ChartModal";
function FinancialStatement() {
  // create useState to set and get currency activeTab
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
  const { data: finincialStatement, isLoading } = useRequest(
    [`${APIS?.FINANCIAL_STATEMENT?.KEY},${activeTab?.tab}`],
    `${APIS?.FINANCIAL_STATEMENT?.URL}${
      activeTab?.tab == "annual" ? "year" : activeTab?.tab
    }`
  );

  // function to sorting and slicing array depend on forYears and fiscalPeriodValueID keys
  const sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID = (
    array
  ) => {
    const sortedAndSlicedArray = array?.sort((oldest, newst) => {
      if (oldest.forYear !== newst.forYear) {
        return newst.forYear - oldest.forYear;
      }
      return newst.fiscalPeriodValueID - oldest.fiscalPeriodValueID;
    });
    return sortedAndSlicedArray.slice(0, 5);
  };

  // get last five years
  const lastFiveYears = [
    ...new Map(
      finincialStatement?.tabs
        .flatMap((tab) => tab.fields)
        .flatMap((field) =>
          sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
            field.values
          )
        )
        .map((item) => [`${item.forYear}-${item.fiscalPeriodValueID}`, item])
    ).values(),
  ];
  // function to get chart data
  const getChartValues = (field) => {
    setChartValues({
      years: sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
        field?.values
      )?.map((value) => value?.fiscalPeriod),
      values: sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
        field?.values
      ).map((value) =>
        choosenCurrency?.value === "sar"
          ? value?.value
          : changeCurrencyFromRiyalToDollar(value?.value)
      ),
      title: useLang(field?.displayNameEn, field?.displayNameAr),
    });
  };

  // export to excel
  const handleExportToExcel = async () => {
    const formData = {
      languageId: useLang(2, 1),
      fromYear: lastFiveYears[lastFiveYears.length - 1].forYear,
      toYear: lastFiveYears[0].forYear,
      isYearly: activeTab?.tab == "annual",
      isQuarterly: activeTab?.tab == "quarter",
      isInterm: false,
      currencyId: choosenCurrency.value == "sar" ? 3 : 10,
    };
    const fileName = `financial-statement-${activeTab?.tab == "annual"?"yearly":"quarterly"}-${
      lastFiveYears[lastFiveYears.length - 1].forYear
    }-${lastFiveYears[0].forYear}-${useLang("en", "ar")}-${
      choosenCurrency.value
    }.xlsx`;
    await exportToExcel("get-company-financial-statement", formData, fileName);
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
                <CustomTd key={idx} label={activeTab?.tab==="quarter"?formatDate(item?.forDate):item?.forDate} />
              ))}
            </tr>
          </thead>

          {finincialStatement?.tabs?.map((tab, tabIdx) => (
            <tbody key={tabIdx} className="accordion" id="accordionExample">
              <tr className="accordion-item">
                <td colSpan={7} className="p-0 m-0">
                  <button
                    className={`accordion-button rounded sticky-left py-2 px-2 custom-fs-5 fw-semibold ${
                      tabIdx === 0 ? "show" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne` + tabIdx}
                    aria-expanded="false"
                    aria-controls={`collapseOne` + tabIdx}
                  >
                    <span className="m-0 p-0">
                      {useLang(tab?.tabNameEn, tab?.tabNameAr)}
                    </span>
                  </button>
                </td>
              </tr>

              {tab?.fields?.map((field, fieldIdx) => (
                <tr
                  key={fieldIdx}
                  id={"collapseOne" + tabIdx}
                  className={
                    tabIdx === 0
                      ? "accordion-collapse collapse show position-relative"
                      : "accordion-collapse collapse"
                  }
                  data-bs-parent="#accordionFlushExample"
                >
                  <CustomTd
                    label={useLang(field?.displayNameEn, field?.displayNameAr)}
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
                      onClick={() => getChartValues(field)}
                    />
                  </CustomTd>

                  {sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
                    field?.values
                  )?.map((item, valueIdx) => (
                    <CustomTd
                      key={valueIdx}
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.value),
                      }}
                      label={formatNumber(
                        choosenCurrency.value === "sar"
                          ? item?.value||"-"
                          : changeCurrencyFromRiyalToDollar(item?.value)||"-"
                      )}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
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

export default FinancialStatement;
