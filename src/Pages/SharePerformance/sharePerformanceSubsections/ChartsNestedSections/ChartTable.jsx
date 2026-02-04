// React Hooks
import { useState } from "react";
// Fetching Data
import APIS from "../../../../services/APIS";
import useRequest from "../../../../Utils/useRequest";
// Formatting functions
import {
  colorAndBgColorDependOnNumber,
  formatDate,
  formatNumber,
} from "../../../../Utils/helpers";
import useLang from "../../../../Utils/useLang";
import CustomHr from "../../../../Components/Common/customHr/CustomHr";
import RangeDatePicker from "../../../../Components/Common/rangeDatePicker/RangeDatePicker";
import CustomTd from "../../../../Components/Common/customTd/CustomTd";
import Loader from "../../../../Layout/Loader/Loader";
import PrintOptions from "../../../../Components/Common/printOptions/PrintOptions";
import EmptyRow from "../../../../Components/Common/emptyRow/EmptyRow";
function ChartTable() {
  const [dateRange, setDateRange] = useState([
    new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;
  // Get Data from API
  const { data, isLoading } = useRequest(
    [APIS?.SHARE_PERFORMANCE_TRADING?.KEY, startDate  ,endDate],
    `${APIS?.SHARE_PERFORMANCE_TRADING?.URL}/${formatDate(
      startDate,
      "yearFirst"
    )}/${formatDate(endDate, "yearFirst")}`,
    { enabled: endDate!=null }
  );

  return (
    <div className="mt-3">
      <h2 className="section-title">
        {useLang("trading details", "تفاصيل التداول")}
      </h2>

      <CustomHr style="m-0 my-1" />

      <div className="my-3 d-flex justify-content-between align-items-center gap-5">
        <RangeDatePicker
          startDate={startDate}
          endDate={endDate}
          setDateRange={setDateRange}
        />
        <PrintOptions
          link={`https://www.argaam.com/${useLang(
            "en",
            "ar"
          )}/company-chart/marketid/3?companyid=14277&fromdate=${formatDate(
            startDate,
            "yearFirst"
          )}&todate=${formatDate(endDate, "yearFirst")}`}
        />
      </div>

      <div
        className="table-responsive bg-body rounded position-relative print-table-wrapper"
        style={{ minHeight: "250px" }}
      >
        <table
          className="print-table-wrapper table table-hover custom-fs-6"
          style={{ minWidth: "750px" }}
        >
          {isLoading ? (
            <Loader />
          ) : data?.chartsData?.length > 0 ? (
            <>
              <thead className="table-light">
                <tr className="text-capitalize">
                  <CustomTd
                    isCentered={false}
                    style={{ minWidth: "80px" }}
                    label={useLang("date", "التاريخ")}
                  />
                  <CustomTd label={useLang("price", "السعر")} />
                  <CustomTd label={useLang("change", "التغيير")} />
                  <CustomTd label={useLang("change %", "التغيير %")} />
                  <CustomTd label={useLang("volume", "حجم التداول")} />
                  <CustomTd label={useLang("turnover", "قيمه التداول")} />
                  <CustomTd label={useLang("open", "الإفتتاح")} />
                  <CustomTd label={useLang("high", "الأعلى")} />
                  <CustomTd label={useLang("low", "الأدني")} />
                </tr>
              </thead>
              <tbody>
                {data?.chartsData
                  ?.map((item, idx) => (
                    <tr key={idx}>
                      <CustomTd
                        isCentered={false}
                        label={formatDate(item?.forDate)}
                      />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(item?.close),
                        }}
                        label={formatNumber(item?.close)}
                      />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(item?.change),
                        }}
                        label={formatNumber(item?.change)}
                      />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(
                            item?.percentageChange
                          ),
                        }}
                        label={formatNumber(item?.percentageChange)}
                      />
                      <CustomTd label={formatNumber(item?.volume)} />
                      <CustomTd label={formatNumber(item?.amount)} />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(item?.open),
                        }}
                        label={formatNumber(item?.open)}
                      />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(item?.max),
                        }}
                        label={formatNumber(item?.max)}
                      />
                      <CustomTd
                        style={{
                          color: colorAndBgColorDependOnNumber(item?.min),
                        }}
                        label={formatNumber(item?.min)}
                      />
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </>
          ) : (
            <EmptyRow colSpan={9} />
          )}
        </table>
      </div>
    </div>
  );
}
export default ChartTable;
