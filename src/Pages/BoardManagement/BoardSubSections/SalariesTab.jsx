import { useState } from "react";
import useLang from "../../../Utils/useLang";
import { formatNumber } from "../../../Utils/helpers";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import { useOutletContext } from "react-router-dom";
function SalariesTab() {
  const { salaries } = useOutletContext();
  const [selectedYear, setSelectedYear] = useState(2024);
  const selectedItem = salaries.find((item) => item.year === selectedYear);
  const tableHead = [
    { label: useLang("details", "التفاصيل") },
    { label: useLang("members", "الأعضاء") },
    { label: useLang("executives", "المديرون التنفيذيون") },
    { label: useLang("total", "الإجمالي") },
  ];
  return (
    <div className="mt-4">
      {/* Years */}
      <div className="salaries-bar d-flex justify-content-between align-items-center flex-wrap mb-4">
        {salaries.slice(0, 5)?.map((item, idx) => (
          <div
            key={idx}
            className={`salary-bar-item ${
              item?.year === selectedYear && "active"
            }`}
            onClick={() => setSelectedYear(item?.year)}
          >
            {item?.year}
          </div>
        ))}
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-hover" style={{ minWidth: "700px" }}>
          <thead className="table-light">
            <tr>
              {tableHead.map((item, idx) => (
                <CustomTd
                  key={idx}
                  label={item.label}
                  isCentered={idx === 0 ? false : true}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <CustomTd
                label={useLang(
                  "salaries (million riyal) ",
                  "الرواتب (مليون ريال)"
                )}
                isCentered={false}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.boardMembersRenumerations?.salaries || "-"
                )}
              />
              <CustomTd
                label={formatNumber(
                  selectedItem?.executivesRenumerations?.salaries || "-"
                )}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.totalsRenumerations?.salaries || "-"
                )}
              />
            </tr>

            <tr>
              <CustomTd
                label={useLang(
                  "bonuses (million riyal) ",
                  "المكافآت (مليون ريال)"
                )}
                isCentered={false}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.boardMembersRenumerations?.bonuses || "-"
                )}
              />
              <CustomTd
                label={formatNumber(
                  selectedItem?.executivesRenumerations?.bonuses || "-"
                )}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.totalsRenumerations?.bonuses || "-"
                )}
              />
            </tr>

            <tr>
              <CustomTd
                label={useLang(
                  "benefits (million riyal) ",
                  "المزايا الأخرى (مليون ريال)"
                )}
                isCentered={false}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.boardMembersRenumerations?.otherRewards || "-"
                )}
              />
              <CustomTd
                label={formatNumber(
                  selectedItem?.executivesRenumerations?.otherRewards || "-"
                )}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.totalsRenumerations?.otherRewards || "-"
                )}
              />
            </tr>

            <tr className="table-light" style={{ fontWeight: "600" }}>
              <CustomTd
                label={useLang("total", "الإجمالي")}
                isCentered={false}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.boardMembersRenumerations?.total || "-"
                )}
              />
              <CustomTd
                label={formatNumber(
                  selectedItem?.executivesRenumerations?.total || "-"
                )}
              />

              <CustomTd
                label={formatNumber(
                  selectedItem?.totalsRenumerations?.total || "-"
                )}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalariesTab;
