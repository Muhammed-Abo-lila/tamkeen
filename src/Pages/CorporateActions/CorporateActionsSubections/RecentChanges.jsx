import CustomTd from "../../../Components/Common/customTd/CustomTd";
import CustomHr from "../../../Components/Common/customHr/CustomHr"
import useLang from "../../../Utils/useLang";
import { formatNumber, formatDate } from "../../../Utils/helpers";

function RecentChanges({recentChangesData}) {
// This component is ready to run as soon as the capital changes key updates and returns new data
  const tableData = [
    {
      label: useLang("capital (Million Riyal)", "رأس المال (مليون ريال)"),
      value: formatNumber(recentChangesData?.capital),
    },
    {
      label: useLang("shares (mn)", "عدد الأسهم (مليون)"),
      value: formatNumber(recentChangesData?.numberOfShares),
    },
    {
      label: useLang("Dividends/Capital (%)", "النسبة من رأس المال"),
      value: `${formatNumber(recentChangesData?.dividendPercentage)} %`,
    },
    {
      label: useLang("Cash Dividend", "توزيعات أرباح نقدية"),
      value: `${formatNumber(recentChangesData?.cashDividend)} ${
        useLang(
          `${recentChangesData?.measuringUnitNameEn} ${recentChangesData?.currencyNameEn}`,
          `${recentChangesData?.measuringUnitNameAr} ${recentChangesData?.currencyNameAr}`
        )
      }`,
    },
    {
      label: useLang("type", "النوع"),
      value: useLang(
        recentChangesData?.companyDividendStatusNameEn,
        recentChangesData?.companyDividendStatusNameAr
      ),
    },
    {
      label: useLang("announcement", "تاريخ الإعلان"),
      value: formatDate(recentChangesData?.dividendAnnouncedDate),
    },
    {
      label: useLang("due date", "تاريخ الأحقية"),
      value: formatDate(recentChangesData?.dividendDueDate),
    },
    {
      label: useLang("payment", "تاريخ التوزيع"),
      value: formatDate(recentChangesData?.dividendDate),
    },
    {
      label: useLang("notes", "ملاحظات"),
      value: useLang(recentChangesData?.notesEn, recentChangesData?.notesAr),
    },
  ];

  return (
    <>
      <h2 className="section-title overview-sections-title">
        {useLang("recent changes", "أحدث التوزيعات النقدية")}
      </h2>

      <CustomHr style="m-2 mb-0" />

      <div className="table-responsive">
        <table className="table table-hover fs-14">
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <CustomTd
                  label={row.label}
                  isCentered={false}
                  style={{ width: "45%", whiteSpace: "nowrap" }}
                />
                <CustomTd label={row.value} isCentered={false} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentChanges;
