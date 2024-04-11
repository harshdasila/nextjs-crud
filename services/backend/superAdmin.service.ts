import prisma from "@/db";
import { SuperAdminEditFormData } from "@/interfaces/frontend";

export const getSuperAdmin = async () => {
  const res = await prisma.um_users.findFirst({
    where: {
      user_role_id: 1,
    },
  });
  if (res) {
    return res;
  } else {
    return false;
  }
};

export const updateSuperAdmin = async(userId: number, body: any) => {
  console.log("service m ")
  try {
    const updatedSuperAdmin = await prisma.um_users.update({
      where:{
        user_id: userId
      },
      data:{
        user_email: body.email,
        user_name: body.name,
        user_number: body.number
      }
    });
    return updatedSuperAdmin;
  } catch (error) {
    console.error("Error updating user details:", error);
    return false;
  }
}