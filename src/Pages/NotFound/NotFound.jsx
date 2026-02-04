import useLang from "../../Utils/useLang";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="error-code">404</div>
          <div className="error-icon">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>

        <div className="not-found-text">
          <h1 className="not-found-title text-capitalize">
            {useLang("Page Not Found", "الصفحة غير موجودة")}
          </h1>
          <p className="not-found-description">
            {useLang(
              "The page you're looking for doesn't exist or has been moved. Please check the URL",
              "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يرجى التحقق من الرابط",
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotFound;