"use server";

import { render } from '@react-email/render';
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { PasswordResetTemplate } from "../../components/emails/PasswordResetTemplate";
import { prisma } from "../../lib/prisma";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export async function resetPassword(email, token, password){
    const hashed = await hash(password, 12);
    try {
        let decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        const databaseToken = await prisma.user.findFirst({
            where: {
                email: decodeURIComponent(email)
            },
            include: {
                settings : true
            }
        })
        if(decoded){
            const resetPassword = await prisma.user.update({
                where: {
                    id: databaseToken.id
                },
                data: {
                    password: hashed,
                    settings : { update: { where: { UserId: databaseToken.id }, data: { ResetPasswordToken : null}}}
                }
            })
        } else {
            return {error: true, message: { err: "Token has Expired. Please try again"}}  
        }
      } catch(err) {
        return {error: true, message: JSON.stringify(err)}
      }
    return {error: false, message: "Successful Password Reset! You will be redirected to login in 3 seconds."}
}

export async function sendResetPasswordEmail(email) {
    const emailFound = await findEmail(email)
    if(emailFound){
        const passwordToken = generateResetPasswordToken(emailFound)
        const passwordReset = await savePasswordHash(passwordToken, emailFound.id)
        const sendEmail = sendPasswordResetEmail(emailFound.email, passwordToken, emailFound.firstName, emailFound.lastName)
        if (sendEmail.error){
            return {error: true, message: "The server had an error sending a recovery email"}
        }
        return {error: false, message: "Sent a recovery email to your inbox. Please click the link when you get it."}
    }
}

function sendPasswordResetEmail(email, passwordToken, firstName, lastName) {
    try {
          let myHeaders = new Headers();
          myHeaders.append("accept", "application/json");
          myHeaders.append("api-key", process.env.BREVO_API_KEY);
          myHeaders.append("content-type", "application/json");
          const emailHtml = render(<PasswordResetTemplate firstName={firstName} lastName={lastName} passwordToken={passwordToken} email={email}/>)
  
          let raw = JSON.stringify({
            sender: {
              name: "Password Reset Data Dive Homes",
              email: "password.reset@datadivehomes.com",
            },
            to: [
              {
                email: email,
                name: firstName + " " + lastName,
              },
            ],
            subject: "Data Dive Homes Reset Password Link",
            htmlContent: emailHtml
          });
  
          let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
  
          fetch("https://api.brevo.com/v3/smtp/email", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        revalidatePath("/");
        return { error: false, message: "\u2713 Message Sent!" };
      } catch (e) {
        console.log(e)
        return { error: true, message: "There was an error. Please try again later." };
      }
}

function generateResetPasswordToken(user) {
    return jwt.sign({ email: user.email }, process.env.NEXTAUTH_SECRET, {
      expiresIn: '15m',
    });
}

async function savePasswordHash(token, userId){
    const passwordResetHash = await prisma.user_Settings.upsert({
        where: {
            UserId: userId
        },
        update:{
            ResetPasswordToken: token
        },
        create: {
            UserId: userId,
            ResetPasswordToken: token
        }
    })
    return passwordResetHash
}

async function findEmail(emailInput){
    const email = await prisma.user.findFirst({
        where: {
            email: emailInput
        },
    });
    return email
}