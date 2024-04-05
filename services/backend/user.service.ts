import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { redirect } from "next/navigation";


export const isUserPresent = async (email: string) => {
  const userPresent = await prisma.um_users.findFirst({
    where: {
      user_email: email,
      user_deleted_at: null,
    },
  });
  return userPresent;
};

export const isUserPresentId = async (id: number) => {
  const userPresent = await prisma.um_users.findUnique({
    where: {
      user_id: id,
      user_deleted_at: null,
    },
  });
  return userPresent;
};


export const createUser = async (
  email: string,
  name: string,
  mobileNumber: string,
  password: string,
  userRole: number = 5
) => {
  try {
    const createdUser = await prisma.um_users.create({
      data: {
        user_email: email,
        user_name: name,
        user_number: mobileNumber,
        user_password: password,
        user_role_id: userRole,
      },
    });
    return createdUser;
  } catch (error) {
    console.log(error)
    throw new Error("Error in creating user.");
  }
};

export const isUserExists = async (email: string, password: string) => {
  try {
    const user = await prisma.um_users.findFirst({
      where: {
        user_email: email,
        // user_password: password,
        user_deleted_at: null,
      },
      select: {
        user_id: true,
        user_role_id: true,
        user_password: true,
      },
    });
    if(!user){
     return false;
    }
    const passwordMatch = await bcrypt.compare(password, user!.user_password);
    if (passwordMatch) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "andar");
    throw new Error("Error in finding user.");
  }
};

export const deleteUserService = async (userId: number) => {
  try {
    const deletedUser = await prisma.um_users.update({
      where: {
        user_id: userId,
      },
      data: {
        user_deleted_at: new Date().toISOString(),
      },
    });
  } catch (e) {
    throw new Error("Error in deleting user.");
  }
};

export const getAllUsers = async (
  sortBy: string,
  sortOrder: string,
  searchQuery: string,
  recordsPerPage: number,
  page: number
) => {
  try {
    const listData = await prisma.um_users.findMany({
      where: {
        user_deleted_at: null,
        OR: [
          { user_name: { contains: searchQuery } },
          { user_email: { contains: searchQuery } },
          { user_number: { contains: searchQuery } },
        ],
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      take: recordsPerPage,
      skip: (page - 1) * recordsPerPage,
    });

    const totalUser = await prisma.um_users.findMany({
      where: {
        user_deleted_at: null,
        OR: [
          { user_name: { contains: searchQuery } },
          { user_email: { contains: searchQuery } },
          { user_number: { contains: searchQuery } },
        ],
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    return { listData, totalUser };
  } catch (e) {
    throw new Error("Error in fetching data");
  }
};


export const getUserDetails = async (userId: number) => {
  try {
    const isPresent = isUserPresentId(userId);
    if(isPresent==null){
      return false;
    }
    const userData = await prisma.um_users.findUnique({
      where: {
        user_id: userId,
      },
    });
    return userData;
  } catch (e) {
    throw new Error("Error in fetching data");
  }
};

export const updateUserDetails = async (userId: number, body: any) => {
  try {
    const userData = await prisma.um_users.update({
      where: {
        user_id: userId,
      },
      data: {
        user_email: body.email,
        user_name: body.name,
        user_number: body.number,
        user_role_id: Number(body.roleId),
      },
    });
    return userData;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error("Failed to update user details");
  }
};
