import { Link } from "react-router-dom"
import Loader from "../../../../Layout/Loader/Loader";
import CustomTd from "../../../../Components/Common/customTd/CustomTd";
import useLang from "../../../../Utils/useLang";
import EmptyRow from "../../../../Components/Common/emptyRow/EmptyRow";
import usePeersSelections from "../../../../CustomHooks/usePeersSelections";
import PrintOptions from "../../../../Components/Common/printOptions/PrintOptions";
function General() {
  const tableHead = [
    {
      label: useLang("company", "الشركة"),
    },
    {
      label: useLang("argaam sectors", "قطاع ارقام	"),
    },
    {
      label: useLang("city", "المدينة"),
    },
    {
      label: useLang("phone", "الهاتف"),
    },
    {
      label: useLang("fax", "الفاكس"),
    },
    {
      label: useLang("email", "البريد الإلكتروني"),
    },
    {
      label: useLang("website", "الموقع الإلكتروني"),
    },
  ];
  const {handleExportToExcel,data,isLoading}=usePeersSelections("general");
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-end me-0">
        <PrintOptions onClick={handleExportToExcel}/>
      </div>
        <div className="table-responsive mt-3 print-table-wrapper">
          <table className="table" style={{ minWidth: "650px" }}>
            <thead className="table-light" style={{ verticalAlign: "middle" }}>
              <tr>
                {tableHead?.map((item, idx) => (
                  <CustomTd
                    key={idx}
                    label={item?.label}
                    isCentered={idx != 0}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.General?.length > 0 ? (
                <>
                  {data?.General?.map((item, idx) => (
                    <tr key={idx}>
                      <CustomTd
                        isCentered={false}
                        label={useLang(item?.shortNameEn, item?.shortNameAr)}
                      />
                      <CustomTd
                        label={useLang(
                          item?.argaamSectorNameEn,
                          item?.argaamSectorNameAr
                        )}
                      />
                      <CustomTd
                        label={useLang(item?.cityNameEn, item?.cityNameAr)}
                      />
                      <CustomTd style={{ direction: "ltr" }}>
                        <Link
                          to={`tel:${item?.companyPhoneNo}`}
                          target="_blank"
                        >
                          {item?.companyPhoneNo}
                        </Link>
                      </CustomTd>

                      <CustomTd style={{ direction: "ltr" }}>
                        <Link to={`fax:${item?.companyFax}`} target="_blank">
                          {item?.companyFax}
                        </Link>
                      </CustomTd>

                      <CustomTd>
                        <Link
                          to={`mailto:${item?.companyEmail}`}
                          target="_blank"
                        >
                          <i className="bi bi-envelope icons-color custom-fs-4"></i>
                        </Link>
                      </CustomTd>

                      <CustomTd>
                        <Link
                          to={`https://${item?.companyWebsiteURL}`}
                          target="_blank"
                        >
                          <i className="bi bi-globe icons-color custom-fs-4"></i>
                        </Link>
                      </CustomTd>
                    </tr>
                  ))}
                </>
              ) : (
                <EmptyRow colSpan={7} />
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default General;
