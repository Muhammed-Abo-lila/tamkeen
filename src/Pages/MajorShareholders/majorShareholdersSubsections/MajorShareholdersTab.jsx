import CustomTd from "../../../Components/Common/customTd/CustomTd";
import useLang from "../../../Utils/useLang";
import { formatNumber } from "../../../Utils/helpers";
function MajorShareholdersTab({ majorData }) {
  const tableHead = [
    { label: useLang("Shareholder", "المالك") },
    { label: useLang("type", "النوع") },
    { label: useLang("number of Shares (M)", "عدد الأسهم (مليون)") },
    { label: useLang("holding", "نسبة الملكية") },
    { label: useLang("market value (M)", "القيمة السوقية (مليون)") },
  ];
  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover" style={{ minWidth: "700px" }}>
        <thead className="table-light">
          <tr>
            {tableHead.map((item, idx) => (
              <CustomTd
                key={idx}
                label={item.label}
                isCentered={idx === 0 ? false : true}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {majorData?.map((item, idx) => (
            <tr key={idx}>
              <CustomTd
                label={useLang(
                  item?.shareholderNameEn,
                  item?.shareholderNameAr
                )}
                isCentered={false}
              />
              <CustomTd
                label={useLang(
                  item?.shareholderTypeNameEn,
                  item?.shareholderTypeNameAr
                )}
              />
              <CustomTd label={formatNumber(item?.noOfShares)} />
              <CustomTd label={`${formatNumber(item?.percentage)} %`} />
              <CustomTd label={formatNumber(item?.marketValue)} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MajorShareholdersTab;
