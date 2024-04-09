import { PrismaClient } from "@prisma/client";

import {
  createUser,
  deleteUserService,
  getAllUsers,
  getUserDetails,
  isUserPresent,
  updateUserDetails,
} from "@/services/backend/user.service";
import { signUpSchema } from "@/schemas/frontend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
 
  const searchParams = req.nextUrl.searchParams;
  const sortBy = searchParams.get("sortBy")
    ? String(searchParams.get("sortBy"))
    : "user_created_at";
  const sortOrder = searchParams.get("sortOrder")
    ? String(searchParams.get("sortOrder"))
    : "desc";
  const searchQuery = searchParams.get("searchQuery")
    ? String(searchParams.get("searchQuery"))
    : "";
  const recordsPerPage = searchParams.get("recordsPerPage")
    ? Number(searchParams.get("recordsPerPage"))
    : 5;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  try {
    const { listData, totalUser } = await getAllUsers(
      sortBy,
      sortOrder,
      searchQuery,
      recordsPerPage,
      page
    );
    
    return NextResponse.json(
      {
        list: listData,
        totalUsers: totalUser,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Error in fetching data from backend",
      },
      {
        status: 402,
      }
    );
  }
}
