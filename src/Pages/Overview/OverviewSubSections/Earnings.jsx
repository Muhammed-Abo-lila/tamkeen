import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useRequest from "../../../Utils/useRequest";
import useLang from "../../../Utils/useLang";
import APIS from "../../../services/APIS";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";

function Earnings() {
  // Fetch earnings using the new endpoint
  const { data } = useRequest(
    [APIS.EARNINGS.KEY],
    `${APIS?.EARNINGS?.URL}/${useLang("en", "ar")}?recordSize=3`
  );
  return (
    <div className="border border-top-0 ">
      <h2 className="section-title overview-sections-title">
        {useLang("earnings", "النتائج المالية")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      <div className="table-responsive">
        <table className="table mb-0 custom-fs-6">
          <thead className="table-light">
            <tr>
              <CustomTd
                isCentered={false}
                label={useLang("report", "عنوان التقرير")}
              />
              <CustomTd label={useLang("interim", "مرحلي")} />
              <CustomTd label={useLang("year", "السنه")} />
            </tr>
          </thead>
          <tbody>
            {data?.map((earning, idx) => (
              <tr key={idx}>
                <CustomTd isCentered={false}>
                  <a
                    className="link-color "
                    href={useLang(earning?.fileURLEn, earning?.fileURLAr)}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    {earning?.title}
                  </a>
                </CustomTd>
                <CustomTd
                  style={{ minWidth: "60px" }}
                  label={
                    earning?.fiscalValue === "YEAR"
                      ? useLang("12 M", "12 شهر")
                      : earning?.fiscalValue === "I1"
                      ? useLang("3 M", "3شهور ")
                      : earning?.fiscalValue === "I2"
                      ? useLang("6 M", "6شهور ")
                      : earning?.fiscalValue === "I3"
                      ? useLang("9 M", "9شهور ")
                      : ""
                  }
                />
                <CustomTd
                  style={{ minWidth: "60px" }}
                  label={earning?.forYear}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* More Button */}
      <MoreBtn path="/disclosures/earnings" title={useLang("more", "المزيد")} />
    </div>
  );
}

export default Earnings;
