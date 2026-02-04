import {
  colorAndBgColorDependOnNumber,
  formatDate,
  formatNumber,
} from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
function HistoricalChanges({ historicalData }) {
  const lang = useLang("en", "ar");
  const tableHead = [
    { label: useLang("date", "التاريخ") },
    { label: useLang("shareholder", "المالك") },
    { label: useLang("prev. holding", "نسبة الملكية السابقة") },
    { label: useLang("current holding	", "الملكية الحالية") },
    { label: useLang("change", "التغير") },
    { label: useLang("notes", "ملاحظات") },
  ];
  return (
    <div className="table-responsive mt-3" style={{ minWidth: "700px" }}>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            {tableHead.map((item, idx) => (
              <CustomTd
                key={idx}
                label={item.label}
                isCentered={idx === 0 ? false : true}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {historicalData?.map((item, idx) => (
            <tr key={idx}>
              <CustomTd label={formatDate(item.forDate)} isCentered={false} />
              <CustomTd
                label={useLang(
                  item?.shareholderNameEn,
                  item?.shareholderNameAr
                )}
              />

              <CustomTd>
                {item?.previousPercentage >= 5 ? (
                  `${formatNumber(item?.previousPercentage)}`
                ) : (
                  <span className="text-danger">
                    {useLang("less than 5 %", "أقل من 5 %")}
                  </span>
                )}
              </CustomTd>

              <CustomTd>
                {item?.percentage >= 5 ? (
                  `${formatNumber(item?.percentage)}`
                ) : (
                  <span className="text-danger">
                    {useLang("less than 5 %", "أقل من 5 %")}
                  </span>
                )}
              </CustomTd>

              <CustomTd
                label={`${formatNumber(item?.percentageChange)} %`}
                style={{
                  color: colorAndBgColorDependOnNumber(item?.percentageChange),
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricalChanges;
