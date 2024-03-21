"use client";

import {
  prepareCustomerPortal,
  prepareStripeCheckout,
} from "@/app/actions/subscription";
import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcCheckmark } from "react-icons/fc";
import Footer from "./Footer";

export default function PricingPage(props: any) {
  const currentPath = usePathname();
  const router = useRouter();

  let navigation;
  if (props.userData) {
    navigation = [
      {
        name: props.userData.firstName + " " + props.userData.lastName,
        href: "/profile/" + props.userData.firstName + props.userData.lastName,
      },
      { name: "Contact Us", href: "/contactUs" },
      { name: "Product", href: "/about" },
    ];
  } else {
    navigation = [
      { name: "Contact Us", href: "/contactUs" },
      { name: "Product", href: "/about" },
    ];
  }

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const loadPortal = async () => {
    const url = await prepareCustomerPortal(currentPath);
    router.push(url);
  };

  const processSubscription = async (priceId: string) => {
    const stripe = await loadStripe(
      props.stripePublicKey ? props.stripePublicKey : ""
    );
    const res = await prepareStripeCheckout(priceId);
    await stripe?.redirectToCheckout({ sessionId: res });
  };

  return (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
      <div className="px-6 pt-6 lg:px-8 ">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Data Dive Homes</span>
              <Image
                src="/aiOrb.gif"
                className="hover:scale-110"
                width={50}
                height={50}
                alt="Logo Image"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200 hover:underline hover:scale-110"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {props.userData && props.userData.email ? (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  onClick={() => signOut()}
                  className="text-sm font-semibold leading-6 text-red-700 hover:scale-110"
                >
                  Sign Out
                </Button>
                <Link
                  href="/chat"
                  className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
                >
                  Chat with EstateMate <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
              >
                Log In <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
      {props.currentPlan == "freeTrial" && !props.userData.isSubscribed ? (
        <h1 className="flex items-center justify-center mt-10 text-gray-200 font-semibold text-lg text-red-600">
          You are currently on the free trial! On day{" "}
          {Math.ceil(props.days / 1000 / 86400)} of 7.
        </h1>
      ) : null}
      <div className="flex-col flex h-screen items-center justify-center overflow-hidden grid grid-cols-6 gap-2">
        {props.plans.map((plan: any, index: number) => {
          const parentDivClassname = `w-full p-6 bg-gray-200 rounded-md shadow-md lg:max-w-xl col-start-3 col-end-5`;
          const buttonDivClassname = `bg-[#3B82F6] shadow-xl shadow-blue-500/50`;
          return (
            <div className={parentDivClassname} key={plan.id}>
              <div className="flex items-center justify-center mb-4">
                <Link href="/" className="hover:scale-110">
                  <Image
                    src="/aiOrb.gif"
                    width={80}
                    height={80}
                    alt="Logo Image"
                  />
                </Link>
              </div>
              <div className="flex flex-col ">
                <h1 className="text-lg font-bold items-center justify-center flex text-black mb-5 underline">
                  {plan.name}
                </h1>
                <h1 className="text-md font-semibold text-black mb-5 items-center justify-center flex">
                  {USDollar.format(plan.price * 0.01)} / month
                </h1>
                {plan.featureList.map((feature: any, index: number) => {
                  return (
                    <div key={index} className="flex mb-4 space-x-4 ">
                      <FcCheckmark />
                      <p className=" text-sm font-semibold  text-gray-700">
                        {feature.name}
                      </p>
                    </div>
                  );
                })}
                {props.userData && props.userData.email ? (
                  props.userData.isSubscribed ? (
                    <Button
                      onPress={() => loadPortal()}
                      className={buttonDivClassname}
                    >
                      Manage your subscription
                    </Button>
                  ) : (
                    <Button
                      onPress={() => processSubscription(plan.id)}
                      className={buttonDivClassname}
                    >
                      Get that early access!
                    </Button>
                  )
                ) : (
                  <Link
                    className="flex items-center justify-center"
                    href={"/auth/signup"}
                  >
                    <Button className={buttonDivClassname}>
                      Get Started For Free!
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
