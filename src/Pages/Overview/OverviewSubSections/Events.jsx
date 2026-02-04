import { useState } from "react";
import useRequest from "../../../Utils/useRequest";
import EventModal from "../../../Components/UI/EventModal/EventModal";
import MoreBtn from "../../../Components/Common/MoreBtn/MoreBtn";
import useLang from "../../../Utils/useLang";
import { formatDate } from "../../../Utils/helpers";
import APIS from "../../../services/APIS";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import CustomTd from "../../../Components/Common/customTd/CustomTd";
function Events() {
  const [eventData, setEventData] = useState(null);
  const { data: EventsData } = useRequest(
    [APIS?.EVENTS?.KEY],
    `${APIS?.EVENTS?.URL}?recordSize=3`
  );
  return (
    <div className="border border-top-0">
      <h2 className="section-title overview-sections-title">
        {useLang("events", "الفعاليات")}
      </h2>
      <CustomHr style="m-2 mb-0" />
      <div className="table-responsive">
        <table className="table mb-0 table-hover custom-fs-6">
          <thead className="table-light">
            <tr>
              <CustomTd
                isCentered={false}
                label={useLang("date", "تاريخ الحدث")}
              />
              <CustomTd isCentered={false} label={useLang("event", "الحدث")} />
              <CustomTd label={useLang("venue", "الموقع")} />
            </tr>
          </thead>
          <tbody>
            {EventsData?.map((event, idx) => (
              <tr key={idx}>

                <CustomTd  isCentered={false}
                  label={formatDate(event?.occursOn)}
                />

                <CustomTd isCentered={false}>
                  <span
                    className="link-color"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    type="button"
                    onClick={() => setEventData(event)}
                  >
                    {useLang(event?.typeNameEn, event?.typeNameAr)}
                  </span>
                </CustomTd>

                <CustomTd label={useLang(
                    event?.eventLocationEn || "-",
                    event?.eventLocationAr || "-"
                  )}
                />

              </tr>
            ))}
          </tbody>
        </table>
        <MoreBtn path="/disclosures/events" title={useLang("more", "المزيد")} />
      </div>
      <EventModal data={eventData} />
    </div>
  );
}

export default Events;
