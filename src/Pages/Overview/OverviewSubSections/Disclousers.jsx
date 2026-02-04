import { Link } from "react-router-dom";
import APIS from "../../../services/APIS";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useRequest from "../../../Utils/useRequest";
import useLang from "../../../Utils/useLang";
import { formatDate } from "../../../Utils/helpers";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
function Disclosures() {
  const { data: DisclosuresData } = useRequest(
    [APIS.DISCLUSERS.KEY],
    `${APIS?.DISCLUSERS?.URL}/${useLang("en", "ar")}?recordSize=3`
  );
  return (
    <div className="border border-top-0 ">
      <h2 className="section-title overview-sections-title">
        {useLang("disclosures", "الإفصاحات")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      {DisclosuresData?.map((disclosures, idx) => (
        <div className="p-1 px-2 border-bottom custom-fs-6" key={idx}>
          <Link
            className="link-color "
            to={`/disclosures/disc/article/${disclosures?.articleID}?lang=${useLang(
              "en",
              "ar"
            )}`}
          >
            {disclosures?.title}
          </Link>
          <p className="m-0">
            <span className="text-secondary">{disclosures?.source}</span>
            <span className="mx-2">{formatDate(disclosures?.publishedOn)}</span>
          </p>
        </div>
      ))}
      {/* More Button */}
      <MoreBtn path="/disclosures/disc" title={useLang("more", "المزيد")} />
    </div>
  );
}

export default Disclosures;
