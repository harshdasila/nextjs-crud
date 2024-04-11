import { updateSuperAdmin } from "@/services/backend/superAdmin.service";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  try {
    const body = await req.json();
    const id = Number(params.id);
    console.log(body, id, "ye h updation data");
    const udpatedSuperAdmin = await updateSuperAdmin(id, body);
    return NextResponse.json(
      {
        message: "Super Admin updated successfully",
        data: udpatedSuperAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating Super Admin details:", error);
    return NextResponse.json({
      message: "Error in updating super admin data",
    });
  }
};
