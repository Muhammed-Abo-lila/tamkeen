// Router
import { Outlet } from "react-router-dom";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
import useLang from "../../Utils/useLang";
import "./FinancialInformation.css"
function FinancialInformation() {
  const nestedRoutes = [
    {
      path: "financial-statements",
      title: useLang("financial statements", "القوائم المالية"),
    },
    {
      path: "financial-ratios",
      title: useLang("financial ratios", "المؤشرات المالية"),
    },
    {
      path: "financial-reports",
      title: useLang("financial reports", "قائمة التقارير المالية"),
    },
  ];
  return (
    <>
      <NestedNavs routes={nestedRoutes} />
      <Outlet />
    </>
  );
}

export default FinancialInformation;
