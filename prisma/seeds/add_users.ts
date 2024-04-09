import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'


export const add_users = async(prisma: PrismaClient) => {
    const saltRounds = 10;
    const superUser = await prisma.um_users.findFirst({
        where:{
            user_role_id:1
        }
    });
    if(!superUser?.user_id){
        await prisma.um_users.create({
            data:{
                user_name: "Super Admin",
                user_email: "super@gmail.com",
                user_password: await bcrypt.hash("Super@2222", saltRounds) ,
                user_number: "1111111111",
                user_role_id: 1
            },
            
        })
    }

    const adminUser = await prisma.um_users.findFirst({
        where:{
            user_role_id:2
        }
    });

    if(!adminUser?.user_id){
        await prisma.um_users.create({
            data:{
                user_name: "Admin",
                user_email: "admin@gmail.com",
                user_password: await bcrypt.hash("Admin@2222", saltRounds) ,
                user_number: "2222222222",
                user_role_id: 2
            },
        })
    }
}