import { useState } from "react";
import useLang from "../../../Utils/useLang";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../Utils/helpers";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTable from "../../../Components/UI/CustomTable/CustomTable";
import CurrencyBtn from "../../../Components/Common/CurrencyBtn/CurrencyBtn";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
function StockInfo({ data }) {
  const [choosenCurrency, setChoosenCurrency] = useState({
    value: "sar",
    label: useLang("Riyal", "ريال"),
  });
  const StockInfoData = [
    {
      label: useLang("shares outstanding (M) :", "عدد الأسهم (مليون) :"),
      value: formatNumber(data?.numberOfShares),
    },
    {
      label: useLang(
        `par value (${choosenCurrency?.value == "sar" ? "SAR" : "USD"}) :`,
        `القيمة الإسمية  (${
          choosenCurrency?.value == "sar" ? "ريال سعودي" : "دولار أمريكي"
        }) :`
      ),
      value: formatNumber(
        choosenCurrency?.value == "sar"
          ? data?.nominalValue
          : changeCurrencyFromRiyalToDollar(data?.nominalValue)
      ),
    },
    {
      label: useLang(
        `book value (${choosenCurrency?.value == "sar" ? "SAR" : "USD"}) :`,
        `القيمة الدفترية للسهم  (${
          choosenCurrency?.value == "sar" ? "ريال سعودي" : "دولار أمريكي"
        }) :`
      ),
      value: formatNumber(
        choosenCurrency?.value == "sar"
          ? data?.bookValue
          : changeCurrencyFromRiyalToDollar(data?.bookValue)
      ),
    },
    {
      label: useLang("market cap (M) :", "القيمة السوقية (مليون) : "),
      value: formatNumber(data?.marketValue),
    },
  ];

  return (
    <div>
      <div className="d-flex flex-wrap row-gap-2 justify-content-between align-items-center">
        <h2 className="section-title p-0">
          {useLang("stock information", "بيانات السهم")}
        </h2>

        <CurrencyBtn
          activeCurrency={choosenCurrency}
          setActiveCurrency={setChoosenCurrency}
        />
      </div>
     <CustomHr style="m-0 my-1"/>
      <CustomTable tableData={StockInfoData} />
      <MoreBtn
        path="/financial-information/financial-ratios"
        title={useLang("ratios", "المؤشرات")}
      />
    </div>
  );
}

export default StockInfo;
