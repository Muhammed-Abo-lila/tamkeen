const CustomTd = ({ children, label, isCentered = true, style,height="40px",lineHeight="40px",colSpan,rowSpan}) => {
  return (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={`text-capitalize ${isCentered ? "text-center" : ""}`}
      style={{ ...style, height:height,lineHeight:lineHeight }}
    >
      <span className={`${!isCentered&&"ps-2"}  d-inline-block`}>{label || children}</span>
    </td>
  );
};
export default CustomTd;
