import { useLocation, useNavigate} from "react-router-dom";
import parse from "html-react-parser";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import useLang from "../../../Utils/useLang";
import "./DisclouserArticle.css";
import NotFound from "../../NotFound/NotFound";
import SkeletonTable from "../../../Components/UI/SkeletonTable/SkeletonTable";
function DisclouserArticle() {
  const navigate=useNavigate()
  const location = useLocation();
  const url = location?.pathname.split("/");
  const section = url[2];
  const articleId = url[4];
  const { data: disclosuresData, isLoading: disclosuresLoading } = useRequest(
    [APIS.DISCLUSERS.KEY, "all"],
    `${APIS.DISCLUSERS.URL}/${useLang("en", "ar")}`,
    { enabled: section == "disc" }
  );
  const { data: latestNewsData, isLoading: latestNewsLoading } = useRequest(
    [APIS.LATEST_NEWS.KEY, "all"],
    `${APIS.LATEST_NEWS.URL}/${useLang("en", "ar")}`,
    { enabled: section == "latest-news" }
  );
  let spacificArticle = {};
  if (section == "disc") {
    spacificArticle = disclosuresData?.find(
      (item) => item?.articleID == articleId
    );
  } else if (section == "latest-news") {
    spacificArticle = latestNewsData?.find(
      (item) => item?.articleID == articleId
    );
  }
  if (!latestNewsLoading && !disclosuresLoading && !spacificArticle)return <NotFound />;
  if(latestNewsLoading||disclosuresLoading)return <SkeletonTable columns={1} rows={10} />
  return (
    <div>
      <div className="w-fit d-flex justify-content-center align-items-center gap-1 text-capitalize cursor-pointer" onClick={()=>navigate(-1)}>
        <i className={`bi bi-arrow-${useLang("left","right")}-circle-fill custom-fs-2`}></i>
        <span>{useLang("back","الرجوع")}</span>
      </div>
      <div className="my-3 disclouser-article">
        {parse(`${spacificArticle?.body}`)}
      </div>
    </div>
  );
}

export default DisclouserArticle;
