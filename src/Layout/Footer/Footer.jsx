import { Link } from "react-router-dom";
import useLang from "../../Utils/useLang";
import "./Footer.css";
function Footer() {
  return (
    <div className="fixed-bottom w-100 text-center py-2 footer">
      <Link to={"https://www.argaam.com"} target="_blank">
        <span className="powerd-by text-capitalize">{useLang("powered by","بواسطة")}</span>
        <span className="argaam" style={{ color: "#EE7B0B" }}>
          Argaam.com
        </span>
      </Link>
    </div>
  );
}

export default Footer;
