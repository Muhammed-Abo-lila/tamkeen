// Formatting Numbers
import axios from "axios";
import useLang from "./useLang";
import { authenticateAndSaveToken } from "./getToken";

export const formatDate = (date, type) => {
  if (!date) return null;

  let parsedDate;

  try {
    // Handle different date formats
    if (typeof date === "string") {
      // type 1:"2018"
      if (/^\d{4}$/.test(date)) {
        return date;
      }
      // Type 2: "14-07-2025 16:57:00"
      if (
        date.includes("-") &&
        date.includes(" ") &&
        date.split("-")[0].length === 2
      ) {
        const [datePart, timePart] = date.split(" ");
        const [day, month, year] = datePart.split("-");
        parsedDate = new Date(`${year}-${month}-${day}T${timePart}`);
      }
      // Type 3: "2025-05-25T18:24:00"
      else if (date.includes("T") && date.split("-")[0].length === 4) {
        parsedDate = new Date(date);
      }
      // Type 4: "Thu Aug 07 2025 17:32:12 GMT+0300 (Eastern European Summer Time)"
      else if (
        date.includes("GMT") ||
        date.includes("UTC") ||
        date.match(/\w{3} \w{3} \d{2} \d{4}/)
      ) {
        parsedDate = new Date(date);
      } else {
        parsedDate = new Date(date);
      }
    } else {
      parsedDate = new Date(date);
    }

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.warn("Invalid date provided:", date);
      return null;
    }

    // Format to dd/mm/yy
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = String(parsedDate.getFullYear());
    if (type === "yearFirst") {
      return `${year}-${month}-${day}`;
    } else if (type === "YYYY MMMM DD") {
      return `${day} ${getMonthName(month)} ${year}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  } catch (error) {
    console.error("Error parsing date:", date, error);
    return null;
  }
};

// function to formate number
export const formatNumber = (value) => {
  if (value === "-") return "-";
  if (value === null) return "0";
  const num = Number(String(value).replace(/,/g, ""));
  const number = Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return num < 0 ? `(${number})` : number;
};
// change color and bgColor depend on number is plus or minus
export const colorAndBgColorDependOnNumber = (value) => {
  if (value == null) return "var(--warn-color)";
  const str = String(value).trim();
  let number = 0;
  const cleanStr = str.replace(/,/g, "");
  if (cleanStr.startsWith("(") && cleanStr.endsWith(")")) {
    number = -Number(cleanStr.replace(/[()]/g, ""));
  } else {
    number = Number(cleanStr);
  }
  return number > 0
    ? "var(--success-color)"
    : number < 0
    ? "var(--danger-color)"
    : "var(--warn-color)";
};

// get last five years
export const getLastFiveYears = () => {
  const currentYear = new Date().getFullYear() - 1;
  const years = [];
  for (let year = currentYear - 4; year <= currentYear; year++) {
    years.push({ value: year });
  }
  return years.reverse();
};
// function to chane riyal to dollar
export const changeCurrencyFromRiyalToDollar = (number) => {
  if (number === "-") return "-";
  const num = Number(number);
  if (isNaN(num)) return "-";
  return num / 3.75;
};
export const exportToExcel = async (url, formData, fileName) => {
  const token = await authenticateAndSaveToken();
  try {
    const response = await axios.get(
      `https://data.argaam.com/api/v1/json/excel-apis/${url}`,
      {
        params: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(href);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
export const getMonthName = (monthNum) => {
  const date = new Date();
  date.setMonth(monthNum - 1);
  return date.toLocaleString(useLang("en", "ar"), { month: "long" });
};
