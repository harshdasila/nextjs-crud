import { PrismaClient } from "@prisma/client";
export const addEmailTemplates = async (prisma: PrismaClient) => {
  const changePassword = await prisma.um_email_templates.findFirst({
    where: {
      et_slug: "change_password",
    },
  });
  if (!changePassword) {
    const response = await prisma.um_email_templates.create({
      data: {
        et_slug: "change_password",
        et_subject: "Password Changed Successfully",
        et_title: "Change Password",
        et_content: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Changed Successfully</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; text-align: center; display: flex; justify-content: center; align-items: center; height: 100vh;">
                    <div style="background-color: #fff; border-radius: 8px; padding: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; width: 100%;">
                        <h1 style="color: #333;">Password Changed Successfully</h1>
                        <p style="color: #666; margin-bottom: 20px;">Your password has been successfully changed.</p>
                        <a href="https://example.com/login" style="background-color: #4CAF50; border: none; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">Login to your account</a>
                    </div>
                </body>
                </html>
                `,
      },
    });


    const userRegistered = await prisma.um_email_templates.findFirst({
        where:{
            et_slug: "user_registered"
        }
    });
    if(!userRegistered){
        const res = await prisma.um_email_templates.create({
            data:{
                et_slug: "user_registered",
                et_subject: "Your Account has been Registered",
                et_title: "User Registered",
                et_content: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Our Website</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333;">
                    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #333; text-align: center;">Welcome to Our Website</h1>
                        <p style="color: #666;">Dear User,</p>
                        <p style="color: #666;">Thank you for registering on our website. We are excited to have you as a member of our community.</p>
                        <p style="color: #666;">Here are a few things you can do now:</p>
                        <ul style="color: #666; padding-left: 20px;">
                            <li>Create your profile and update your information.</li>
                            <li>Explore our website and discover exciting features.</li>
                            <li>Connect with other members and start engaging with our community.</li>
                        </ul>
                        <p style="color: #666;">If you have any questions or need assistance, feel free to contact us at support@example.com.</p>
                        <p style="color: #666;">Welcome aboard!</p>
                        <p style="color: #666; font-style: italic;">The Team at Our Website</p>
                    </div>
                </body>
                </html>
                `
            }
        });
    }
  }
};
