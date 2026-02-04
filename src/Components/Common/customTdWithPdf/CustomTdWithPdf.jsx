import CustomTd from '../customTd/CustomTd'
import { Link } from 'react-router-dom'
const CustomTdWithPdf = ({ fileEn, fileAr }) => {
  return (
     <CustomTd>
      {fileAr || fileEn ? (
        <i
          className="bi bi-file-earmark-pdf custom-fs-4"
          style={{ color: "var(--danger-color)" }}
        ></i>
      ) : (
        <span className="fw-bold custom-fs-6">-</span>
      )}
      {fileAr && (
        <Link
          className="p-1 text-uppercase fw-bold custom-fs-6"
          to={fileAr}
          target="_blank"
        >
          ar
        </Link>
      )}
      {fileEn && (
        <Link
          className="p-1 text-uppercase fw-bold custom-fs-6"
          to={fileEn}
          target="_blank"
        >
          en
        </Link>
      )}
    </CustomTd>
  )
}
export default CustomTdWithPdf