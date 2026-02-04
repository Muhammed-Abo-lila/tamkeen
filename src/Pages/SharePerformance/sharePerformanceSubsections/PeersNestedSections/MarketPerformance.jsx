import CurrencyBtn from "../../../../Components/Common/CurrencyBtn/CurrencyBtn";
import CustomDropdown from "../../../../Components/Common/customDropdown/CustomDropdown";
import CustomTd from "../../../../Components/Common/customTd/CustomTd";
import EmptyRow from "../../../../Components/Common/emptyRow/EmptyRow";
import PeriodSelector from "../../../../Components/Common/periodSelector/PeriodSelector";
import PrintOptions from "../../../../Components/Common/printOptions/PrintOptions";
import usePeersSelections from "../../../../CustomHooks/usePeersSelections";
import Loader from "../../../../Layout/Loader/Loader";
import { changeCurrencyFromRiyalToDollar, colorAndBgColorDependOnNumber, formatNumber } from "../../../../Utils/helpers";
import useLang from "../../../../Utils/useLang";
function MarketPerformance() {
  const tableHead = [
    { label: useLang("Company", "الشركة") },
    { label: useLang("Market Cap M", "القيمة السوقية (مليون)") },
    { label: useLang("Month", "شهر") },
    { label: useLang("3 Months", "3 أشهر") },
    { label: useLang("6 Months", "6 أشهر") },
    { label: useLang("12 Months", "12 شهرا") },
    { label: useLang("YTD", "التغير من بداية السنة") },
    { label: useLang("P/E (TTM)", "مكرر الأرباح (اخر12)") },
    { label: useLang("Price/Book", "مضاعف القيمة الدفترية") },
    { label: useLang("Dividend Yield", "عائد التوزيع النقدي") },
  ];

  const {
    PeriodTabs,
    activeTab,
    setActiveTab,
    allYears,
    setChoosedYear,
    choosedYear,
    quarters,
    setActiveQuarter,
    activeQuarter,
    interims,
    setActiveInterim,
    activeInterim,
    choosenCurrency,
    setChoosenCurrency,
    isCurrent,
    setIsCurrent,
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("marketPerformance");
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">
      <div className="row justify-content-between align-items-center row-gap-4 me-0">
        {/* period selector */}
        <div className="col-9 order-0 col-sm-6 order-sm-0 col-xl-4 d-flex justify-content-start">
          <PeriodSelector
            priodList={PeriodTabs}
            periodType={activeTab}
            setPeriodType={setActiveTab}
          />
        </div>

        {/* check box */}
        <div className="col-3 order-2 col-xl-1 order-xl-1 d-flex justify-content-start justify-content-xl-center">
          <div className="peers-check-box form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={isCurrent}
              onChange={() => setIsCurrent(!isCurrent)}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor="flexCheckDefault"
            >
              {useLang("current", "الحالي")}
            </label>
          </div>
        </div>

        {/* select year */}
        <div className="col-4 order-3 col-xl-2 order-xl-1 p-0 d-flex justify-content-end justify-content-xl-center">
          <CustomDropdown
            label={useLang("year:", "سنة:")}
            list={allYears}
            choosenValue={choosedYear?.value}
            setChoosenValue={setChoosedYear}
          />
        </div>
        {activeTab == "quarter" && (
          <div className="col-4 order-3 col-xl-2 order-xl-1 p-0  d-flex justify-content-end justify-content-xl-center">
            <CustomDropdown
              label={useLang("period:", "الفترة:")}
              list={quarters}
              choosenValue={activeQuarter?.label}
              setChoosenValue={setActiveQuarter}
            />
          </div>
        )}
        {activeTab == "interim" && (
          <div className="col-4 order-3 col-xl-2 order-xl-1 p-0 d-flex justify-content-end justify-content-xl-center">
            <CustomDropdown
              label={useLang("period:", "الفترة:")}
              list={interims}
              choosenValue={activeInterim?.label}
              setChoosenValue={setActiveInterim}
            />
          </div>
        )}
        {/* CurrencyBtn */}
        <div className="col-12 order-4 col-sm-4 col-xl-2 order-sm-0 order-xl-3 d-flex justify-content-end justify-content-sm-center justify-content-xl-center p-0">
          <CurrencyBtn
            activeCurrency={choosenCurrency}
            setActiveCurrency={setChoosenCurrency}
          />
        </div>
        {/* print options */}
        <div className="col-3 order-1 col-sm-2 col-xl-1 order-sm-1 order-xl-4 d-flex justify-content-end">
          <PrintOptions onClick={handleExportToExcel} />
        </div>
      </div>

      <div className="table-responsive mt-3 print-table-wrapper">
        <table className="table table-hover" style={{ minWidth: "900px" }}>
          <thead className="table-light" style={{ verticalAlign: "middle" }}>
            <tr>
              {tableHead?.map((item, idx) => (
                <CustomTd key={idx} label={item?.label} isCentered={idx != 0} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.MarketPerformance?.length > 0 ? (
              <>
                {data?.MarketPerformance?.map((item, idx) => (
                  <tr key={idx}>
                    <CustomTd
                      isCentered={false}
                      label={useLang(item?.shortNameEn, item?.shortNameAr)}
                    />
                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.marketValue),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.marketValue:changeCurrencyFromRiyalToDollar(item?.marketValue) || "-")} />
                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.month1Change),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.month1Change:changeCurrencyFromRiyalToDollar(item?.month1Change) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.month3Change),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.month3Change:changeCurrencyFromRiyalToDollar(item?.month3Change) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.month6Change),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.month6Change:changeCurrencyFromRiyalToDollar(item?.month6Change) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.month12Change),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.month12Change:changeCurrencyFromRiyalToDollar(item?.month12Change) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.ytdChange),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.ytdChange:changeCurrencyFromRiyalToDollar(item?.ytdChange) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.priceEarnings),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.priceEarnings:changeCurrencyFromRiyalToDollar(item?.priceEarnings) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.pricePerBook),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.pricePerBook:changeCurrencyFromRiyalToDollar(item?.pricePerBook) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.dividendYield),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.dividendYield:changeCurrencyFromRiyalToDollar(item?.dividendYield) || "-")} />
                  </tr>
                ))}
              </>
            ) : (
              <EmptyRow colSpan={6} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketPerformance;
