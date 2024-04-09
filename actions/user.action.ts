"use server"
import prisma from "@/db";
import { AddUserData } from "@/interfaces/frontend";
import { isUserPresent } from "@/services/backend/user.service";
import verifyToken from "@/services/frontend/jwt.action.service";
import bcrypt from 'bcrypt'
import * as jose from "jose";
import { redirect } from 'next/navigation';

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

const saltRounds = 10;

export async function deleteUser(userId: number, authHeader: any) {
  
  const user = await prisma.um_users.findFirst({
    where:{
      user_id: userId
    }
  })
  if(!user?.user_id){
    return false;
  }
  const response = await prisma.um_users.update({
    where: {
      user_id: userId,
    },
    data: {
      user_deleted_at: new Date().toISOString(),
    },
  });
  if(response){
    return true;
  }
  
  return false;
}

export async function getUserData(userId: number, authHeader: any){
  try{
    const response = await prisma.um_users.findUnique({
      where:{
        user_id: userId
      },
      select:{
        user_name: true,
        user_email: true,
        user_number: true,
        user_created_at: true
      }
    });
    return response;
  }
  catch(error){
    return false;
  }
  
}

export async function addUser(data: AddUserData, authHeader: any){
  try{
    const isEmailPresent = await isUserPresent(data.email);
    if(isEmailPresent){
      return false;
    }
    const hashedPassword = await bcrypt.hash(data.password,saltRounds)
    const response = await prisma.um_users.create({
      data:{
        user_email: data.email,
        user_name: data.name,
        user_number: data.mobileNumber,
        user_password: hashedPassword,
        user_role_id: Number(data.roleId),
      }
    });
    if(response){
      return true;
    }
  }
  catch(error){
    console.log(error);
  }
}