// React Router
import { Outlet } from "react-router-dom";
import useLang from "../../Utils/useLang";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
import "./SharePerformance.css"
function SharePerformance() {
  const nestedRoutes = [
    {
      path: `chart`,
      title: useLang("chart", "الرسم البياني"),
    },
    {
      path: `peers`,
      title: useLang("peers", "شركات القطاع"),
    },
    {
      path: `negotiated-deals`,
      title: useLang("negotiated deals", "الصفقات الخاصة"),
    },
    {
      path: `investment-calculator`,
      title: useLang("investment calculator", "حاسبة الإستثمار"),
    },
  ];
  return (
    <>
      <NestedNavs routes={nestedRoutes} />
      <Outlet />
    </>
  );
}

export default SharePerformance;
