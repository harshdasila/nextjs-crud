import { PrismaClient } from "@prisma/client";

export const addRolesTableData = async(prisma: PrismaClient) => {

    const superUserRole = await prisma.um_roles.findFirst({
        where:{
            role_slug: "super_admin",
        }
    });
    if(!superUserRole?.role_id){
        await prisma.um_roles.create({
            data:{
                role_id: 1,
                role_slug: "super_admin",
                role_name: "Super Admin"
            }
        })
    }

    const adminUserRole = await prisma.um_roles.findUnique({
        where:{
            role_slug: "admin"
        }
    });
    if(!adminUserRole?.role_id){
        await prisma.um_roles.create({
            data:{
                role_id: 2,
                role_slug: "admin",
                role_name: "Admin"
            }
        })
    }

    const managerUserRole = await prisma.um_roles.findUnique({
        where:{
            role_slug: "admin"
        }
    });
    if(!managerUserRole?.role_id){
        await prisma.um_roles.create({
            data:{
                role_id: 3,
                role_slug: "manager",
                role_name: "Manager"
            }
        })
    }

    const teamLeadUserRole = await prisma.um_roles.findUnique({
        where:{
            role_slug: "admin"
        }
    });
    if(!teamLeadUserRole?.role_id){
        await prisma.um_roles.create({
            data:{
                role_id: 4,
                role_slug: "team_lead",
                role_name: "Team Lead"
            }
        })
    }

    const employeeUserRole = await prisma.um_roles.findUnique({
        where:{
            role_slug: "admin"
        }
    });
    if(!employeeUserRole?.role_id){
        await prisma.um_roles.create({
            data:{
                role_id: 5,
                role_slug: "employee",
                role_name: "Employee"
            }
        })
    }
}