import useLang from "../../../Utils/useLang";
const EmptyRow = ({ label, colSpan }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center text-capitalize custom-fs-3 fw-semibold"
        style={{ height: "150px" }}
      >
        {label || useLang("no data avilable", "لا توجد بيانات متاحه")}
      </td>
    </tr>
  );
};
export default EmptyRow;
