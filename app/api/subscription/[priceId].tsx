import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { prisma } from "../../../lib/prisma";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""
);
console.log(stripe);
export async function GET(req: Request, res: Response) {
  console.log("here");
  // const { priceId } = req.query;
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ? session.user.email : "" },
  });

  const lineItems = [
    {
      // price: priceId,
      quantity: 1,
    },
  ];

  const stripeSession = await stripe.checkout.sessions.create({
    customer: user?.stripeId ? user.stripeId : "",
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancelled`,
    metadata: {
      userId: user?.id ? user.id : "",
    },
  });

  // res.json({ id: stripeSession.id });
}
