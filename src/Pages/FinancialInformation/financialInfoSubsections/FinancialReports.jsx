import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import Loader from "../../../Layout/Loader/Loader";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import useLang from "../../../Utils/useLang";
import CustomTdWithPdf from "../../../Components/Common/customTdWithPdf/CustomTdWithPdf";
function FinancialReports() {
  const { data: financialReportsData, isLoading } = useRequest(
    [APIS?.FINANCIAL_REPORTS?.KEY],
    APIS?.FINANCIAL_REPORTS?.URL
  );
  const tableHead = [
    { label: useLang("year", "السنة") },
    { label: useLang("q1", "الربع الأول") },
    { label: useLang("q2", "الربع الثاني") },
    { label: useLang("q3", "الربع الثالث") },
    { label: useLang("q4", "الربع الرابع") },
    { label: useLang("annual", "السنوي") },
    { label: useLang("board report", "تقرير مجلس الإدارة") },
  ];
  if (isLoading) return <Loader />;
  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover" style={{ minWidth: "900px" }}>
        <thead className="table-light">
          <tr>
            {tableHead.map((item, idx) => (
              <CustomTd key={idx} label={item.label} isCentered={idx !== 0} />
            ))}
          </tr>
        </thead>
        <tbody>
          {financialReportsData?.financialResults?.map((item, idx) => {
            return (
              <tr key={idx}>
                <CustomTd label={item.year} isCentered={false} />

                <CustomTdWithPdf
                  {...(item?.q1en ? { fileEn: item.q1en } : {})}
                  {...(item?.q1ar ? { fileAr: item.q1ar } : {})}
                />

                <CustomTdWithPdf
                  {...(item?.q2en ? { fileEn: item.q2en } : {})}
                  {...(item?.q2ar ? { fileAr: item.q2ar } : {})}
                />

                <CustomTdWithPdf
                  {...(item?.q3en ? { fileEn: item.q3en } : {})}
                  {...(item?.q3ar ? { fileAr: item.q3ar } : {})}
                />

                <CustomTdWithPdf
                  {...(item?.q4en ? { fileEn: item.q4en } : {})}
                  {...(item?.q4ar ? { fileAr: item.q4ar } : {})}
                />

                <CustomTdWithPdf
                  {...(item?.annualen ? { fileEn: item.annualen } : {})}
                  {...(item?.annualar ? { fileAr: item.annualar } : {})}
                />

                <CustomTdWithPdf
                  {...(item?.managementen ? { fileEn: item.managementen } : {})}
                  {...(item?.managementar ? { fileAr: item.managementar } : {})}
                />
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialReports;
