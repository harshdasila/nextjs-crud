import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/frontend";
import prisma from "@/db";

import {
  createUser,
  isUserExists,
  isUserPresent,
} from "@/services/backend/user.service";

import { signToken } from "@/services/backend/jwt.service";
import { TokenData } from "@/interfaces/backend/token.interface";
import { config } from "@/config/index.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, password, name, mobileNumber, cnfPassword } = data;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const signUpData = {
    name,
    email,
    password,
    mobileNumber,
    cnfPassword
  };

  const validationResult = signUpSchema.safeParse(signUpData);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: "Invalid Input Types",
        errors: validationResult.error.errors, // Optionally send the validation errors
      },
      {
        status: 422,
      }
    );
  }

  try {
    const userPresent = await isUserPresent(email);
    if (userPresent) {
      return NextResponse.json(
        {
          message: `User with email - ${email} already present.`,
        },
        {
          status: 409,
        }
      );
    } else {
      const user = await createUser(email, name, mobileNumber, hashedPassword);
      const userID = user.user_id;
      const user_role_id = user.user_role_id!;
      const jwtToken = await signToken(userID, user_role_id);
      const userData = {
        id: user.user_id,
        role_id: user.user_role_id,
      };
      return NextResponse.json(
        {
          message: "User Created Successfully.",
          token: "Bearer " + jwtToken,
          userData: userData,
        },
        {
          status: 200,
        }
      );
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: "Error occurred.",
    },{
        status: 500
    });
  }
};
