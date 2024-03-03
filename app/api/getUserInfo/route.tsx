import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "./../../../lib/prisma";

export async function POST(request: any) {
  const session = await getServerSession();
  const { email, message } = await request.json();
  if (session?.user?.email == email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return Response.json({ status: 200, id: user.id });
      } else {
        return Response.json({ status: 404, msg: "user not found" });
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return Response.json({ status: 409, msg: e });
      } else {
        return Response.json({ status: 500, msg: e });
      }
    }
  } else {
    return Response.json({ status: 500, msg: "Not a valid Session" });
  }
}
