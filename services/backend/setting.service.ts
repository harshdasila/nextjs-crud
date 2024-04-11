import prisma from "@/db"

export async function updateSettings(body: any){
    const updatedSettings = await prisma.um_settings.updateMany({
        where:{
            setting_key: "rowsPerPage",
        },
        data:{
            setting_value: body.rowsPerPage
        }
    })
}

export async function getSettingsData(){
    const settings = await prisma.um_settings.findMany();
    if(settings){
        return settings;
    }
    return false;
}