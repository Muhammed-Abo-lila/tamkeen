import useLang from "../../../Utils/useLang";
const CustomTable = ({ tableData }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover custom-fs-6 mb-0">
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className="text-capitalize">
                <p className="m-0" style={{ paddingInlineStart: "5px" }}>
                  {item.label}
                </p>
              </td>
              <td className={`d-flex align-items-center gap-1  ${useLang("justify-content-end", "justify-content-start flex-row-reverse")}`}>
                <span >
                  {item.value}
                </span>
                <span>{item.percentageSymbol || ""}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
