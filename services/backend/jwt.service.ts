import { config } from "@/config/index.config";
import { SignJWT } from 'jose';

export const signToken = async (
  userId: number,
  userRoleId: number
): Promise<string> => {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  const iat = Math.floor(Date.now() / 1000);
  try {
    const jwtToken = await new SignJWT({
      id: userId,
      roleId: userRoleId
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt(iat)
      .setExpirationTime(exp)
      .setSubject(userId.toString()) 
      .sign(new TextEncoder().encode(config.jwt.secret));
    console.log(jwtToken,'sign')
    return jwtToken;
  } catch (error) {
    console.error("Error in signing JWT token:", error);
    throw new Error("Error in signing JWT token.");
  }
};
