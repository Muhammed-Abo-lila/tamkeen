import { useMemo, useState } from "react";
import useRequest from "../Utils/useRequest";
import useLang from "../Utils/useLang";
import APIS from "../services/APIS";
import { exportToExcel, getLastFiveYears } from "../Utils/helpers";
const usePeersSelections = (tabName, customTabs) => {
  const PeriodTabs = customTabs || [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
    {
      label: useLang("interim", "مرحلي"),
      tab: "interim",
    },
  ];
  // active tabs
  const [activeTab, setActiveTab] = useState("annual");
  const [choosenCurrency, setChoosenCurrency] = useState({
    value: "sar",
    label: useLang("Riyal", "ريال"),
  });
  //get last five years
  const allYears = useMemo(() => getLastFiveYears(), []);
  const [choosedYear, setChoosedYear] = useState(allYears[1]);
  // quarters data
  const [activeQuarter, setActiveQuarter] = useState({label: useLang("q1", "الربع الأول"), value: "q1" });
const quarters = [
  { label: useLang("q1", "الربع الأول"), value: "q1" },
  { label: useLang("q2", "الربع الثاني"), value: "q2" },
  { label: useLang("q3", "الربع الثالث"), value: "q3" },
  { label: useLang("q4", "الربع الرابع"), value: "q4" },
];

  // interims data
  const [activeInterim, setActiveInterim] = useState({ label: useLang("i1","الفصل الأول"), value: "i1" });
const interims = [
  { label: useLang("i1","الفصل الأول"), value: "i1" },
  { label: useLang("i2","الفصل الثاني"), value: "i2" },
  { label: useLang("i3","الفصل الثالث"), value: "i3" },
  { label: useLang("i4","الفصل الرابع"), value: "i4" },
];
  const [isCurrent, setIsCurrent] = useState(false);
  // get peers ranking table data using useRequest
  const { data, isLoading } = useRequest(
    [
      APIS.PEERS.KEY,
      tabName,
      useLang("en","ar"),
      activeTab,
      choosedYear?.value,
      activeQuarter,
      activeInterim,
      isCurrent
    ],
    `${
      APIS.PEERS.URL
    }/${useLang("en","ar")}?tabName=${tabName}&fiscalPeriodType=${activeTab}&fiscalPeriod=${
      activeTab == "annual"
        ? "year"
        : activeTab == "quarter"
        ? activeQuarter?.value
        : activeInterim?.value
    }&fiscalYear=${choosedYear?.value}&isCurrent=${isCurrent}`
  );
  const handleExportToExcel = async () => {
    const formData = {
      tabName: tabName,
      languageId: useLang(2, 1),
      currency: choosenCurrency.value == "riyal" ? 3 : 10,
      year: choosedYear?.value,
      period:
        activeTab == "annual"
          ? "year"
          : activeTab == "quarter"
          ? activeQuarter?.value
          : activeInterim?.value,
    };
    const generalFileName=`peers-general.xlsx`
    const fileName = `peers-${tabName}-${choosedYear?.value}${
      activeTab == "quarter" ? `-${activeQuarter?.value}` : ""
    }${activeTab == "interim" ? `-${activeInterim?.value}` : ""}-${useLang(
      "en",
      "ar"
    )}-${choosenCurrency.value}.xlsx`;
    await exportToExcel("get-company-competitor", formData,tabName==="general"?generalFileName:fileName);
  };
  return {
    PeriodTabs,
    activeTab,
    setActiveTab,
    allYears,
    setChoosedYear,
    choosedYear,
    quarters,
    setActiveQuarter,
    activeQuarter,
    interims,
    setActiveInterim,
    activeInterim,
    choosenCurrency,
    setChoosenCurrency,
    isCurrent,
    setIsCurrent,
    handleExportToExcel,
    data,
    isLoading,
  };
};
export default usePeersSelections;
