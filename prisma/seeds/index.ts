import prisma from "@/db";
import { addRolesTableData } from "./add_roles_table";
import { add_users } from "./add_users";
import { addEmailTemplates } from "./add_email_templates";


async function main(){
    addRolesTableData(prisma);
    add_users(prisma);
    addEmailTemplates(prisma);
}
main().then(async()=>{
    await prisma.$disconnect();
})
.catch(async(e)=>{
    console.log(e);
    prisma.$disconnect();
    process.exit(1);
});