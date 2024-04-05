import { getAuthToken } from "@/services/frontend/storage.service";
import axios from "axios";

export const useAuth = (setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {

//   const jwtToken = localStorage.getItem("jwtToken");
    const jwtToken = getAuthToken();
  if (!jwtToken || jwtToken == "" || !jwtToken.startsWith("Bearer")) {
    return false;
  }
  async function validateToken(jwtToken: string) {
    try {
      const response = await axios.post("http://localhost:3001/auth/validate", {
        token: jwtToken,
      });
      if(response.status===200){
        setAuthenticated(true)
      }
      else{
        setAuthenticated(false)
      }
    } catch (error) {
        setAuthenticated(false)
    }
  }
  validateToken(jwtToken);
};
