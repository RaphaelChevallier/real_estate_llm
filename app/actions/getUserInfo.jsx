"use server";
import { getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getUserId(email, firstName, lastName) {
    const user = await prisma.user.findUnique({
        where: {
          email: email,
          firstName: firstName,
          lastName: lastName
        },
      });
      return user
}

export async function getUserData(email) {
  if(email){
  const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        updatedAt: true,
        createdAt: true,
        company: true,
        lastName: true,
        firstName: true,
        role: true,
        stripeId: true,
        isSubscribed: true,
        availableStates: true,
        settings: true
      }
    });
    return user
  }
  return null
}

export async function getProfileData() {
    const session = await getServerSession(authOptions);
    return session;
  }