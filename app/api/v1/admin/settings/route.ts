import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { getSettingsData, updateSettings } from "@/services/backend/setting.service";
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};


export const PUT = async(req: NextRequest, res: NextResponse) => {
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

  const body = await req.json();
  try {
    const res = await updateSettings(body);
    return NextResponse.json({  
        message: "Settings Updated successfully"
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message: "Error in updating settings"
    })
  }
}

export const GET = async(req: NextRequest, res: NextResponse) => {
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
    const res = await getSettingsData();
    if(res){
        return NextResponse.json({
            res
        })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message: "Error in getting settings"
    })
  }
}