import { useMemo, useState } from "react";
import RangeDatePicker from "../../../Components/Common/rangeDatePicker/RangeDatePicker";
import Loader from "../../../Layout/Loader/Loader";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import {
  colorAndBgColorDependOnNumber,
  formatDate,
  formatNumber,
} from "../../../Utils/helpers";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import EmptyRow from "../../../Components/Common/emptyRow/EmptyRow";
import useLang from "../../../Utils/useLang";
function NegotiatedDeals() {
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;
  const { data, isLoading } = useRequest(
    [APIS?.NAGOTIATED_DEALS?.KEY],
    APIS?.NAGOTIATED_DEALS?.URL
  );
  useMemo(() => {
    if (startDate&&endDate) {
      const filteredData = data?.deals?.filter(
        (item) =>
          formatDate(item?.date) >= formatDate(startDate) &&
          formatDate(item?.date) <= formatDate(endDate)
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(data?.deals);
    }
  }, [startDate, endDate, data]);
  const tableHead = [
    { label: useLang("date", "التاريخ") },
    { label: useLang("market price", "سعر السهم") },
    { label: useLang("negotiated price", "سعر الصفقة") },
    { label: useLang("negotiated to market price", "سعر الصفقة إلى السهم") },
    { label: useLang("volume traded", "قيمة الصفقة") },
    { label: useLang("value traded", "كمية الصفقة") },
  ];
  if (isLoading) return <Loader />;
  return (
    <div className="mt-3">
      <RangeDatePicker
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
      />
      <div className="table-responsive mt-4">
        <table className="table table-hover" style={{ minWidth: "800px" }}>
          <thead className="table-light " style={{ verticalAlign: "middle" }}>
            <tr>
              {tableHead?.map((item, idx) => (
                <CustomTd key={idx} label={item?.label} isCentered={idx != 0} />
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              <>
                {filteredData?.map((item, idx) => (
                  <tr key={idx}>
                    <CustomTd
                      isCentered={false}
                      label={formatDate(item?.date)}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.marketPrice),
                      }}
                      label={formatNumber(item?.marketPrice)}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.marketPrice),
                      }}
                      label={formatNumber(item?.negotiatedPrice)}
                    />
                    <CustomTd
                      style={{
                        color: colorAndBgColorDependOnNumber(item?.marketPrice),
                      }}
                      label={`${formatNumber(item?.negotiatedToMarketprice)} %`}
                    />

                    <CustomTd label={formatNumber(item?.volumeTraded)} />
                    <CustomTd label={formatNumber(item?.valueTraded)} />
                  </tr>
                ))}
              </>
            ) : (
              <EmptyRow colSpan={7} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NegotiatedDeals;
