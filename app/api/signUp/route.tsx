import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "./../../../lib/prisma";

export async function POST(request: any) {
  const { firstName, lastName, email, company, password } =
    await request.json();
  const hashed = await hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        company,
        password: hashed,
        settings: {
          create: {},
        },
      },
    });
    return Response.json({ status: 200, user: { email: user.email } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") return Response.json({ status: 409, msg: e });
    } else {
      return Response.json({ status: 500, msg: e });
    }
  }
}
