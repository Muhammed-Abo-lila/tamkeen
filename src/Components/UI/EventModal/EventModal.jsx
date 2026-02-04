import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useLang from "../../../Utils/useLang";
import { formatDate } from "../../../Utils/helpers";
function EventModal({ data }) {
  const safeDescriptionEn = DOMPurify.sanitize(data?.descriptionEn || "");
  const safeDescriptionAr = DOMPurify.sanitize(data?.descriptionAr || "");
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered  ">
        <div className="modal-content ">
          <div className="modal-header px-3 pt-3 pb-2">
            <h3 className="modal-title custom-fs-4 w-100" id="exampleModalLabel">
              {useLang(data?.titleEn, data?.titleAr)}
            </h3>
            <button
              type="button"
              className="btn-close custom-fs-5 p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <table className="table table-hover custom-fs-6">
              <tbody>
                <tr>
                  <td className="text-capitalize">
                    {useLang("market :", "السوق :")}
                  </td>
                  <td>{useLang(data?.marketNameEn, data?.marketNameAr)}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">
                    {useLang("company :", "الشركة :")}
                  </td>
                  <td>{useLang(data?.companyNameEn, data?.companyNameAr)}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">
                    {useLang("date :", "التاريخ :")}
                  </td>
                  <td>{formatDate(data?.occursOn)}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">
                    {useLang("type :", "نوع الحدث :")}
                  </td>
                  <td>{useLang(data?.typeNameEn, data?.typeNameAr)}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">
                    {useLang("results :", "النتائج :")}
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className="text-capitalize">
                    {useLang("venue :", "موقع الحدث :")}
                  </td>
                  <td>
                    {useLang(data?.eventLocationEn, data?.eventLocationAr)}
                  </td>
                </tr>
              </tbody>
            </table>

            <h4 className="text-capitalize custom-fs-5">
              {useLang("details :", "التفاصيل :")}
            </h4>
            <hr className="m-1" />
            <div className="mt-2 custom-fs-5">
              {useLang(parse(safeDescriptionEn), parse(safeDescriptionAr))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
