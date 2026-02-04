import { Link } from "react-router-dom";
import useRequest from "../../../Utils/useRequest";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useLang from "../../../Utils/useLang";
import APIS from "../../../services/APIS";
import { formatDate } from "../../../Utils/helpers";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
function LatestNews() {
  // Fetch latest news using the new endpoint
  const { data: LatestNewsData } = useRequest(
    [APIS?.LATEST_NEWS?.KEY],
    `${APIS?.LATEST_NEWS?.URL}/${useLang("en", "ar")}?recordSize=3`
  );
  return (
    <div className="border border-top-0 ">
      <h2 className="section-title overview-sections-title">
        {useLang("latest news", "آخر الآخبار")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      {LatestNewsData?.map((latestNews, idx) => (
        <div className="p-1 px-2 border-bottom custom-fs-6" key={idx}>
          <Link
            className="link-color "
            to={`/disclosures/latest-news/article/${latestNews?.articleID}?lang=${useLang(
              "en",
              "ar"
            )}`}
          >
            {latestNews?.title}
          </Link>
          <p className="m-0">
            <span className="text-secondary">{latestNews?.source}</span>
            <span className="mx-2">{formatDate(latestNews?.publishedOn)}</span>
          </p>
        </div>
      ))}
      {/* More Button */}
      <MoreBtn
        path="/disclosures/latest-news"
        title={useLang("more", "المزيد")}
      />
    </div>
  );
}

export default LatestNews;
