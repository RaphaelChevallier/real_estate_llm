import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: any) {
  const session = await getServerSession();
  const { email } = await request.json();
  if (session?.user?.email == email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const getAllAiMessages = await prisma.aiMessage.findMany({
          where: {
            UserId: user.id,
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const getAllUserMessages = await prisma.userMessage.findMany({
          where: {
            UserId: user.id,
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        let allAiMessages = getAllAiMessages.map((item) => {
          return {
            from: "ai",
            message: item.answer,
            createdAt: item.createdAt,
          };
        });
        let allUserMessages = getAllUserMessages.map((item) => {
          return {
            from: "user",
            message: item.userQuery,
            createdAt: item.createdAt,
          };
        });
        let allMessages = [...allAiMessages, ...allUserMessages].sort(
          (a, b) => a["createdAt"].getTime() - b["createdAt"].getTime()
        );
        return Response.json({ status: 200, data: allMessages });
      } else {
        return Response.json({ status: 500, msg: "User was not found" });
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return Response.json({ status: 409, msg: e });
      } else {
        return Response.json({ status: 500, msg: e });
      }
    }
  }
}
