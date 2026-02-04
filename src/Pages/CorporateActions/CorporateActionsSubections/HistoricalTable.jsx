import useLang from "../../../Utils/useLang";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import { formatDate, formatNumber } from "../../../Utils/helpers";
import EmptyRow from "../../../Components/Common/emptyRow/EmptyRow";
function HistoricalTable({ historicaltableData }) {
  const lang = useLang("en", "ar");
  const tableData = [
    {
      label: useLang("announcement", "تاريخ الإعلان"),
    },
    {
      label: useLang("Ex-Dividend", "تاريخ الإستحقاق"),
    },
    {
      label: useLang("payment", "تاريخ التوزيع"),
    },
    {
      label: useLang(
        "dividends (M Ryal)",
        "إجمالي التوزيعات النقدية (مليون ريال)"
      ),
    },
    {
      label: useLang("dividends", "التوزيع النقدي"),
    },
    {
      label: useLang("notes", "ملاحظات"),
    },
  ];
  return (
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover"
        style={{ minWidth: "700px" }}
      >
        <thead className="table-light">
          <tr>
            {tableData?.map((item, idx) => (
              <CustomTd key={idx} label={item?.label} />
            ))}
          </tr>
        </thead>

        <tbody>
          {historicaltableData && historicaltableData?.length > 0 ? (
            <>
              {historicaltableData?.map((item, idx) => (
                <tr key={idx}>
                  <CustomTd label={formatDate(item?.dividendAnnouncedDate)} />
                  <CustomTd label={formatDate(item?.dividendDueDate)} />
                  <CustomTd label={formatDate(item?.dividendDate)} />
                  <CustomTd label={formatNumber(item?.cashDividend)} />
                  <CustomTd label={formatNumber(item?.cashDividendPerShare)} />
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
            </>
          ) : (
            <EmptyRow
              text={useLang("data not available", "البيانات غير متوفرة")}
              colspan={6}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricalTable;
