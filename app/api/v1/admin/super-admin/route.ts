import {
  getSuperAdmin,
  updateSuperAdmin,
} from "@/services/backend/superAdmin.service";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export async function GET(req: NextRequest, res: NextResponse) {
  const authHeader = req.headers.get("Authorization");
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  const decoded = await jose.jwtVerify(token, jwtConfig.secret);
  if (decoded.payload.roleId !== 1) {
    return NextResponse.json(
      {
        message: "Only Super Admin have this access!",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const superAdmin = await getSuperAdmin();
    if (superAdmin) {
      return NextResponse.json({
        superAdmin,
      });
    }
  } catch (error) {
    console.log("error in fetching super admin details");
    return NextResponse.json({
      message: "Error in fetching super admin data",
    });
  }
}

