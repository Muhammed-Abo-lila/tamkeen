import "./CustomDropdown.css"
const CustomDropdown = ({label,list,choosenValue,setChoosenValue}) => {
  return (
   <div className="custom-dropdown w-fit d-flex justify-content-center align-items-center gap-2 text-capitalize px-2">
          <span>{label}</span>
          <div className="dropdown py-1 rounded-3">
            <div className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
              <span>{choosenValue}</span>
              <span className="bi bi-chevron-down icon custom-fs-6"></span>
            </div>
            <ul className="dropdown-menu">
              {list?.map((item,idx)=>
                <li key={idx} onClick={()=>setChoosenValue(item)}>{item?.value||item?.label}</li>
              )}
            </ul>
          </div>
        </div>
  )
}
export default CustomDropdown