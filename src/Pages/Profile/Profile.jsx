import Loader from "../../Layout/Loader/Loader";
import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import BasicInfo from "./ProfileSubSections/BasicInfo";
import ProfileOverview from "./ProfileSubSections/ProfileOverview";
import FinancialHighlights from "./ProfileSubSections/FinancialsHighlights";
import TradingData from "./ProfileSubSections/TradingData";
import StockInfo from "./ProfileSubSections/StockInfo";
import MajorShareholders from "./ProfileSubSections/MajorShareholders";
import SubsidiariesAssociates from "./ProfileSubSections/SubsidiariesAssociates";
import Milestones from "./ProfileSubSections/MileStones";
import "./Profile.css";
function Profile() {
  const { data, isLoading } = useRequest(
    [APIS?.PROFILE?.KEY],
    APIS?.PROFILE?.URL
  );
  if (isLoading) return <Loader />;

  return (
    <div className="profile-section mt-4">
      <ProfileOverview data={data?.profileInfo} />
      <BasicInfo data={data?.profileInfo} />
      <FinancialHighlights data={data?.financialHighlights} />
      <div className="row row-gap-4 mt-5">
        <div className="col-12 col-md-6"><TradingData data={data?.tradingData}/></div>
        <div className="col-12 col-md-6"><StockInfo data={data?.stockInfo}/></div>
      </div>
      <MajorShareholders data={data?.majorShareholder}/>
      <SubsidiariesAssociates data={data?.subsidiaries}/>
      <Milestones data={data?.milestones} />
    </div>
  );
}

export default Profile;
