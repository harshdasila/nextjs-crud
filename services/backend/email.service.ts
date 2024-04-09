import prisma from "@/db";

export async function getEmailTemplates(){
  try {
    const response = await prisma.um_email_templates.findMany({
      select: {
        et_id: true,
        et_slug: true,
        et_title: true,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error in getting email templates.");
  }
};
export const getTemplate = async (slug: string) => {
  try {
    const response = await prisma.um_email_templates.findUnique({
      where: {
        et_slug: slug,
      },
      select: {
        et_id: true,
        et_slug: true,
        et_title: true,
        et_content: true,
        et_subject: true,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error in getting email template from slug name.");
  }
};

export const updateTemplate = async (slug: string, emailData: any) => {
  try {
    const response = await prisma.um_email_templates.update({
      where: {
        et_slug: slug,
      },
      data: {
        et_content: emailData?.content,
        et_subject: emailData?.subject,
        et_updated_at: new Date(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating email template");
  }
};
