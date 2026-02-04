import {
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../Utils/helpers";
import APIS from "../../../services/APIS";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useLang from "../../../Utils/useLang";
import useRequest from "../../../Utils/useRequest";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
function FinancialRatios() {
  const { data: financialRatiosData } = useRequest(
    [APIS?.OVERVIEW?.KEY],
    `${APIS?.OVERVIEW?.URL}`
  );
  return (
    <div className="border border-top-0 ">
      <h2 className="section-title overview-sections-title">
        {useLang("financial ratios", "النسب المالية")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      <div className="table-responsive mt-2">
        <table className="table table-striped mb-0 custom-fs-6">
          <tbody>
            {financialRatiosData?.financialRatios?.fields?.map(
              (finRate, idx) => (
                <tr key={idx}>
                  <CustomTd
                    isCentered={false}
                    label={`${useLang(finRate?.nameEn, finRate?.nameAr)}:`}
                  />
                  {finRate?.nameEn === "EPS (SAR) (TTM)" ||
                  finRate?.nameEn === "Return on Average Equity (%) (TTM)" ||
                  finRate?.nameEn === "Return on Average Assets (%) (TTM)" ||
                  finRate?.nameEn === "Adjusted P/E (Last12) (TTM)" ? (
                    <CustomTd
                    isCentered={false}
                      style={{
                        textAlign:"end",
                        color: colorAndBgColorDependOnNumber(
                          finRate?.values.value
                        ),
                      }}
                      label={formatNumber(finRate?.values.value)}
                    />
                  ) : (
                    <CustomTd
                     isCentered={false}
                      style={{
                        textAlign:"end"
                      }}
                    label={formatNumber(finRate?.values.value)} />
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
        <MoreBtn
          path="/financial-information/financial-ratios"
          title={useLang("more", "المزيد")}
        />
      </div>
    </div>
  );
}

export default FinancialRatios;
