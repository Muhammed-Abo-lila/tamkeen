import { NavLink } from "react-router-dom";
import useLang from "../../Utils/useLang";
import "./SideBar.css";
function SideBar() {
  const currentLang = useLang("en", "ar");
  const Links = [
    { title: useLang("overview", "معلومات الشركة"), to: "" },
    { title: useLang("profile", "ملف الشركة"), to: `profile` },
    {
      title: useLang("board & executives", "مجلس الإدارة والمدراء التنفيذيون"),
      to: `board`,
    },
    {
      title: useLang("share performance", "أداء السهم"),
      to: `share-performance`,
    },
    {
      title: useLang("financial information", "البيانات المالية"),
      to: `financial-information`,
    },
    {
      title: useLang("investors presentation", "عرض المستثمرين"),
      to: `investors-presentation`,
    },
    { title: useLang("disclosures", "الإفصاحات"), to: `disclosures` },
    {
      title: useLang("corporate actions", "إجراءات الشركة"),
      to: `corporate-actions`,
    },
    {
      title: useLang("major shareholders", "كبار المساهمين"),
      to: `major-shareholders`,
    },
    {
      title: useLang("business segments", "التحليل القطاعي"),
      to: `business-segments`,
    },
    {
      title: useLang("mergers & acquisitions", "الدمج والاستحواذ"),
      to: `mergers-acquisitions`,
    },
    { title: useLang("contact IR", "تواصل مع الشركة"), to: `contact` },
  ];
  return (
    <>
      {/* sidebar in large screens*/}
      <div
        className="sidebar d-none d-lg-block w-100"
        style={{ height: "fit-content" }}
      >
        <ul className="list-unstyled m-0 p-0">
          {Links?.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={{
                  pathname: `${item.to}`,
                  search: `?lang=${currentLang}`,
                }}
                className={`w-100 d-block py-2 px-2 text-capitalize`}
                style={{ fontSize: "13px" }}
          
              >
                {item?.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* sidebar in small screens*/}
      <div className="sidebar d-lg-none w-100">
        <button
          className="btn p-1 m-1 py-0 fs-5 rounded border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <i
            className="bi bi-list custom-fs-1 fw-bold px-2 rounded"
            style={{
              color: "var(--main-color)",
              border: "1px solid var(--main-color)",
            }}
          ></i>
        </button>
        <div
          className={`offcanvas ${useLang("offcanvas-start", "offcanvas-end")}`}
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-content overflow-hidden">
            <div className="offcanvas-header">
              <button
                type="button"
                className={`btn-close text-center ${useLang(
                  "ms-auto",
                  "me-auto"
                )}`}
                style={{ fontSize: "13px" }}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <ul className="list-unstyled m-0 p-0">
              {Links?.map((item, idx) => (
                <li key={idx} data-bs-dismiss="offcanvas">
                  <NavLink
                    to={{
                      pathname: `${item.to}`,
                      search: `?lang=${currentLang}`,
                    }}
                    className={`w-100 d-block py-2 px-4 text-capitalize`}
                    style={{ fontSize: "13px" }}
                  >
                    {item?.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default SideBar;
