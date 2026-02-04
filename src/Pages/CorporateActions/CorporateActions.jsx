import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import Loader from "../../Layout/Loader/Loader";
import ChangesChart from "./CorporateActionsSubections/ChangesChart";
import RecentChanges from "./CorporateActionsSubections/RecentChanges";
import RecentDividends from "./CorporateActionsSubections/RecentDividends";
import useLang from "../../Utils/useLang";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
import { useState } from "react";
import ChangesTable from "./CorporateActionsSubections/ChangesTable";
import HistoricalTable from "./CorporateActionsSubections/HistoricalTable";
function CorporateActions() {
  const { data: corporateAcionsData, isLoading } = useRequest(
    [APIS?.CORPORATE_ACTIONS?.KEY],
    APIS?.CORPORATE_ACTIONS?.URL
  );
  const [chartActiveTab, setChartActiveTab] = useState("capital");
  const chartTabs = [
    {
      label: useLang("capital changes", "تطور رأس المال"),
      tab: "capital",
    },
    {
      label: useLang("historical dividends", "تطور التوزيعات النقدية"),
      tab: "historical",
    },
  ];
  if (isLoading) return <Loader />;
  return (
    <div className="mt-4">
      {/* first section */}
      <div className="row row-gap-5">
        <ChangesChart
          type="capital"
          chartData={corporateAcionsData?.capitalChartData}
        />
        <ChangesChart
          type="historical"
          chartData={corporateAcionsData?.dividendPerShareChartData}
        />
      </div>

      {/* second section */}
      <div className="row row-gap-5 mt-5">
        <div className="col-12">
          <RecentDividends
            recentDividendsData={corporateAcionsData?.recentDividends}
          />
        </div>
        {/* This component is ready to run as soon as the capital changes key updates and returns new data */}
        {/* <div className="col-12 col-md-6 col-xl-6">
          <RecentChanges
            recentChangesData={corporateAcionsData?.recentDividends}
          />
        </div> */}
      </div>

      {/* third section */}

      <div className="mt-5">
        <NestedNavs
          tabs={chartTabs}
          activeTab={chartActiveTab}
          setActiveTab={setChartActiveTab}
        />
        {chartActiveTab === "capital" ? (
          <ChangesTable
            capitalTableData={corporateAcionsData?.capitalChangeHistory}
          />
        ) : (
          <HistoricalTable
            historicaltableData={corporateAcionsData?.capitalDividendHistory}
          />
        )}
      </div>
    </div>
  );
}

export default CorporateActions;
