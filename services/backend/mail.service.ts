import { config } from "@/config/index.config";
import { EmailInfo } from "@/interfaces/backend/token.interface";
import prisma from "@/db";
import nodemailer from "nodemailer";

async function shootMail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}) {
  const SMTP_EMAIL = config.SMTP_EMAIL.email;
  const SMTP_PASSWORD = config.SMTP_PASSWORD.password;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  const sendMail = await transport.sendMail({
    from: SMTP_EMAIL,
    to,
    subject,
    html: content,
  });
  console.log(sendMail);
}

export const prepareAndSend = async (emailInfo: EmailInfo) => {
  switch (emailInfo.mailType) {
    case "user_registered": {
      sendSignupMail(emailInfo);
      break;
    }
    case "change_password": {
      sendChangePasswordMail(emailInfo);
      break;
    }
  }
};

const sendSignupMail = async (emailInfo: EmailInfo) => {
  let emailContent = await prisma.um_email_templates.findUnique({
    where: {
      et_slug: emailInfo.mailType,
    },
  });
  //edit krna h
  if(emailContent?.et_content){
    emailContent.et_content = emailContent.et_content.replace("[User's Name]", emailInfo.data?.name!)
  }
  shootMail({
    to: emailInfo.email,
    subject: emailContent?.et_subject!,
    content: emailContent?.et_content!,
  })
    .then(() => console.log("success"))
    .catch(() => console.log("erorr in sending mail"));
};


const sendChangePasswordMail = async (emailInfo: EmailInfo) => {
  let emailContent = await prisma.um_email_templates.findUnique({
    where: {
      et_slug: emailInfo.mailType,
    },
  });
  //edit krna h
  if(emailContent?.et_content){
    emailContent.et_content = emailContent.et_content.replace("[User's Name]", emailInfo.data?.name!)
  }
  shootMail({
    to: emailInfo.email,
    subject: emailContent?.et_subject!,
    content: emailContent?.et_content!,
  })
    .then(() => console.log("success"))
    .catch(() => console.log("erorr in sending mail"));
};