"use client";

import { prepareStripeCheckout } from "@/app/actions/subscription";
import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcCheckmark } from "react-icons/fc";
import Footer from "./Footer";

export default function PricingPage(props: any) {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const navigation = [
    {
      name:
        session && status == "authenticated"
          ? session.user?.firstName + " " + session.user?.lastName
          : "Loading profile...",
      href:
        session && status == "authenticated"
          ? "/profile/" + session.user?.firstName + session.user?.lastName
          : "",
    },
    { name: "Contact Us", href: "/contactUs" },
    { name: "Product", href: "/about" },
    // { name: 'About Us', href: '#' },
  ];

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
            {navigation.map((item) => (
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
            {session && session.user?.email ? (
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
      {props.currentPlan == "freeTrial" ? (
        <h1 className="flex items-center justify-center mt-10 text-gray-200 font-semibold text-lg text-red-600">
          You are currently on the free trial! On day{" "}
          {Math.ceil(props.days / 1000 / 86400)} of 7.
        </h1>
      ) : null}
      <div className="flex-col flex h-screen items-center justify-center overflow-hidden grid grid-cols-5 gap-2">
        {props.plans.map((plan: any, index: number) => {
          const parentDivClassname = `w-full p-6 bg-gray-200 rounded-md shadow-md lg:max-w-xl col-start-${
            index + 2
          }`;
          const buttonDivClassname = `bg-[${plan.bg}] shadow-xl shadow-${plan.color}/50 hover:scale-110`;
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
              <div className="flex flex-col items-center">
                <div className="flex mb-4 items-center justify-center text-center space-x-4">
                  <FcCheckmark />
                  <p className=" text-sm font-semibold text-center text-gray-700">
                    Access to EstateMate AI expert
                  </p>
                </div>
                <div className="flex mb-4 items-center justify-center text-center space-x-4">
                  <FcCheckmark />
                  <p className=" text-sm font-semibold text-center text-gray-700">
                    Access to EstateMate AI expert
                  </p>
                </div>
                <div className="flex mb-4 items-center justify-center text-center space-x-4">
                  <FcCheckmark />
                  <p className=" text-sm font-semibold text-center text-gray-700">
                    Access to EstateMate AI expert
                  </p>
                </div>
                {session && session.user?.email ? (
                  <Button
                    onPress={() => processSubscription(plan.id)}
                    className={buttonDivClassname}
                  >
                    Upgrade to a new plan!
                  </Button>
                ) : (
                  <Link href={"/auth/signup"}>
                    <Button
                      onPress={() => processSubscription(plan.id)}
                      className={buttonDivClassname}
                    >
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
