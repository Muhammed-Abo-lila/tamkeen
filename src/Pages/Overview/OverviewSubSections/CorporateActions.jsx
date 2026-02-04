import APIS from "../../../services/APIS";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useLang from "../../../Utils/useLang";
import { formatDate, formatNumber } from "../../../Utils/helpers";
import useRequest from "../../../Utils/useRequest";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTable from "../../../Components/UI/CustomTable/CustomTable";
function CorporateActions() {
  const { data: CorporateData } = useRequest(
    [APIS?.OVERVIEW?.KEY],
    `${APIS?.OVERVIEW?.URL}`
  );
  const data = [
    {
      label: useLang("capital (M SAR)", "رأس المال (مليون ريال)"),
      value: formatNumber(CorporateData?.dividendInfo?.capital),
    },
    {
      label: useLang("previous no. of shares (M)", "عدد الأسهم قبل التغير"),
      value: formatNumber(CorporateData?.dividendInfo?.numberOfShares),
    },
    {
      label: useLang("capital change", "نسبة التغير"),
      value: `${formatNumber(
        CorporateData?.dividendInfo?.dividendPercentage
      )}%`,
    },
    {
      label: useLang(
        "current capital (M SAR)",
        "رأس المال بعد التغير (مليون ريال)"
      ),
      value: formatNumber(CorporateData?.dividendInfo?.cashDividend),
    },
    {
      label: useLang(
        "current no. of shares (M)",
        "عدد الأسهم بعد التغير (مليون)"
      ),
      value: CorporateData?.dividendInfo?.dividendPolicy,
    },
    {
      label: useLang("type", "النوع"),
      value: useLang(
        CorporateData?.dividendInfo?.companyDividendStatusNameEn,
        CorporateData?.dividendInfo?.companyDividendStatusNameAr
      ),
    },
    {
      label: useLang("Announcement", "تاريخ الإعلان"),
      value: formatDate(CorporateData?.dividendInfo?.dividendAnnouncedDate),
    },
  ];

  return (
    <div className="border border-top-0">
      <h2 className="section-title overview-sections-title">
        {useLang("corporate actions", "إجراءات الشركة")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      <div>
        <ul
          className="nav nav-tabs gap-3 m-2 mb-0 p-0"
          id="myTab"
          role="tablist"
        >
          <li role="presentation">
            <button
              className="nav-link rounded-0 active text-capitalize custom-fs-5"
              id="devidends"
              data-bs-toggle="tab"
              data-bs-target="#devidends-pane"
              type="button"
              role="tab"
              aria-controls="devidends-pane"
              aria-selected="true"
            >
              {useLang("recent dividends", "أحدث التوزيعات النقدية")}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade table-responsive rounded-0 px-0 border-0 show active"
            id="devidends-pane"
            role="tabpanel"
            aria-labelledby="devidends"
            tabIndex="0"
          >
            <CustomTable tableData={data}/>
          </div>
        </div>
      </div>
      <MoreBtn path="/corporate-actions" title={useLang("more", "المزيد")} />
    </div>
  );
}

export default CorporateActions;
