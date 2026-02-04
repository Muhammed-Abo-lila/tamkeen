import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import CustomTd from "../../Components/Common/customTd/CustomTd";
import useLang from "../../Utils/useLang";
import { formatDate } from "../../Utils/helpers";
import CustomTdWithPdf from "../../Components/Common/customTdWithPdf/CustomTdWithPdf";
import SkeletonTable from "../../Components/UI/SkeletonTable/SkeletonTable";
function InvestorsPresentation() {
  const { data: investorPresentationData, isLoading } = useRequest(
    [APIS?.INVESTOR_PRESENTATION?.KEY],
    APIS?.INVESTOR_PRESENTATION?.URL
  );
  const tableHead = [
    { label: useLang("date", "تاريخ") },
    { label: useLang("reports", "التقرير") },
    { label: useLang("report type", "نوع التقرير") },
    { label: useLang("downloads", "تحميل") },
  ];
  return (
    <div className="table-responsive pt-3">
      {isLoading ? (
        <SkeletonTable columns={1} rows={7} />
      ) : (
        <table className=" table" style={{ minWidth: "700px" }}>
          <thead className="table-light">
            <tr>
              {tableHead.map((item, idx) => (
                <CustomTd key={idx} label={item.label} isCentered={idx === 3} />
              ))}
            </tr>
          </thead>
          <tbody>
            {investorPresentationData?.investorsPresentations?.map(
              (item, idx) => (
                <tr key={idx}>
                  <CustomTd
                    label={formatDate(item.createdOn)}
                    isCentered={false}
                  />
                  <CustomTd
                    label={useLang(item?.descriptionEn, item?.descriptionAr)}
                    isCentered={false}
                  />
                  <CustomTd
                    label={useLang(item?.typeNameEn, item?.typeNameAr)}
                    isCentered={false}
                  />
                  <CustomTdWithPdf
                    {...(item?.attachLinkUrlEn
                      ? { fileEn: item.attachLinkUrlEn }
                      : {})}
                    {...(item?.attachLinkUrlAr
                      ? { fileAr: item.attachLinkUrlAr }
                      : {})}
                  />
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvestorsPresentation;
