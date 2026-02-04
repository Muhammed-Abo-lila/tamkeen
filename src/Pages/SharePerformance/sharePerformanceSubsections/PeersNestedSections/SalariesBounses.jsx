import React from "react";
import CurrencyBtn from "../../../../Components/Common/CurrencyBtn/CurrencyBtn";
import CustomDropdown from "../../../../Components/Common/customDropdown/CustomDropdown";
import PeriodSelector from "../../../../Components/Common/periodSelector/PeriodSelector";
import PrintOptions from "../../../../Components/Common/printOptions/PrintOptions";
import usePeersSelections from "../../../../CustomHooks/usePeersSelections";
import Loader from "../../../../Layout/Loader/Loader";
import useLang from "../../../../Utils/useLang";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../../Utils/helpers";
import CustomTd from "../../../../Components/Common/customTd/CustomTd";
function SalariesBounses() {
  const customTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
  ];
  const {
    PeriodTabs,
    activeTab,
    setActiveTab,
    allYears,
    setChoosedYear,
    choosedYear,
    choosenCurrency,
    setChoosenCurrency,
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("salariesandbonuses", customTabs);
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">
      <div className="row justify-content-between align-items-center row-gap-4 m-0 p-0">

        {/* period selector */}
        <div className="col-9 order-0 col-sm-3 order-sm-0 d-flex justify-content-start p-0">
          <PeriodSelector
            priodList={PeriodTabs}
            periodType={activeTab}
            setPeriodType={setActiveTab}
          />
        </div>

        {/* select year */}
        <div className="col-6 order-1 col-sm-3 order-sm-1 d-flex justify-content-start  p-0">
          <CustomDropdown
            label={useLang("year:", "سنة:")}
            list={allYears}
            choosenValue={choosedYear?.value}
            setChoosenValue={setChoosedYear}
          />
        </div>

        {/* CurrencyBtn */}
        <div className="col-6 order-1 col-sm-3 order-sm-2 d-flex justify-content-end justify-content-xl-center p-0">
          <CurrencyBtn
            activeCurrency={choosenCurrency}
            setActiveCurrency={setChoosenCurrency}
          />
        </div>

        {/* print options */}
        <div className="col-3 order-0 col-sm-2 order-sm-3 d-flex justify-content-end p-0 print-table-wrapper">
          <PrintOptions onClick={handleExportToExcel} />
        </div>

      </div>

      <div className="table-responsive mt-3 ">
        <table
          className="table table-hover  border"
          style={{ minWidth: "1000px" }}
        >
          <thead
            className="table-light text-capitalize"
            style={{ verticalAlign: "middle" }}
          >
            <tr style={{ height: "35px" }}>
              <td rowSpan={2} className="border">
                <span className="ps-2 text-capitalize">
                  {useLang("company", "الشركة")}
                </span>
              </td>
              <td colSpan={4} className="text-center border">
                <span className="ps-2 text-capitalize">
                  {useLang("board", "مكافأت مجلس الإدارة")}
                </span>
              </td>
              <td colSpan={4} className="text-center border">
                {useLang("excutives", "مكافأت كبار التنفيذيين")}
              </td>
              <td
                rowSpan={3}
                className="text-center border"
                style={{ fontWeight: "700" }}
              >
                {useLang("total", "الإجمالي")}
              </td>
            </tr>

            <tr style={{ height: "35px" }}>
              {[1, 2].map((item) => (
                <React.Fragment key={item}>
                  <td className="text-center border">
                    {useLang("salaries", "الرواتب")}
                  </td>
                  <td className="text-center border">
                    {useLang("bouns", "المكافأت")}
                  </td>
                  <td className="text-center border">
                    {useLang("others", "آخرى")}
                  </td>
                  <td
                    className="text-center border"
                    style={{ fontWeight: "700" }}
                  >
                    {useLang("total", "الإجمالي")}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.SalariesAndBonuses?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  isCentered={false}
                  label={useLang(item?.shortNameEn, item?.shortNameAr)}
                />

                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.boardMemberSalaries || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.boardMemberSalaries
                        ) || "-"
                  )}
                />
                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.boardMemberBonus || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.boardMemberBonus
                        ) || "-"
                  )}
                />
                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.boardMemberOther || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.boardMemberOther
                        ) || "-"
                  )}
                />
                <CustomTd
                  style={{ fontWeight: "700", backgroundColor: "#f8f9fa" }}
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.boardMemberSalariesTotal || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.boardMemberSalariesTotal
                        ) || "-"
                  )}
                />

                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.executiveSalaries || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.executiveSalaries
                        ) || "-"
                  )}
                />
                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.executiveBonus || "-"
                      : changeCurrencyFromRiyalToDollar(item?.executiveBonus) ||
                          "-"
                  )}
                />
                <CustomTd
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.executiveOther || "-"
                      : changeCurrencyFromRiyalToDollar(item?.executiveOther) ||
                          "-"
                  )}
                />
                <CustomTd
                  style={{ fontWeight: "700", backgroundColor: "#f8f9fa" }}
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.executiveSalariesTotal || "-"
                      : changeCurrencyFromRiyalToDollar(
                          item?.executiveSalariesTotal
                        ) || "-"
                  )}
                />

                <CustomTd
                  style={{ fontWeight: "700" }}
                  label={formatNumber(
                    choosenCurrency?.value === "sar"
                      ? item?.total || "-"
                      : changeCurrencyFromRiyalToDollar(item?.total) || "-"
                  )}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalariesBounses;
