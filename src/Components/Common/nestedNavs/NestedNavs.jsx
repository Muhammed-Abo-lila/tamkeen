import { NavLink } from "react-router-dom";
import "./NestedNavs.css";
const NestedNavs = ({ routes, tabs,activeTab,setActiveTab }) => {
  return (
    <div className="nested-tabs d-flex flex-column row-gap-2 flex-sm-row justify-content-sm-start align-items-sm-center column-gap-4 py-3 custom-fs-5 text-capitalize">
      {tabs?.map((item, idx) =>
        <div className={`cursor-pointer ${item?.tab==activeTab?"active":""}`} onClick={()=>setActiveTab(item?.tab)} key={idx}>{item?.label}</div>
      )}
      {routes?.map((item, idx) => (
        <NavLink
          key={idx}
          to={item?.path}
        >
          {item?.title}
        </NavLink>
      ))}
    </div>
  );
};

export default NestedNavs;
