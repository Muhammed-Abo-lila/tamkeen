import { Link } from "react-router-dom";
import {
  colorAndBgColorDependOnNumber,
  formatDate,
  formatNumber,
} from "../../../Utils/helpers";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import useLang from "../../../Utils/useLang";
import EmptyRow from "../../../Components/Common/emptyRow/EmptyRow";
function ChangesTable({ capitalTableData }) {
  const lang = useLang("en", "ar");
  return (
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover"
        style={{ minWidth: "700px" }}
      >
        <thead className="table-light">
          <tr>
            <CustomTd
              rowSpan={2}
              label={useLang("date", "التاريخ")}
              lineHeight="80px"
            />
            <CustomTd
              rowSpan={2}
              label={useLang("type", "النوع")}
              lineHeight="80px"
            />
            <CustomTd colSpan={2} label={useLang("before", "قبل التغير")} />
            <CustomTd colSpan={2} label={useLang("after", "بعد التغير")} />
            <CustomTd
              rowSpan={2}
              label={useLang("change %", "معدل التغير %")}
              lineHeight="80px"
            />
            <CustomTd
              rowSpan={2}
              label={useLang("notes", "ملاحظات")}
              lineHeight="80px"
            />
            <CustomTd
              rowSpan={2}
              label={useLang("link", "رابط")}
              lineHeight="80px"
            />
          </tr>
          <tr>
            <CustomTd
              label={useLang("capital (M SAR)", "رأس المال (مليون ريال)")}
            />
            <CustomTd label={useLang("shares (M)", "عدد الأسهم (مليون)")} />
            <CustomTd
              label={useLang("capital (M SAR)", "رأس المال (مليون ريال)")}
            />
            <CustomTd label={useLang("shares (M)", "عدد الأسهم (مليون)")} />
          </tr>
        </thead>
        <tbody>
          {capitalTableData && capitalTableData?.length > 0 ? (
            <>
              {capitalTableData?.map((item, idx) => (
                <tr key={idx}>
                  <CustomTd label={formatDate(item?.tableDate)} />
                  <CustomTd label={useLang(item?.typeEn, item?.typeAr)} />
                  <CustomTd label={formatNumber(item?.currentCapital)} />
                  <CustomTd label={formatNumber(item?.currentShares)} />
                  <CustomTd label={formatNumber(item?.newCapital)} />
                  <CustomTd label={formatNumber(item?.newShares)} />
                  <CustomTd
                    label={`${formatNumber(item?.offeredPercentage)} %`}
                    style={{
                      color: colorAndBgColorDependOnNumber(
                        item?.offeredPercentage
                      ),
                    }}
                  />
                  <CustomTd>
                    {lang === "en" ? (
                      item?.notesEn ? (
                        <i
                          className="bi bi-journal-text icons-color fw-bold custom-fs-5 cursor-pointer"
                          data-bs-toggle="tooltip"
                          title={item.notesEn}
                          data-bs-original-title={item.notesEn}
                        />
                      ) : (
                        "-"
                      )
                    ) : lang === "ar" ? (
                      item?.notesAr ? (
                        <i
                          className="bi bi-journal-text icons-color fw-bold custom-fs-5 cursor-pointer"
                          data-bs-toggle="tooltip"
                          title={item.notesAr}
                          data-bs-original-title={item.notesAr}
                        />
                      ) : (
                        "-"
                      )
                    ) : (
                      "-"
                    )}
                  </CustomTd>

                  <CustomTd>
                    <Link
                      to={useLang(
                        item?.conditionalLinkEn,
                        item?.conditionalLinkAr
                      )}
                      target="_blank"
                      className="text-transparent "
                      style={{
                        fontSize: "20px",
                        color: "var(--identity-color)",
                      }}
                    >
                      <i className="bi bi-link-45deg"></i>
                    </Link>
                  </CustomTd>
                </tr>
              ))}
            </>
          ) : (
            <EmptyRow
              text={useLang("data not available", "البيانات غير متوفرة")}
              colspan={9}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChangesTable;
