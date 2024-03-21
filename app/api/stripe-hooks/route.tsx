import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeSecretKey ? stripeSecretKey : "");

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const rawPayload = await req.text();
  const endpointSecret = process.env.STRIPE_WHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawPayload,
      signature ? signature.toString() : "",
      endpointSecret ? endpointSecret : ""
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ webhook_error: err.message }, { status: 400 });
  }

  const stripeId =
    (event?.data.object as { customer?: string })?.customer ?? "";

  switch (event?.type) {
    case "customer.subscription.created":
      console.log(stripeId);
      if (stripeId) {
        await prisma.user.update({
          where: {
            stripeId,
          },
          data: {
            isSubscribed: true,
          },
        });
      }
      break;
    case "customer.subscription.updated":
      if (stripeId) {
        await prisma.user.update({
          where: {
            stripeId,
          },
          data: {
            isSubscribed: true,
          },
        });
      }
      break;
    case "customer.subscription.deleted":
      await prisma.user.update({
        where: {
          stripeId,
        },
        data: {
          isSubscribed: false,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event?.type}`);
      return;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
