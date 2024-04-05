import {
  getUserDetails,
  updateUserDetails,
} from "@/services/backend/user.service";
import { redirect, useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    
    const body = await req.json();
    const id = Number(params.id);
    const updatedUser = await updateUserDetails(id, body);
    return NextResponse.json(
      {
        message: "User updated successfully",
        data: updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error("Failed to update user details");
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = Number(params.id);
  const userData = await getUserDetails(id);
  if (!userData) {
    return NextResponse.json(
      {
        message: `User with id: ${id} not found`,
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      data: userData,
    },
    {
      status: 200,
    }
  );
}
