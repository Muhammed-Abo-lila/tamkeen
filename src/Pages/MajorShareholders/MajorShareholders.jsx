import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import { useState } from "react";
import MajorShareholdersTab from "./majorShareholdersSubsections/MajorShareholdersTab";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
import useLang from "../../Utils/useLang";
import ForeignOwnership from "./majorShareholdersSubsections/ForeignOwnership";
import HistoricalChanges from "./majorShareholdersSubsections/HistoricalChanges";
import SkeletonTable from "../../Components/UI/SkeletonTable/SkeletonTable";
function MajorShareholders() {
  const [chartActiveTab, setChartActiveTab] = useState("major");
  const chartTabs = [
    {
      label: useLang("major shareholders", "المساهمين الرئيسيين"),
      tab: "major",
    },
    {
      label: useLang("historical changes", "التطورات التاريخية"),
      tab: "historical",
    },
  ];
  // getting data
  const { data: majorShareholdersData, isLoading } = useRequest(
    [APIS?.MAJOR_SHAREHOLDERS?.KEY],
    APIS?.MAJOR_SHAREHOLDERS?.URL
  );
  return (
    <div>
      <NestedNavs
        tabs={chartTabs}
        activeTab={chartActiveTab}
        setActiveTab={setChartActiveTab}
      />
      {isLoading ? (
        <SkeletonTable columns={1} rows={10} />
      ) : (
        <>
          {chartActiveTab === "major" ? (
            <>
              <MajorShareholdersTab
                majorData={majorShareholdersData?.shareholders}
              />
              <ForeignOwnership
                foreignData={majorShareholdersData?.foreignOwnerships}
              />
            </>
          ) : (
            <HistoricalChanges
              historicalData={majorShareholdersData?.shareholdersHistory}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MajorShareholders;
