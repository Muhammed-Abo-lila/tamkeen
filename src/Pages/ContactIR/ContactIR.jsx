
import useLang from "../../Utils/useLang";
const ContactIR = () => {
  /* <MdPermContactCalendar color="#49cae4" size="30" className="mx-2" /> */
  // <CgPhone color="#49cae4" size="30" className="mx-2" />
  //  <MdMarkEmailRead color="#49cae4" size="30" className="mx-2" />
  return (
    <ul className="list-unstyled mt-5 text-capitalize custom-fs-2">
      {/* <li className="mb-4">
        <i
          className="bi bi-person-lines-fill mx-3"
          style={{ color: "var(--main-color)" }}
        ></i>
        {useLang(
          "investor relations contact",
          "معلومات التواصل لعلاقات المستثمرين"
        )}
      </li> */}

      <li className="mb-4">
        <i
          className="bi bi-telephone-fill mx-3"
          style={{ color: "var(--main-color)" }}
        ></i>
        <a
          href="tel:0556676751"
          style={{
            direction: "ltr",
            display: "inline-block",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          0112247001, Ext: 5000
        </a>
      </li>

      <li className="mb-4">
        <i
          className="bi bi-envelope-check-fill mx-3"
          style={{ color: "var(--main-color)" }}
        ></i>
        <a
          href="mailto:investor.relations@smasco.com"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          investor.relations@smasco.com
        </a>
      </li>
    </ul>
  );
};

export default ContactIR;
