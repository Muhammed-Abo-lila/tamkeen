//  Loader
import Loader from "../Loader/Loader";
// Formatting Fn
import { formatNumber } from "../../Utils/helpers";
// Data Fetching Hooks
import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import useLang from "../../Utils/useLang";
function CompanySummary() {
  const { data: companyData, isLoading } = useRequest(
    [APIS?.OVERVIEW?.KEY],
    APIS?.OVERVIEW?.URL
  );
  // Loading Hanling
  if (isLoading) return <Loader />;
  return (
    <div
      className="d-flex flex-wrap align-items-center gap-2 border-bottom mb-2 mt-4 mt-lg-0"
      style={{
        color: "var(--main-color)",
        fontWeight: "bold",
        fontSize: "var(--fs-2)",
      }}
    >
      {/* Ticker Data */}
      <div className="p-3 bg-light">
        {companyData?.companyStockSummary?.stockSymbol.slice(0, 4)}
      </div>

      <div className="px-lg-3">
        {/* Company Name */}
        <div>
          <span>
            {useLang(
              companyData?.companyStockSummary?.companyNameEn,
              companyData?.companyStockSummary?.companyNameAr
            )}
          </span>
          <span>
            &#40;
            {useLang(
              companyData?.companyStockSummary?.shortNameEn,
              companyData?.companyStockSummary?.shortNameAr
            )}
            &#41;
          </span>
        </div>

        {/* Values */}
        <div>
          <span>
            {formatNumber(companyData?.companyStockSummary?.closeValue)}
          </span>
          {/* Arrows */}
          <span className="mx-1">
            {companyData?.companyStockSummary?.change > 0 ? (
              <i
                className="bi bi-arrow-up-circle-fill"
                style={{ color: "var(--success-color)" }}
              ></i>
            ) : companyData?.companyStockSummary?.change === 0 ? (
              <i
                className="bi bi-dash-circle-fill"
                style={{ color: "var(--warn-color)" }}
              ></i>
            ) : (
              <i
                className="bi bi-arrow-down-circle-fill"
                style={{ color: "var(--danger-color)" }}
              ></i>
            )}
          </span>
          <span
            className="mx-1"
            style={{
              color:
                companyData?.companyStockSummary?.change > 0
                  ? "var(--success-color)"
                  : companyData?.companyStockSummary?.change === 0
                  ? "var(--warn-color)"
                  : "var(--danger-color)",
            }}
          >
            {formatNumber(companyData?.companyStockSummary?.change)}
          </span>
          <span
            style={{
              color:
                companyData?.companyStockSummary?.change > 0
                  ? "var(--success-color)"
                  : companyData?.companyStockSummary?.change === 0
                  ? "var(--warn-color)"
                  : "var(--danger-color)",
            }}
          >
            {formatNumber(companyData?.companyStockSummary?.percentageChange)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompanySummary;
