import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export async function GET(req: NextRequest, res: NextResponse) {
  const authHeader = req.headers.get("Authorization");
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);
        const id = decoded.payload?.id;
        const role_id = decoded.payload?.roleId;
        return NextResponse.json({
            id,
            role_id
        })
    } catch (err) {
      return NextResponse.json({
        message: "Unauthorized User"
      },{
        status: 401
      })
    }
  }
}
