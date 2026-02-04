import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authenticateAndSaveToken } from "./getToken"; 
const useRequest = (queryKey, url, options = {}) => {
  const base_url = "https://data.argaam.com";
  const fetchData = async () => {
    try {
      // Always get a valid token
      const token = await authenticateAndSaveToken();
      const res = await axios.get(`${base_url}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Encoding": "gzip, deflate, br, zstd",
        },
        ...options,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to get a new token
        const newToken = await authenticateAndSaveToken();
        const retryRes = await axios.get(`${base_url}/${url}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
            "Content-Encoding": "gzip, deflate, br, zstd",
          },
          ...options,
        });
        return retryRes.data;
      }
      throw error;
    }
  };
 
  return useQuery({
    queryKey,
    queryFn: fetchData,
    ...options,
    staleTime:600000
  });
};
 
export default useRequest;