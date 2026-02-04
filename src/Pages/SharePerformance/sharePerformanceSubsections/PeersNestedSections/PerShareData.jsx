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
function PerShareData() {
  const tableHead = [
  { label: useLang("Company", "الشركة") },
  { label: useLang("Book Value", "القيمة الدفترية") },
  { label: useLang("EPS", "العائد على السهم") },
  { label: useLang("Cash dividend per share (SAR)", "التوزيع النقدي للسهم (SAR)") },
  { label: useLang("Dividends", "توزيعات أرباح") },
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
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("persharedata");
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">

      <div className="row justify-content-between align-items-center row-gap-4 m-0 p-0">
        {/* period selector */}
        <div className="col-9 order-0 col-xl-4 d-flex justify-content-start p-0">
          <PeriodSelector
            priodList={PeriodTabs}
            periodType={activeTab}
            setPeriodType={setActiveTab}
          />
        </div>

        {/* select year */}
        <div className="col-6 col-sm-4 order-1 col-xl-2 order-xl-1 d-flex justify-content-start justify-content-xl-center p-0">
          <CustomDropdown
            label={useLang("year:", "سنة:")}
            list={allYears}
            choosenValue={choosedYear?.value}
            setChoosenValue={setChoosedYear}
          />
        </div>
        {activeTab == "quarter" && (
          <div className="col-6 col-sm-4 order-1 col-xl-2 order-xl-1 d-flex justify-content-end justify-content-xl-center p-0">
            <CustomDropdown
              label={useLang("period:", "الفترة:")}
              list={quarters}
              choosenValue={activeQuarter?.label}
              setChoosenValue={setActiveQuarter}
            />
          </div>
        )}
        {activeTab == "interim" && (
          <div className="col-6 col-sm-4 order-1 col-xl-2 order-xl-1 d-flex justify-content-end justify-content-xl-center p-0">
            <CustomDropdown
              label={useLang("period:", "الفترة:")}
              list={interims}
              choosenValue={activeInterim?.label}
              setChoosenValue={setActiveInterim}
            />
          </div>
        )}
        {/* CurrencyBtn */}
        <div className="col-12 col-sm-4 order-1 col-xl-2 order-xl-3 d-flex justify-content-end align-items-center p-0">
          <CurrencyBtn
            activeCurrency={choosenCurrency}
            setActiveCurrency={setChoosenCurrency}
          />
        </div>
        {/* print options */}
        <div className="col-3 order-0 col-xl-1 order-xl-4 d-flex justify-content-end p-0">
          <PrintOptions onClick={handleExportToExcel} />
        </div>
      </div>

      <div className="table-responsive mt-3 print-table-wrapper">
        <table className="table table-hover" style={{ minWidth: "600px" }}>
          <thead className="table-light" style={{ verticalAlign: "middle" }}>
            <tr>
              {tableHead?.map((item, idx) => (
                <CustomTd key={idx} label={item?.label} isCentered={idx != 0} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.PerShareData?.length > 0 ? (
              <>
                {data?.PerShareData?.map((item, idx) => (
                  <tr key={idx}>
                    <CustomTd
                      isCentered={false}
                      label={useLang(item?.shortNameEn, item?.shortNameAr)}
                    />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.bookValue),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.bookValue||"-":changeCurrencyFromRiyalToDollar(item?.bookValue) || "-")} />
                      
                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.earningsPerShare),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.earningsPerShare||"-":changeCurrencyFromRiyalToDollar(item?.earningsPerShare) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.cashOperationPerShare),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.cashOperationPerShare||"-":changeCurrencyFromRiyalToDollar(item?.cashOperationPerShare) || "-")} />

                    <CustomTd
                      style={{
                          color: colorAndBgColorDependOnNumber(item?.dividends),
                        }}
                      label={formatNumber(choosenCurrency?.value==="sar"?item?.dividends||"-":changeCurrencyFromRiyalToDollar(item?.dividends) || "-")} />

                  </tr>
                ))}
              </>
            ) : (
              <EmptyRow colSpan={5} />
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default PerShareData;
