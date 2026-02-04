import { useState } from "react";
import i18n from "i18next";
import { useNavigate } from "react-router-dom";
import useLang from "../../../Utils/useLang";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import { formatDate } from "../../../Utils/helpers";
function Milestones({ data }) {  
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <h2 className="section-title p-0">
        {useLang("milestones", "التطورات الرئيسية")}
      </h2>
      <CustomHr style="m-0 my-1" />
      <div className="table-responsive">
        <table
          className="table table-hover custom-fs-6 mb-0"
          style={{ minWidth: "450px" }}
        >
          <tbody>
            {data?.slice(0, visibleCount).map((item, idx) => (
              <tr key={idx}>
                <td style={{ minWidth: "115px" }}>
                  {formatDate(item?.fullDate)}
                </td>
                <td
                  className={`${
                    ((i18n?.language === "en" && item?.bodyEn) ||
                      (i18n?.language === "ar" && item?.bodyAr)) &&
                    "cursor-pointer"
                  }`}
                  onClick={() =>
                    ((i18n?.language === "en" && item?.bodyEn) ||
                      (i18n?.language === "ar" && item?.bodyAr)) &&
                    navigate(`/milestones/${idx}?lang=${i18n?.language}`)
                  }
                >
                  <span
                    className={`${
                      ((i18n.language === "en" && item?.bodyEn) ||
                        (i18n.language === "ar" && item?.bodyAr)) &&
                      "link-color "
                    }`}
                  >
                    {useLang(item?.titleEn, item?.titleAr)}
                  </span>
                </td>
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

export default Milestones;
