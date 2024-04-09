import * as jose from "jose";
import { NextRequest } from "next/server";
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};
export const isAuthenticated = async (req: NextRequest) => {
  let authHeader = req.headers.get("Authorization");

  let token = authHeader?.split(" ")[1];
  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);

      if (decoded.payload?.id) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("isAuthenticated error: ", err);

      return false;
    }
  } else {
    return false;
  }
};
