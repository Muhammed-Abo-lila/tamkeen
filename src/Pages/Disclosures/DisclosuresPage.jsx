import { Outlet, useParams } from "react-router-dom";
import useLang from "../../Utils/useLang";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
function Disclosurespage() {
  const { id } = useParams();
  const nestedRoutes = [
    {
      path: "latest-news",
      title: useLang("latest news", "آخر الأخبار"),
    },
    {
      path: "disc",
      title: useLang("disclosures", "الإفصاحات"),
    },
    {
      path: "earnings",
      title: useLang("earnings", "النتائج المالية"),
    },
    {
      path: "events",
      title: useLang("events", "المفكرة"),
    },
  ];

  return (
    <>
      {!id ? <NestedNavs routes={nestedRoutes} /> : ""}
      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
}

export default Disclosurespage;
