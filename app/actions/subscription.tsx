"use server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""
);

export async function prepareStripeCheckout(priceId: string) {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ? session.user.email : "" },
  });

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];
  let customerId;
  if (!user?.stripeId) {
    const customer = await stripe.customers.create({
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
    });
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        stripeId: customer.id,
      },
    });
    customerId = customer.id;
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer: user?.stripeId ? user.stripeId : customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.NEXTAUTH_URL}/chat`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: {
      userId: user?.id ? user.id : "",
    },
  });

  return stripeSession.id;
}
