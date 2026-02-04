import { Link, Outlet, useParams } from "react-router-dom";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import APIS from "../../../services/APIS";
import { formatDate } from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
import useRequest from "../../../Utils/useRequest";
import SkeletonTable from "../../../Components/UI/SkeletonTable/SkeletonTable";
function Disclosures() {
  const { id } = useParams();
  const tableHead = [
    { label: useLang("date", "تاريخ") },
    { label: useLang("disclosure", "الإفصاح") },
    { label: useLang("source", "المصدر") },
  ];
  const { data: DisclosuresData, isLoading } = useRequest(
    [APIS.DISCLUSERS.KEY, "all"],
    `${APIS?.DISCLUSERS?.URL}/${useLang("en", "ar")}`
  );
  if (id) return <Outlet />;
  return (
    <div className="table-responsive">
      {isLoading ? (
        <SkeletonTable columns={1} rows={10} />
      ) : (
        <table className="table table-hover" style={{ minWidth: "700px" }}>
          <thead className="table-light">
            <tr>
              {tableHead.map((item, idx) => (
                <CustomTd
                  key={idx}
                  label={item.label}
                  isCentered={idx === 2}
                  height="30px"
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {DisclosuresData?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd
                  label={formatDate(item.publishedOn)}
                  isCentered={false}
                  style={{ width: "15%" }}
                />

                <CustomTd isCentered={false} style={{ width: "75%" }}>
                  <Link
                    className="link-color "
                    to={`article/${item?.articleID}?lang=${useLang(
                      "en",
                      "ar"
                    )}`}
                  >
                    {item?.title}
                  </Link>
                </CustomTd>

                <CustomTd label={item?.source} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Disclosures;
