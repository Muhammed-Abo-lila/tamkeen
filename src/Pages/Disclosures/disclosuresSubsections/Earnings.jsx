import CustomTd from "../../../Components/Common/customTd/CustomTd";
import CustomTdWithPdf from "../../../Components/Common/customTdWithPdf/CustomTdWithPdf";
import SkeletonTable from "../../../Components/UI/SkeletonTable/SkeletonTable";
import APIS from "../../../services/APIS";
import useLang from "../../../Utils/useLang";
import useRequest from "../../../Utils/useRequest";
function Earnings() {
  const tableHead = [
    { label: useLang("report", "عنوان التقرير") },
    { label: useLang("interim", "مرحلي") },
    { label: useLang("year", "السنة") },
    { label: useLang("report PDF", "التقرير ") },
  ];
  const { data: earningsData, isLoading } = useRequest(
    [APIS.EARNINGS.KEY, "all"],
    `${APIS?.EARNINGS?.URL}/${useLang("en", "ar")}`
  );
  return (
    <div className="table-responsive">
      {isLoading ? (
        <SkeletonTable columns={1} rows={10} />
      ) : (
        <table className="table table-hover" style={{ minWidth: "700px" }}>
          <thead className="table-light">
            <tr>
              {tableHead.map((item, idx) => (
                <CustomTd key={idx} label={item.label} isCentered={idx !== 0} height="30px"/>
              ))}
            </tr>
          </thead>
          <tbody>
            {earningsData?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  label={item?.title}
                  isCentered={false}
                  style={{ width: "60%",color: "var(--link-color)" }}
                />

                <CustomTd
                  label={
                    item?.fiscalValue === "YEAR"
                      ? useLang("12 M", "12 شهر")
                      : item?.fiscalValue === "I1"
                      ? useLang("3 M", "3شهور ")
                      : item?.fiscalValue === "I2"
                      ? useLang("6 M", "6شهور ")
                      : item?.fiscalValue === "I3"
                      ? useLang("9 M", "9شهور ")
                      : ""
                  }
                />

                <CustomTd label={item?.forYear} />
                <CustomTdWithPdf
                  {...(item.fileURLEn ? { fileEn: item.fileURLEn } : {})}
                  {...(item.fileURLAr ? { fileAr: item.fileURLAr } : {})}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Earnings;
