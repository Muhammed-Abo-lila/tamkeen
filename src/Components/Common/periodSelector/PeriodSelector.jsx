import "./PeriodSelector.css";
const PeriodSelector = ({ priodList,periodType,setPeriodType }) => {
  return (
    <ul className="period-selector list-unstyled d-flex justify-content-center align-items-center p-0 rounded-2 text-capitalize overflow-hidden m-0">
      {priodList?.map((item, idx) => (
        <li key={idx} className={`py-1 px-3 cursor-pointer  ${periodType==item?.tab?"active-period":""}`} onClick={()=>setPeriodType(item?.tab)}>{item?.label}</li>
      ))}
    </ul>
  );
};

export default PeriodSelector;
