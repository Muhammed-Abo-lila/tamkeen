import CustomHr from "../../../Components/Common/customHr/CustomHr";
import useLang from "../../../Utils/useLang";
const BasicInfo = ({ data }) => {
  const infoRows = [
    {
      leftTitle: useLang("City:", "المدينة:"),
      leftValue: useLang(data?.cityNameEn, data?.cityNameAr),

      rightTitle: useLang("Country:", "الدولة:"),
      rightValue: useLang("Saudi Arabia", "المملكة العربية السعودية"),
    },

    {
      leftTitle: useLang("Ownership Type:", "نوع الملكية:"),
      leftValue: useLang(data?.ownershipTypeNameEn, data?.ownershipTypeNameAr),

      rightTitle: useLang("Establishment Date:", "سنة التأسيس:"),
      rightValue: data?.establishedOnYear,
    },

    {
      leftTitle: useLang("Commercial Register:", "السجل التجاري:"),
      leftValue: "1010451749",

      rightTitle: useLang("Website:", "الموقع الإلكتروني:"),
      rightValue: (
        <a
          href={`https://${data?.websiteURL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lowercase"
        >
          {data?.websiteURL}
        </a>
      ),
    },

    {
      leftTitle: useLang("Email:", "البريد الإلكتروني:"),
      leftValue: (
        <a
          href={`mailto:${data?.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lowercase"
        >
          {data?.email}
        </a>
      ),

      rightTitle: useLang("Phone:", "الهاتف:"),
      rightValue: (
        <a href={`tel:${data?.phone}`} style={{ direction: "ltr" }}>
          {data?.phone}
        </a>
      ),
    },

    {
      leftTitle: useLang("Fax:", "الفاكس:"),
      leftValue: <span style={{ direction: "ltr" }}>{data?.fax}</span>,

      rightTitle: useLang("PO Box:", "صندوق البريد:"),
      rightValue: data?.poBoxEn,
    },
  ];

  return (
    <div className="basic-info-section mt-5">
      <h2 className="section-title p-0">
        {useLang("basic information", "معلومات أساسية")}
      </h2>
      <CustomHr style="m-0 my-1" />

      {infoRows.map((item, index) => (
        <div
          key={index}
          className="basic-info-item row row-gap-1 m-0 custom-fs-6 text-capitalize"
        >
          <div className="col-12 col-md-6 col-xl-5 d-flex justify-content-between align-items-center">
            <span style={{ whiteSpace: "nowrap" }}>{item.leftTitle}</span>
            <span>{item.leftValue}</span>
          </div>

          <div className="col-12 col-md-6 col-xl-5 d-flex justify-content-between align-items-center">
            <span style={{ whiteSpace: "nowrap" }}>{item.rightTitle}</span>
            <span>{item.rightValue}</span>
          </div>
        </div>
      ))}

      <div className="basic-info-item row justify-content-between m-0 custom-fs-6 text-capitalize">
        <div className="col-12 col-sm-3 d-flex align-items-center">
          <span style={{ whiteSpace: "nowrap" }}>
            {useLang("Address:", "العنوان:")}
          </span>
        </div>

        <div
          className={`col-12 col-sm-9 p-0 ${useLang(
            "ps-2 ps-md-5",
            "pe-2 pe-md-5"
          )}`}
        >
          <span style={{ direction: "ltr" }}>
            {useLang(data?.addressEn, data?.addressAr)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
