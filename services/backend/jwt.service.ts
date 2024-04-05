import { config } from "@/config/index.config";
import jwt from "jsonwebtoken";

export const signToken = async (
  userId: number,
  user_role_id: number
): Promise<string> => {
  try {
    const jwtToken = jwt.sign(
      { id: userId, role: user_role_id },
      config.jwt.secret,
      { expiresIn: "7d" }
    );

    return jwtToken;
  } catch (error) {
    console.error("Error in signing JWT token:", error);
    throw new Error("Error in signing JWT token.");
  }
};
