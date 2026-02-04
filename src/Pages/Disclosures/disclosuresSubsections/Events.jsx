import { useState } from "react";
import useRequest from "../../../Utils/useRequest";
import APIS from "../../../services/APIS";
import EventModal from "../../../Components/UI/EventModal/EventModal";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
import { formatDate } from "../../../Utils/helpers";
import useLang from "../../../Utils/useLang";
import SkeletonTable from "../../../Components/UI/SkeletonTable/SkeletonTable";

function Events() {
  const tableHead = [
    { label: useLang("Event", "الحدث") },
    { label: useLang("Type", "نوع الحدث") },
    { label: useLang("Company", "الشركة") },
    { label: useLang("Venue", "موقع الحدث") },
    { label: useLang("Details", "التفاصيل") },
  ];
  const [eventData, setEventData] = useState(null);
  const { data: EventsData, isLoading } = useRequest(
    [APIS?.EVENTS?.KEY, "all"],
    APIS?.EVENTS?.URL
  );
  return (
    <>
      <div className="table-responsive">
        {isLoading ? (
          <SkeletonTable columns={1} rows={10} />
        ) : (
          <>
            {EventsData?.map((item, idx) => (
              <table key={idx} className="table" style={{ minWidth: "700px" }}>
                <thead id={item.Event}>
                  <tr>
                    <CustomTd
                      isCentered={false}
                      style={{ color: "var(--main-color)", fontWeight: "bold" }}
                    >
                      <i
                        className={`bi bi-calendar4-range ${useLang(
                          "me-2",
                          "ms-2"
                        )}`}
                      ></i>
                      <span>{formatDate(item?.occursOn, "YYYY MMMM DD")}</span>
                    </CustomTd>
                  </tr>
                  {/* Heads */}
                  <tr className="bg-light shadow-sm table-light border">
                    {tableHead.map((item, idx) => (
                      <CustomTd
                        key={idx}
                        label={item.label}
                        isCentered={!(idx === 0 || idx === 1 || idx === 2)}
                        height="30px"
                      />
                    ))}
                  </tr>
                </thead>

                <tbody className="shadow-sm">
                 <tr>
                   <CustomTd
                    label={useLang(item?.titleEn, item?.titleAr)}
                    isCentered={false}
                    style={{ width: "30%" }}
                  />
                  <CustomTd
                    label={useLang(item?.typeNameEn, item?.typeNameAr)}
                    isCentered={false}
                    style={{ width: "25%" }}
                  />
                  <CustomTd
                    label={useLang(item?.companyNameEn, item?.companyNameAr)}
                    isCentered={false}
                    style={{ width: "15%" }}
                  />
                  <CustomTd
                    label={useLang(
                      item?.eventLocationEn || "-",
                      item?.eventLocationAr || "-"
                    )}
                    style={{ width: "15%" }}
                  />

                  <CustomTd style={{ width: "15%" }}>
                    <span
                      className="link-color"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      type="button"
                      onClick={() => setEventData(item)}
                    >
                      {useLang("details", "Details")}
                    </span>
                  </CustomTd>
                 </tr>
                </tbody>
              </table>
            ))}
          </>
        )}
      </div>
      {/* Getting Event Modal */}
      <EventModal data={eventData} />
    </>
  );
}
export default Events;
