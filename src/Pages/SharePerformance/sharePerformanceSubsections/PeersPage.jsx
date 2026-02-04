import { NavLink, Outlet } from "react-router-dom";
import useLang from "../../../Utils/useLang";
import NestedNavs from "../../../Components/Common/nestedNavs/NestedNavs";
function PeersPage() {
  const nestedRoutes = [
    {
      path: `general`,
      title: useLang("general", "معلومات عامة"),
    },
    {
      path: `ranking`,
      title: useLang("ranking", "ترتيب الشركات"),
    },
    {
      path: `growth`,
      title: useLang("growth", "النمو"),
    },
    {
      path: `market-performance`,
      title: useLang("market performance", "أداء الشركة"),
    },
    {
      path: `per-share-data`,
      title: useLang("per share data (riyal)", "بيانات السهم (ريال)"),
    },
    {
      path: `salaries-benefits`,
      title: useLang("salaries and benefits", "المكافئات والمزايا"),
    },
  ];
  return (
    <div>
      <div className="mt-3" style={{ backgroundColor: "var(--bg-light)" }}>
        {/* <NestedNavs routes={nestedRoutes} /> */}
        <div className="nested-tabs d-flex flex-column row-gap-2 flex-md-row justify-content-md-start align-items-md-start column-gap-4 py-3 mx-3 custom-fs-5 text-capitalize">
          {nestedRoutes?.map((item, idx) => (
            <NavLink key={idx} to={`${item?.path}?lang=${useLang("en", "ar")}`}>
              {item?.title}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default PeersPage;
