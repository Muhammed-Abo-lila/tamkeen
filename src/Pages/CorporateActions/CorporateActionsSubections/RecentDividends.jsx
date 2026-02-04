import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import { formatDate, formatNumber } from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
function RecentDividends({recentDividendsData}) {
  const tableData = [
    {
      label: useLang("capital (Million Riyal)", "رأس المال (مليون ريال)"),
      value: formatNumber(recentDividendsData?.capital||"-"),
    },
    {
      label: useLang("shares (mn)", "عدد الأسهم (مليون)"),
      value: formatNumber(recentDividendsData?.numberOfShares),
    },
    {
      label: useLang("Cash Dividend", "توزيعات أرباح نقدية"),
      value: formatNumber(recentDividendsData?.cashDividend),
    },
    {
      label: useLang("Dividends/Capital (%)", "النسبة من رأس المال"),
      value: `${formatNumber(recentDividendsData?.dividendPercentage)} %`,
    },
    {
      label: useLang("type", "النوع"),
      value: useLang(
        recentDividendsData?.companyDividendStatusNameEn,
        recentDividendsData?.companyDividendStatusNameAr
      ),
    },
    {
      label: useLang("announcement", "تاريخ الإعلان"),
      value: formatDate(recentDividendsData?.dividendAnnouncedDate),
    },
    {
      label: useLang("due date", "تاريخ الأحقية"),
      value: formatDate(recentDividendsData?.dividendDueDate),
    },
    {
      label: useLang("payment", "تاريخ التوزيع"),
      value: formatDate(recentDividendsData?.dividendDate),
    },
    {
      label: useLang("notes", "ملاحظات"),
      value: useLang(
        recentDividendsData?.notesEn,
        recentDividendsData?.notesAr
      ),
    },
  ];
  return (
    <>
      <h2 className="section-title overview-sections-title">
        {useLang("recent dividends", "التغير في رأس المال")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      <div className="table-responsive">
        <table className="table table-hover">
          <tbody>
            {tableData?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  label={item?.label}
                  isCentered={false}
                  style={{ width: "45%" ,whiteSpace: "nowrap"}}
                />
                <CustomTd label={item?.value} isCentered={false} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentDividends;
