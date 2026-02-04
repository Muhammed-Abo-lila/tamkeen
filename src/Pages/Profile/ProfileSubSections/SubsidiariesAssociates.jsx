import { useState } from "react";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import useLang from "../../../Utils/useLang";
import { formatNumber } from "../../../Utils/helpers";
import CustomTd from "../../../Components/Common/customTd/CustomTd";

function SubsidiariesAssociates({ data }) {
  const [visibleCount, setVisibleCount] = useState(3);
  return (
    <div className="mt-5">
      <h2 className="section-title p-0">
        {useLang("subsidiaries & associates", "الشركات التابعة والزميلة")}
      </h2>
      <CustomHr style="m-0 my-1" />
      <div className="table-responsive">
        <table
          className="table table-hover custom-fs-6 mb-0"
          style={{ minWidth: "550px" }}
        >
          <thead className="table-light">
            <tr className="text-capitalize">
              <CustomTd
                isCentered={false}
                label={useLang("company", "الشركة")}
              />
              <CustomTd label={useLang("country", "الدولة")} />
              <CustomTd label={useLang("percentage", "النسبة")} />
            </tr>
          </thead>
          <tbody>
            {data?.slice(0, visibleCount).map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  isCentered={false}
                  label={useLang(item?.companyNameEn, item?.companyNameAr)}
                />
                <CustomTd
                  label={useLang(item?.countryNameEn, item?.countryNameAr)}
                />
                <CustomTd label={`${formatNumber(item?.percentage)} %`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* More Button */}
      {data.length > visibleCount && (
         <button
          className=" w-100 btn btn-light rounded-0 d-flex align-items-center justify-content-end"
          onClick={() => setVisibleCount(data?.length)}
        >
          <span className="mx-2 text-capitalize">{useLang("more", "المزيد")}</span>
          <i className={`bi bi-chevron-double-${useLang("right","left")}`}></i>
        </button>
      )}
    </div>
  );
}
export default SubsidiariesAssociates;
