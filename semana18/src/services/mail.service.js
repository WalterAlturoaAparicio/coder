import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
    service: "gmail",
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.MAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  
export async function sendMailEthereal(mailOptions) {
    try {
      const response = await transporter.sendMail(mailOptions);
      //console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }