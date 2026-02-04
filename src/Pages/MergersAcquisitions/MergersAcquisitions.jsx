import APIS from "../../services/APIS";
import useRequest from "../../Utils/useRequest";
import useLang from "../../Utils/useLang";
import CustomTd from "../../Components/Common/customTd/CustomTd";
import { formatNumber } from "../../Utils/helpers";
import SkeletonTable from "../../Components/UI/SkeletonTable/SkeletonTable";
function MergersAcquisitions() {
  const { data, isLoading } = useRequest(
    [APIS?.MERGERS?.KEY],
    APIS?.MERGERS?.URL
  );
  const tableHead = [
    {
      label: useLang("date", "التاريخ"),
    },
    {
      label: useLang("first party", "الطرف الأول"),
    },
    {
      label: useLang("second party", "الطرف الثاني"),
    },
    {
      label: useLang("related parties", "أطراف ذات علاقة"),
    },
    {
      label: useLang("value (million)", "القيمة (مليون)"),
    },
    {
      label: useLang("type", "النوع"),
    },
    {
      label: useLang("status", "الحالة"),
    },
  ];

  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover" style={{ minWidth: "800px" }}>
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
        {isLoading ? (
          <SkeletonTable columns={1} rows={5} />
        ) : (
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <CustomTd label={item.announcedOn} isCentered={false} />

                <CustomTd>
                  {item?.acquirers && item?.acquirers?.length > 0
                    ? item?.acquirers.map((item, idx) => (
                        <span key={idx}>
                          {useLang(item?.companyNameEn, item?.companyNameAr)}
                        </span>
                      ))
                    : "-"}
                </CustomTd>
                <CustomTd>
                  {item?.targets && item?.targets?.length > 0
                    ? item?.targets.map((item, idx) => (
                        <span key={idx}>
                          {useLang(item?.companyNameEn, item?.companyNameAr)}
                        </span>
                      ))
                    : "-"}
                </CustomTd>

                <CustomTd>
                  {item?.relatedCompanies && item?.relatedCompanies?.length > 0
                    ? item?.relatedCompanies.map((item, idx) => (
                        <span key={idx}>
                          {useLang(item?.companyNameEn, item?.companyNameAr)}
                        </span>
                      ))
                    : "-"}
                </CustomTd>

                <CustomTd label={formatNumber(item.acquisitionValue)} />
                <CustomTd
                  label={useLang(
                    item.acquisitionTypeNameEn,
                    item.acquisitionTypeNameAr
                  )}
                />
                <CustomTd
                  label={useLang(
                    item.acquisitionStatusNameEn,
                    item.acquisitionStatusNameAr
                  )}
                />
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default MergersAcquisitions;
