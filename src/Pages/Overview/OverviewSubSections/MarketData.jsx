import {
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../Utils/helpers";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import useLang from "../../../Utils/useLang";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
function MarketData() {
  const { data: overviewData } = useRequest(
    [APIS?.OVERVIEW?.KEY],
    `${APIS?.OVERVIEW?.URL}`
  );

  const summary = overviewData?.companyStockSummary;

  const data = [
    {
      leftTitle: useLang("last trade", "آخر سعر"),
      leftValue: formatNumber(summary?.closeValue),

      rightTitle: useLang("volume", "حجم التداول"),
      rightValue: formatNumber(summary?.volume),
    },

    {
      leftTitle: useLang("change", "التغيير"),
      leftValue: formatNumber(summary?.change),
      leftColor: colorAndBgColorDependOnNumber(summary?.change),

      rightTitle: useLang("turnover", "قيمة التداول"),
      rightValue: formatNumber(summary?.amount),
    },

    {
      leftTitle: useLang("change %", "التغيير %"),
      leftValue: formatNumber(summary?.percentageChange),
      leftColor: colorAndBgColorDependOnNumber(summary?.percentageChange),

      rightTitle: useLang("transactions", "عدد الصفقات"),
      rightValue: formatNumber(summary?.contractCount),
    },

    {
      leftTitle: useLang("open", "الافتتاح"),
      leftValue: formatNumber(summary?.openValue),

      rightTitle: useLang("market value", "القيمة السوقية"),
      rightValue: formatNumber(summary?.marketValue),
    },

    {
      leftTitle: useLang("low", "الأدنى"),
      leftValue: formatNumber(summary?.low),

      rightTitle: useLang("avg volume 3M", "متوسط حجم التداول 3 شهور"),
      rightValue: formatNumber(summary?.avgVolume3Months),
    },

    {
      leftTitle: useLang("high", "الأعلى"),
      leftValue: formatNumber(summary?.high),

      rightTitle: useLang("avg turnover 3M", "متوسط قيمة التداول 3 شهور"),
      rightValue: formatNumber(summary?.avgTurnover3Months),
    },

    {
      leftTitle: useLang("prev.close", "الإغلاق السابق"),
      leftValue: formatNumber(summary?.previousCloseValue),

      rightTitle: useLang("avg transactions 3M", "متوسط عدد الصفقات 3 شهور"),
      rightValue: formatNumber(summary?.avgTransactions3Months),
    },

    {
      leftTitle: useLang("change 3M", "التغيير خلال 3 شهور"),
      leftValue: formatNumber(summary?.month3Change) + "%",
      leftColor: colorAndBgColorDependOnNumber(summary?.month3Change),

      rightTitle: useLang("change 12M", "التغيير خلال 12 شهر"),
      rightValue: formatNumber(summary?.ytdChange) + "%",
      rightColor: colorAndBgColorDependOnNumber(summary?.ytdChange),
    },

    {
      leftTitle: useLang("change 6M", "التغيير خلال 6 شهور"),
      leftValue: formatNumber(summary?.month6Change) + "%",
      leftColor: colorAndBgColorDependOnNumber(summary?.month6Change),

      rightTitle: useLang("YTD", "منذ بداية العام"),
      rightValue: formatNumber(summary?.ybgnChange) + "%",
      rightColor: colorAndBgColorDependOnNumber(summary?.ybgnChange),
    },
  ];

  return (
    <div className="trade-mark-section border border-top-0">
      <h2 className="section-title overview-sections-title">
        {useLang("market data", "بيانات السوق")}
      </h2>
      <CustomHr style="m-2 mb-0" />

      {data.map((item, index) => (
        <div
          key={index}
          className="trade-mark-item row row-gap-1 justify-content-between m-0 custom-fs-6 text-capitalize"
        >
          <div className="col-12 col-sm-4 col-md-12 col-xl-4 d-flex justify-content-between align-items-center">
            <span style={{ whiteSpace: "nowrap" }}>{item.leftTitle} :</span>
            <span style={{ color: item.leftColor }}>{item.leftValue}</span>
          </div>

          <div className="col-12 col-sm-7 col-md-12 col-xl-7 d-flex justify-content-between align-items-center">
            <span style={{ whiteSpace: "nowrap" }}>{item.rightTitle} :</span>
            <span style={{ color: item.rightColor }}>{item.rightValue}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketData;
