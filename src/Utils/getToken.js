import axios from "axios";
import { companies } from "../services/COMPANIES.JS";
function isTokenValid(token) {
  if (!token) return false;
  try {
    return new Date(token?.expireDate) >= new Date();
  } catch (e) {
    return false;
  }
}
export async function authenticateAndSaveToken() {
  const base_url = "https://data.argaam.com";
  const company = window.location.pathname.split("/")[1];
  const companyData = companies[`${company}`];
  const companyDataFromLocalStorage = sessionStorage.getItem("company");
  if (company === companyDataFromLocalStorage) {
    const existingToken = JSON.parse(sessionStorage.getItem("authToken"));
    if (isTokenValid(existingToken)) {
      return existingToken?.token;
    }
  }
  try {
    const response = await axios.post(`${base_url}/authenticate`, {
      username: companyData?.username,
      password: companyData?.password,
    });
    const data = response.data;
    if (data) {
      sessionStorage.setItem(
        "authToken",
        JSON.stringify({
          expireDate: data?.expires,
          token: data?.jwtToken,
        }),
      );
      sessionStorage.setItem("company", company);
      return data?.jwtToken;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}
