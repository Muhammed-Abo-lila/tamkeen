import { Link } from "react-router-dom";
import useLang from "../../../Utils/useLang";
function MoreBtn({ path, title }) {
  return (
    <Link
      className="btn btn-light rounded-0 d-flex align-items-center justify-content-end"
      to={{
        pathname: path,
        search: `?lang=${useLang("en", "ar")}`,
      }}
    >
      <span className="mx-2 text-capitalize">{title}</span>
      <i className={`bi bi-chevron-double-${useLang("right", "left")}`}></i>
    </Link>
  );
}
export default MoreBtn;
