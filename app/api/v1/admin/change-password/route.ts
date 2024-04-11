import { changeUserPassword } from "@/services/backend/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const id = body.id;
  const newPassword = body.newPassword;
  const oldPassword = body.oldPassword;
  console.log(body);
  try {
    const response = await changeUserPassword(id, newPassword, oldPassword);
    if(!response){
        return NextResponse.json({
            message: "Incorrect Password"
        },{
            status: 400
        })
    }
    return NextResponse.json({
      message: "Password Updated Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error in Changing User Password.",
    });
  }
}
