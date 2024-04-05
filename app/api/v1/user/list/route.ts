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
  //   const sortBy = req?.query?.sortBy
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
        totalUsers: totalUser.length,
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

// export const deleteUser = async (req: Request, res: Response) => {
//   const userId = Number(req.params.userId);
//   const userId = Number( )
//   try {
//     const deletedUser = deleteUserService(userId);
//     res.status(200).json({
//       message: "User deleted Successfully",
//     });
//   } catch (e) {
//     console.error("Error deleting user:", e);
//     res.status(401).json({
//       message: "Error in deleting user",
//     });
//   }
// };

// export const showUserDetails = async (req: Request, res: Response) => {
//   const userId = Number(req.params.userId);
//   const userData = await getUserDetails(userId);
//   res.status(200).json({
//     data: userData,
//   });
// };

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const userId = Number(req.params.userId);

//     const updatedUser = await updateUserDetails(userId, body);
//     res.status(200).json({
//       message: "User updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user details:", error);
//     throw new Error("Failed to update user details");
//   }
// };

// export const addUser = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     const { email, password, name, mobileNumber, userRole } = data;
//     const addUserData = {
//       name,
//       email,
//       password,
//       mobileNumber,
//       userRole,
//     };
//     const validationResult = signUpSchema.safeParse(addUserData);
//     if (!validationResult.success) {
//       res.status(422);
//       return res.json({
//         message: "Invalid Input Types",
//         errors: validationResult.error.errors, // Optionally send the validation errors
//       });
//     }

//     const userPresent = await isUserPresent(email);
//     if (userPresent) {
//       return res.status(409).json({
//         message: `User with email - ${email} already present.`,
//       });
//     } else {
//       const user = await createUser(
//         email,
//         name,
//         mobileNumber,
//         password,
//         userRole
//       );
//       const userID = user.user_id;
//       const user_role_id = user.user_role_id;
//       return res.status(200).json({
//         message: "User Added Successfully.",
//       });
//     }
//   } catch (error: any) {
//     console.log(error);
//     res.json({
//       message: "Error occurred",
//     });
//   }
// };
