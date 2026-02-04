import Chart from "./OverviewSubSections/Chart";
import LatestNews from "./OverviewSubSections/LatestNews";
import Earnings from "./OverviewSubSections/Earnings";
import Disclosures from "./OverviewSubSections/Disclousers";
import MarketData from "./OverviewSubSections/MarketData";
import FinancialRatios from "./OverviewSubSections/FinancialRatios";
import Events from "./OverviewSubSections/Events";
import CorporateActions from "./OverviewSubSections/CorporateActions";
import MetaComp from "../../Layout/MetaComp/MetaComp";
import "./Overview.css";
function Overview() {
  return (
    <div className="overview row mt-4">
      <MetaComp/>
      <div className="col-md-6">
        <Chart />
        <LatestNews />
        <Earnings />
        <Disclosures />
      </div>
      <div className="col-md-6">
        <MarketData />
        <FinancialRatios />
        <Events />
        <CorporateActions />
      </div>
    </div>
  );
}

export default Overview;
