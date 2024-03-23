import PricingPage from "@/components/Pricing";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { getUserData } from "../actions/getUserInfo";

export default async function Pricing() {
  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""
  );
  const { data: prices } = await stripe.prices.list({
    active: true,
  });
  const productPromises = prices.map(async (price) => {
    const product = await stripe.products.retrieve(price.product.toString());
    if (product.active) {
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        color: product.metadata.color,
        bg: product.metadata.bg,
        featureList: product.features,
        interval: price.recurring?.interval,
        currency: price.currency,
      };
    }
  });
  const plans = await Promise.all(productPromises);
  plans.sort((a, b) => (a?.price && b?.price ? a.price - b.price : 0));
  const session = await getServerSession();
  const userData = await getUserData(session?.user?.email);
  const publicKey = process.env.STRIPE_PUBLIC_KEY;

  if (userData?.isSubscribed) {
    await stripe.customers.retrieve(
      userData?.stripeId ? userData?.stripeId : ""
    );
    return (
      <PricingPage
        plans={plans}
        userData={userData}
        stripePublicKey={publicKey}
      />
    );
  } else if (
    userData &&
    new Date().getTime() - userData.createdAt.getTime() < 259200000
  ) {
    const currentPlan = "freeTrial";
    const days = new Date().getTime() - userData.createdAt.getTime();
    return (
      <PricingPage
        plans={plans}
        currentPlan={currentPlan}
        days={days}
        userData={userData}
        stripePublicKey={publicKey}
      />
    );
  }
  return (
    <PricingPage
      plans={plans}
      userData={userData}
      stripePublicKey={publicKey}
    />
  );
}
