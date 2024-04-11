import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/schemas/frontend";
import { isSuperAdminExists, isUserExists } from "@/services/backend/user.service";
import { signToken } from "@/services/backend/jwt.service";
import prisma from "@/db"

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const signInData = {
    email,
    password,
  };

  const validationResult = signInSchema.safeParse(signInData);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: "Invalid Input Types",
        errors: validationResult.error.errors,
      },
      {
        status: 422,
      }
    );
  }
  try {
    const userExists = await isSuperAdminExists(email, password);
    if (userExists) {
      const userId = userExists.user_id;
      const user_role_id = userExists.user_role_id!;
      const jwtToken = await signToken(userId, user_role_id);
      const userData = {
        id: userExists.user_id,
        role_id: userExists.user_role_id,
      };
      return NextResponse.json({
        message: "Token Created",
        token: "Bearer " + jwtToken,
        userData: userData,
      });
    } else {
      return NextResponse.json(
        {
          message: "User do not exists.",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error){
    console.log(error)
    return NextResponse.json(
      {
        message: "Error in creating token.",
      },
      {
        status: 402,
      }
    );
  }
}
