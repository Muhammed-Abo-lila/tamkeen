
import { Outlet, ScrollRestoration } from "react-router-dom";
import SideBar from "./Layout/SideBar/SideBar";
import CompanySummary from "./Layout/CompanySummary/CompanySummary";
import Footer from "./Layout/Footer/Footer";
const Layout = () => {
  return (
    <div className="container">
      <ScrollRestoration />
      <div className="row justify-content-between mt-4 mb-5">
        {/* LayOut */}
        <div className="col-xl-2 col-lg-3 d-flex justify-content-end px-2">
          <SideBar />
        </div>

        {/* Pages */}
        <div className="col-xl-10 col-lg-9 col-12 mb-5">
          <CompanySummary />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
