import { Link, useNavigate } from "react-router-dom";
import useLang from "../../Utils/useLang";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex align-items-center justify-content-center px-4"
      style={{ height: "80vh" }}
    >
      <div className="text-center" style={{ maxWidth: "28rem" }}>
        {/* Large 404 */}
        <div className="mb-4">
          <h1 className="display-1  text-dark mb-3">404</h1>
          <div
            className="mx-auto"
            style={{
              width: "6rem",
              height: "4px",
              backgroundColor: "var(--identity-color)",
            }}
          ></div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <h2 className="h2 fw-semibold text-dark mb-3 text-capitalize">
            {useLang("page not found", "الصفحة غير موجودة")}
          </h2>
          <p className="text-muted lead">
            {useLang(
              " Sorry, the page you are looking for doesn't exist",
              "عذراً، الصفحة التي تبحث عنها غير موجودة ."
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-3">
          <Link
            to={`/${"?lang=" + useLang("en", "ar")}`}
            className="btn btn-lg d-flex align-items-center justify-content-center gap-2 text-capitalize"
            style={{
              backgroundColor: "var(--main-color)",
              color: "var(--white-color)",
            }}
          >
            <i className="bi bi-house-door-fill"></i>
            {useLang("go home", "الصفحة الرئيسية")}
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-lg d-flex align-items-center justify-content-center gap-2  text-capitalize"
            style={{ backgroundColor: "#787878", color: "var(--white-color)" }}
          >
            <i className="bi bi-arrow-left"></i>
            {useLang("go back", "العودة")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
