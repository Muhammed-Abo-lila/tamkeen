import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import { formatNumber } from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
const MajorShareholders = ({ data }) => {
  return (
    <div className="mt-5">
      <h2 className="section-title p-0">
        {useLang("major shareholders", "كبار المستثمرين")}
      </h2>
      <CustomHr style="m-0 my-1" />
      <div className="mt-2 mb-0 pb-0 table-responsive bg-info">
        <table
          className="table table-hover custom-fs-6 mb-0"
          style={{ minWidth: "550px" }}
        >
          <thead className="table-light">
            <tr className="text-capitalize">
              <CustomTd
                isCentered={false}
                label={useLang("name", "إسم السهم")}
              />
              <CustomTd
                label={useLang("number of shares (M)", "عدد الأسهم (مليون)")}
              />
              <CustomTd label={useLang("holding", "نسبة الملكية")} />
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.shareholderID}>
                <CustomTd
                  isCentered={false}
                  label={useLang(
                    item?.shareholderNameEn,
                    item?.shareholderNameAr
                  )}
                />
                <CustomTd label={formatNumber(item?.noOfShares)} />
                <CustomTd label={`${formatNumber(item?.percentage)} %`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MoreBtn */}
      <MoreBtn path="/major-shareholders" title={useLang("more", "المزيد")} />
    </div>
  );
};

export default MajorShareholders;
