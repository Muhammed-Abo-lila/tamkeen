import CustomTd from "../../../Components/Common/customTd/CustomTd";
import { formatNumber } from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";

const ForeignOwnership = ({ foreignData }) => {
  return (
    <>
      <h2 className="section-title mt-2">
        {useLang("forign ownership", "ملكيه الأجانب")}
      </h2>
      <div className="table-responsive mt-3">
        <table
          className="table table-bordered table-hover"
          style={{ minWidth: "700px" }}
        >
          <thead className="table-light">
            <tr>
              <CustomTd
                rowSpan={2}
                label={useLang("company", "الشركة")}
                lineHeight="80px"
                isCentered={false}
                style={{ width: "40%" }}
              />
              <CustomTd
                colSpan={2}
                label={useLang(
                  "total foreign ownership",
                  "ملكيه جميع المستثمرين الأجانب"
                )}
              />
            </tr>

            <tr>
              <CustomTd
                label={useLang("maximum limit", "الحد الاعلى")}
                style={{ width: "30%" }}
              />
              <CustomTd
                label={useLang("actual", "الملكية الفعلية")}
                style={{ width: "30%" }}
              />
            </tr>
          </thead>
          <tbody>
            {foreignData?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  label={useLang(item?.companyNameEn, item?.companyNameAr)}
                  isCentered={false}
                  style={{ width: "40%" }}
                />
                <CustomTd
                  label={`${formatNumber(item?.tfoMaximum)} %`}
                  style={{ width: "30%" }}
                />
                <CustomTd
                  label={`${formatNumber(item?.tfoActual)} %`}
                  style={{ width: "30%" }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ForeignOwnership;
