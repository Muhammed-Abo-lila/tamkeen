import DatePicker from "react-datepicker";
import "./RangeDatePicker.css"
const RangeDatePicker = ({ startDate, endDate, setDateRange }) => {
  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      dateFormat="dd/MM/yyyy"
      selectsRange
      isClearable
      placeholderText="01/01/2025  -  01/01/2026"
    />
  );
};

export default RangeDatePicker;
