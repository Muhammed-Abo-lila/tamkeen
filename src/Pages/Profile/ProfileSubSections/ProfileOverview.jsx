import DOMPurify from "dompurify";
import parse from "html-react-parser";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import i18n from "i18next";
const ProfileOverview = ({ data }) => {
  return (
    <div className="overview">
      {/* overview */}
      {data?.overviewEn && i18n.language === "en" && (
        <div>
          <h2 className="section-title p-0">Business</h2>
          <CustomHr style="m-0 my-1" />
          <div className="p-0">
            {parse(DOMPurify.sanitize(data.overviewEn))}
          </div>
        </div>
      )}

      {data?.overviewAr && i18n.language === "ar" && (
        <div>
          <h2 className="section-title p-0">مجال عمل الشركة</h2>
          <CustomHr style="m-0 my-1" />
          <div className="p-0">
            {parse(DOMPurify.sanitize(data.overviewAr))}
          </div>
        </div>
      )}
      {/* summary */}
      {data?.summaryEn && i18n.language == "en" && (
        <div>
          <h2 className="section-title p-0">Overview</h2>
          <CustomHr style="m-0 my-1" />
          <div className="m-0">{parse(DOMPurify.sanitize(data.summaryEn))}</div>
        </div>
      )}
      {data?.summaryAr && i18n.language == "ar" && (
        <div>
          <h2 className="section-title p-0">نبذة موسعة</h2>
          <CustomHr style="m-0 my-1" />
          <div className="m-0">{parse(DOMPurify.sanitize(data.summaryAr))}</div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
