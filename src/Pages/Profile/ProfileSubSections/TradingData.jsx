import useLang from "../../../Utils/useLang";
import { formatNumber, getMonthName } from "../../../Utils/helpers";
import CustomTable from "../../../Components/UI/CustomTable/CustomTable";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CurrencyBtn from "../../../Components/Common/CurrencyBtn/CurrencyBtn";
function TradingData({ data }) {
  const tradingDataItems = [
    {
      label: useLang("stock market", "سوق التداول"),
      value: useLang(data?.marketNameEn, data?.marketNameAr),
    },
    {
      label: useLang("fiscal year end", "نهاية السنة المالية"),
      value: getMonthName(data?.yearEndMonth),
    },
    {
      label: useLang("free float (M)", "الأسهم الحرة (مليون)"),
      value: formatNumber(data?.freeFloatShareValue),
    },
    {
      label: useLang("free float %", "الأسهم الحرة %"),
      value: formatNumber(data?.percentage),
      percentageSymbol: "%",
    },
    {
      label: useLang("weight in index %", "وزن الشركة %"),
      value: formatNumber(data?.companyWeight),
      percentageSymbol: "%",
    },
    {
      label: useLang(
        "3M average volume",
        "متوسط حجم التداول (سهم) لآخر 3 أشهر"
      ),
      value: formatNumber(data?.avgVolume3Months),
    },
    {
      label: useLang(
        "3M average transactions",
        "متوسط عدد الصفقات اليومية - آخر 3 أشهر"
      ),
      value: formatNumber(data?.avgTransactions3Months),
    },
  ];

  return (
    <div>
      <div className="d-flex flex-wrap row-gap-2 justify-content-between align-items-center">
        <h2 className="section-title p-0">
          {useLang("trading data", "بيانات التداول")}
        </h2>
        <div style={{ visibility: "hidden" }}>
          <CurrencyBtn />
        </div>
      </div>

      <CustomHr style="m-0 my-1"/>
      <CustomTable tableData={tradingDataItems} />
    </div>
  );
}

export default TradingData;
