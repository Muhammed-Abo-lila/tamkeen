import { useLocation, useNavigate, useParams } from "react-router-dom";
import APIS from "../../../services/APIS";
import useRequest from "../../../Utils/useRequest";
import useLang from "../../../Utils/useLang";
import CustomHr from "../../../Components/Common/customHr/CustomHr";
import parse from "html-react-parser";
import EmptyComp from "../../../Components/Common/EmptyComp/EmptyComp";
import placeholderImg from "../../../Assets/placeholder-profile.webp";
import NotFound from "../../NotFound/NotFound";
import SkeletonTable from "../../../Components/UI/SkeletonTable/SkeletonTable";
function MemeberDetails() {
  const lang = useLang("en", "ar");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const { data, isLoading } = useRequest([APIS?.BOARD?.KEY], APIS?.BOARD?.URL);
  const specificMember = data?.individuals?.find(
    (item) =>
      item?.individualID == id &&
      item?.companyPositionTypeNameEn?.toLowerCase()?.includes(pathParts[2])
  );
  function replaceSpecificColor(html) {
    return html?.replace(
      /style=["']\s*color:\s*#FF6600;\s*["']/gi,
      `style="color: var(--main-color);"`
    );
  }
  if (!isLoading && !specificMember) return <NotFound />;
  return (
    <>
      {isLoading ? (
        <SkeletonTable columns={1} rows={8} />
      ) : (
        <div>
          <div
            className="w-fit d-flex justify-content-center align-items-center gap-1 text-capitalize cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <i
              className={`bi bi-arrow-${useLang(
                "left",
                "right"
              )}-circle-fill custom-fs-2`}
            ></i>
            <span>{useLang("back", "الرجوع")}</span>
          </div>
          <CustomHr />

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3 mt-5">
            <div
              className="img-container"
              style={{ width: "200px", height: "230px" }}
            >
              <img
                src={specificMember?.profilePicURL ?? placeholderImg}
                alt="argaam IR Tamkeen"
                loading="lazy"
                className="w-100 h-100"
              />
            </div>
            <div className="content">
              <h3 className="custom-fs-3 fw-bold">
                {useLang(specificMember?.nameEn, specificMember?.nameAr)}
              </h3>
              <h4 className="custom-fs-4 mt-3">
                {useLang(
                  specificMember?.positionNameEn,
                  specificMember?.positionNameAr
                )}
              </h4>
            </div>
          </div>
          <CustomHr />
          {lang === "en" ? (
            specificMember?.resumeHighLightEn ? (
              <div className="my-3">
                <h3 className="text-capitalize mb-3">highlights</h3>
                <div>
                  {parse(
                    `${replaceSpecificColor(specificMember?.resumeHighLightEn)}`
                  )}
                </div>
              </div>
            ) : (
              <EmptyComp
                text={useLang(
                  "no highlights available",
                  "أبرز المعلومات غير متاحة"
                )}
              />
            )
          ) : lang === "ar" ? (
            specificMember?.resumeHighLightAr ? (
              <div className="my-3">
                <h3 className="text-capitalize mb-3">أبرز المعلومات</h3>
                <div>{parse(`${specificMember?.resumeHighLightAr}`)}</div>
              </div>
            ) : (
              <EmptyComp
                text={useLang(
                  "no highlights available",
                  "أبرز المعلومات غير متاحة"
                )}
              />
            )
          ) : (
            <EmptyComp
              text={useLang(
                "no highlights available",
                "أبرز المعلومات غير متاحة"
              )}
            />
          )}
        </div>
      )}
    </>
  );
}
export default MemeberDetails;