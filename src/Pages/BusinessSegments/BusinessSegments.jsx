import { useState } from "react";
import CustomHr from "../../Components/Common/customHr/CustomHr";
import CustomTd from "../../Components/Common/customTd/CustomTd";
import APIS from "../../services/APIS";
import useLang from "../../Utils/useLang";
import useRequest from "../../Utils/useRequest";
import CurrencyBtn from "../../Components/Common/CurrencyBtn/CurrencyBtn";
import CustomDropdown from "../../Components/Common/customDropdown/CustomDropdown";
import PrintOptions from "../../Components/Common/printOptions/PrintOptions";
import SkeletonTable from "../../Components/UI/SkeletonTable/SkeletonTable";
import {
  changeCurrencyFromRiyalToDollar,
  colorAndBgColorDependOnNumber,
  exportToExcel,
  formatNumber,
} from "../../Utils/helpers";
import ChartModal from "../../Components/Common/ChartModal/ChartModal";
import PieChartModal from "./BusinessSegmentsSubsections/PieChartModal";

function BusinessSegments() {
  const [chartValues, setChartValues] = useState({
    years: [],
    values: [],
    title: "",
  });

  const [pieChartValues, setPieChartValues] = useState([]);

  const [choosenCurrency, setChoosenCurrency] = useState({
    value: "sar",
    label: useLang("Riyal", "ريال"),
  });

  const [activeTab, setActiveTab] = useState({
    label: useLang("annual", "سنوي"),
    tab: "annual",
  });

  const customTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
  ];

  const { data, isLoading } = useRequest(
    [APIS?.BUSINESS_SEGMENTS?.KEY, activeTab?.tab],
    `${APIS?.BUSINESS_SEGMENTS?.URL}${activeTab?.tab == "annual" ? "year" : "quarter"
    }`
  );

  const allYears = [
    ...new Map(
      data?.fsFields
        .flatMap((field) => field.businessSegments)
        .flatMap((segment) => segment?.periodicValues)
        .map((item) => [item.forDate, item.forDate])
    ).values(),
  ].sort((a, b) => b - a);

  const getPiChartData = (field, year) => {
    setPieChartValues(
      field?.businessSegments.map((item) => {
        return {
          label: useLang(
            item?.businessSegmentNameEn,
            item?.businessSegmentNameAr
          ),
          value: item?.periodicValues.find((item) => item?.forDate === year)
            .value,
        };
      })
    );
  };

  const handleExportToExcel = async () => {
    const formData = {
      languageId: useLang(2, 1),
      fromYear: allYears[allYears.length - 1],
      toYear: allYears[0],
      isYearly: activeTab?.tab == "annual",
      isQuarterly: activeTab?.tab == "quarter",
      isInterm: false,
      currencyId: choosenCurrency.value == "sar" ? 3 : 10,
    };
    const fileName = `business-segments-${activeTab?.tab == "annual" ? "yearly" : "quarterly"
      }-${allYears[allYears.length - 1]}-${allYears[0]}-${useLang("en", "ar")}-${choosenCurrency.value
      }.xlsx`;
    await exportToExcel("get-business-segment", formData, fileName);
  };

  return (
    <div className="mt-3">
      {/* section header */}
      <h2 className="section-title mt-2">
        {useLang("segment distribution", "توزيع القطاعات")}
      </h2>

      <CustomHr style="m-2 mb-0" />

      {/* section table */}
      {!isLoading ? (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {data?.businessSegmentsDefinitions?.map((item, idx) => (
                <tr key={idx}>
                  <CustomTd
                    label={useLang(
                      item?.businessSegmentNameEn,
                      item?.businessSegmentNameAr
                    )}
                    isCentered={false}
                    height="25px"
                    lineHeight="25px"
                  />
                  <CustomTd
                    label={useLang(
                      item?.definitionEn || "-",
                      item?.definitionAr || "-"
                    )}
                    height="25px"
                    lineHeight="25px"
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <SkeletonTable columns={1} rows={3} />
      )}

      <div className="d-flex justify-content-between align-items-center my-3">
        <CurrencyBtn
          activeCurrency={choosenCurrency}
          setActiveCurrency={setChoosenCurrency}
        />
        <div className="d-flex justify-content-between align-items-center">
          <CustomDropdown
            list={customTabs}
            choosenValue={activeTab?.label}
            setChoosenValue={setActiveTab}
          />
          <PrintOptions onClick={handleExportToExcel} />
        </div>
      </div>

      {data?.fsFields?.map((field, idx) => (
        <div key={idx} className="table-responsive print-table-wrapper">
          <h2 className="section-title mt-2">
            {useLang(field?.fsFieldNameEn, field?.fsFieldNameAr)}
          </h2>

          <table className="table table-hover custom-fs-6" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead className="table-light">
              <tr>
                <CustomTd
                  label={useLang("Fiscal Period", "الفترة المالية")}
                  colSpan="3"
                  isCentered={false}
                  height="30px"
                  lineHeight="30px"
                />
                {allYears?.map((item, idx) => (
                  <CustomTd
                    key={idx}
                    label={item}
                    // isCentered={activeTab?.tab === "quarter"}
                    height="30px"
                    lineHeight="30px"
                  />
                ))}
              </tr>

              <tr>
                <CustomTd colSpan="3" height="30px" lineHeight="30px" />

                {allYears?.map((_, idx) => (
                  <CustomTd
                    key={idx}
                    label={choosenCurrency?.label}
                    // isCentered={activeTab?.tab === "quarter"}
                    height="30px"
                    lineHeight="30px"
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <CustomTd
                  label={useLang("Business Segments", "قطاعات حسب الأنشطة")}
                  isCentered={false}
                  height="30px"
                  lineHeight="30px"
                  colSpan={2}
                />

                <CustomTd
                  label={useLang("chart", "تشارت")}
                  isCentered={activeTab?.tab === "quarter"}
                  height="30px"
                  lineHeight="30px"
                />

                {allYears?.map((year, idx) => (
                  <CustomTd
                    key={idx}
                    // isCentered={activeTab?.tab === "quarter"}
                    height="30px"
                    lineHeight="30px"
                  >
                    <div className={useLang("ms-1", "me-1")}>
                      <svg
                        className="highlights-chart"
                        data-bs-toggle="modal"
                        data-bs-target="#pieModal"
                        onClick={() => getPiChartData(field, year)}
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="15"
                        height="15"
                        viewBox="0 0 29 29"
                      >
                        <defs>
                          <clipPath id="clipPath">
                            <rect
                              id="Rectangle_1257"
                              data-name="Rectangle 1257"
                              width="15"
                              height="15"
                              fill="var(--main-color)"
                              stroke="#707070"
                              strokeWidth="1"
                            />
                          </clipPath>
                        </defs>
                        <g
                          id="Mask_Group_88"
                          data-name="Mask Group 88"
                          clipPath="url(#cliPath)"
                        >
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="invisible_box" data-name="invisible box">
                              <rect
                                id="Rectangle_1258"
                                data-name="Rectangle 1258"
                                width="20"
                                height="20"
                                fill="none"
                              />
                            </g>
                            <g
                              id="icons_Q2"
                              data-name="icons Q2"
                              transform="translate(1.208 1.208)"
                            >
                              <path
                                id="Path_875"
                                data-name="Path 875"
                                d="M13.292,13.292H2.417a1.208,1.208,0,0,1-1.208-1.208h0A10.935,10.935,0,0,1,12.083,1.208h0a1.208,1.208,0,0,1,1.208,1.208Z"
                                transform="translate(-1.208 -1.208)"
                                fill="var(--main-color)"
                              />
                              <path
                                id="Path_876"
                                data-name="Path 876"
                                d="M16.917,27.792a10.815,10.815,0,0,1-8.035-3.565,11.177,11.177,0,0,1-2.84-7.552h0a.967.967,0,0,1,.967-.967h8.7V6.948a.906.906,0,0,1,.906-.906h0A11.479,11.479,0,0,1,24.408,9,10.875,10.875,0,0,1,17.4,27.792Z"
                                transform="translate(-1.208 -1.208)"
                                fill="var(--main-color)"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </CustomTd>
                ))}
              </tr>

              {field?.businessSegments?.map((segment, idx) => (
                <tr key={idx}>
                  <CustomTd
                    label={useLang(
                      segment?.businessSegmentNameEn,
                      segment?.businessSegmentNameAr
                    )}
                    isCentered={false}
                    height="30px"
                    lineHeight="30px"
                    colSpan={2}
                  />
                  <CustomTd
                    isCentered={activeTab?.tab === "quarter"}
                    height="30px"
                    lineHeight="30px"
                  >
                    <i
                      className="mx-2 bi bi-bar-chart-fill"
                      style={{ color: "var(--main-color)" }}
                      type="button"
                      onClick={() =>
                        setChartValues({
                          years: segment?.periodicValues?.map(
                            (year) => year?.forDate
                          ),
                          values: segment?.periodicValues?.map((year) =>
                            choosenCurrency?.value === "sar"
                              ? year?.value
                              : changeCurrencyFromRiyalToDollar(year?.value)
                          ),
                          title: useLang(
                            segment?.businessSegmentNameEn,
                            segment?.businessSegmentNameAr
                          ),
                        })
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#chartModal"
                    />
                  </CustomTd>
                  {segment?.periodicValues?.map((value, idx) => (
                    <CustomTd
                      key={idx}
                      label={formatNumber(
                        choosenCurrency?.value === "sar"
                          ? value?.value || "-"
                          : changeCurrencyFromRiyalToDollar(value?.value) || "-"
                      )}
                      style={{
                        color: colorAndBgColorDependOnNumber(value?.value),
                      }}

                      height="30px"
                      lineHeight="30px"
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <ChartModal chartValues={chartValues} />
      <PieChartModal chartValues={pieChartValues} />
    </div>
  );
}
export default BusinessSegments;
