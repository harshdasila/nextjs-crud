import dotenv from 'dotenv';
dotenv.config();

export const config = {
    jwt: {
        secret: process.env.JWT_SECRET || ""
    },
    SMTP_PASSWORD: {
        password: process.env.SMTP_PASSWORD
    },
    SMTP_EMAIL: {
        email: process.env.SMTP_EMAIL
    }
}
