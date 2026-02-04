import Loader from "../../../../Layout/Loader/Loader";
import usePeersSelections from "../../../../CustomHooks/usePeersSelections";
import PeriodSelector from "../../../../Components/Common/periodSelector/PeriodSelector";
import CustomDropdown from "../../../../Components/Common/customDropdown/CustomDropdown";
import PrintOptions from "../../../../Components/Common/printOptions/PrintOptions";
import useLang from "../../../../Utils/useLang";
import CustomTd from "../../../../Components/Common/customTd/CustomTd";
import {
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../../Utils/helpers";
import EmptyRow from "../../../../Components/Common/emptyRow/EmptyRow";
function Growth() {
  const tableHead = [
    { label: useLang("Company", "الشركة") },
    { label: useLang("Assets", "الأصول") },
    { label: useLang("Net Income", "صافي الدخل") },
    { label: useLang("Revenues", "الإيرادات") },
    { label: useLang("Book Value", "القيمة الدفترية") },
  ];
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
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("growth", customTabs);
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">
      <div className="row justify-content-between align-items-center row-gap-4 m-0 p-0">
        
        {/* period selector */}
        <div className="col-9 order-0 col-sm-4 order-sm-0 d-flex justify-content-start p-0">
          <PeriodSelector
            priodList={PeriodTabs}
            periodType={activeTab}
            setPeriodType={setActiveTab}
          />
        </div>

        {/* select year */}
        <div className="col-6 order-1 col-sm-3 order-sm-1 d-flex justify-content-start justify-content-xl-center p-0">
          <CustomDropdown
            label={useLang("year:", "سنة:")}
            list={allYears}
            choosenValue={choosedYear?.value}
            setChoosenValue={setChoosedYear}
          />
        </div>
        {activeTab == "quarter" && (
          <div className="col-6 order-1 col-sm-3 order-sm-2 d-flex justify-content-end justify-content-xl-center p-0">
            <CustomDropdown
              label={useLang("period:", "الفترة:")}
              list={quarters}
              choosenValue={activeQuarter?.label}
              setChoosenValue={setActiveQuarter}
            />
          </div>
        )}

        {/* print options */}
        <div className="col-3 order-0 col-sm-2 order-sm-3 d-flex justify-content-end p-0">
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
            {data?.Growth?.length > 0 ? (
              <>
                {data?.Growth?.map((item, idx) => (
                  <tr key={idx}>
                    <CustomTd
                      isCentered={false}
                      label={useLang(item?.shortNameEn, item?.shortNameAr)}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.assets),
                      }}
                      label={`${formatNumber(item?.assets || "-")} %`}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.netIncome),
                      }}
                      label={`${formatNumber(item?.netIncome || "-")} %`}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.revenue),
                      }}
                      label={`${formatNumber(item?.revenue || "-")} %`}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.bookValue),
                      }}
                      label={`${formatNumber(item?.bookValue || "-")} %`}
                    />
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

export default Growth;
