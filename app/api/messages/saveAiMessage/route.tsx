import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "./../../../../lib/prisma";

export async function POST(request: any) {
  const session = await getServerSession();
  const { message } = await request.json();
  if (session?.user?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });
      if (user) {
        console.log(user);
        const saveMessage = await prisma.aiMessage.create({
          data: {
            UserId: user.id,
            answer: message,
          },
        });
      }
      return Response.json({ status: 200 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return Response.json({ status: 409, msg: e });
      } else {
        return Response.json({ status: 500, msg: e });
      }
    }
  }
}
