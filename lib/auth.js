import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions = {
    session: {
      strategy: "jwt",
      maxAge: 4 * 60 * 60
    },
    pages: {
      signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "hello@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Please fill in both email and password fields");
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: { settings: true },
          });
          let freeTrial = false
  
          if (!user) {
            throw new Error("This email does not seem to be in our system.");
          }
  
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
  
          if (!isPasswordValid) {
            throw new Error(
              "The credentials were incorrect. Please provide other credentials."
            );
          }
  
          if(new Date() - user.createdAt < 604800000){
            freeTrial = true
          }
  
  
          return {
            id: user.id + "",
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            freeTrial: freeTrial,
            isSubscribed: user.isSubscribed
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ user, token }) {
        if (user) {
          // Note that this if condition is needed
          token.user = { ...user };
        }
        return token;
      },
      async session({ session, token }) {
        if (token?.user) {
          // Note that this if condition is needed
          session.user = token.user;
        }
        return session;
      },
    },
  };

  export default NextAuth(authOptions)