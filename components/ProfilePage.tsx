"use client";

import { prepareCustomerPortal } from "@/app/actions/subscription";
import { Button, CircularProgress } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ProfilePage(props: any) {
  const router = useRouter();
  const currentPath = usePathname();

  let navigation;
  if (props.userData) {
    if (props.userData.isSubscribed) {
      navigation = [
        { name: "Contact Us", href: "/contactUs" },
        { name: "Product", href: "/about" },
      ];
    } else {
      navigation = [
        {
          name: props.userData.firstName + " " + props.userData.lastName,
          href:
            "/profile/" + props.userData.firstName + props.userData.lastName,
        },
        {
          name: "Pricing",
          href: "/pricing",
        },
        { name: "Contact Us", href: "/contactUs" },
        { name: "Product", href: "/about" },
      ];
    }
  }

  const loadPortal = async () => {
    console.log(currentPath);
    const url = await prepareCustomerPortal(currentPath);
    router.push(url);
  };

  return props.userData ? (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
      <div className="px-6 pt-6 lg:px-8 bg-[#251E1E] mb-8">
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
            <Link
              href="/chat"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Chat with EstateMate <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="grid grid-cols-5 gap-4 px-4">
        <div className="col-start-2 text-gray-200 flex flex-col">
          <h1 className="text-4xl font-extrabold mb-10">
            Hello {props.userData.firstName}!
          </h1>

          <h1 className="text-xl font-semibold mb-10">
            Subscription Status:{""}
            {new Date().getTime() - props.userData.createdAt.getTime() <
              259200000 && !props.userData.isSubscribed ? (
              <p className="text-lg font-semibold mb-10">
                You are on the free trial.
              </p>
            ) : null}
            {props.userData.isSubscribed ? (
              <p className="text-lg font-semibold mb-10">
                You are on the full subscription.
              </p>
            ) : null}
            {!(
              new Date().getTime() - props.userData.createdAt.getTime() <
              259200000
            ) && !props.userData.isSubscribed ? (
              <p className="text-lg font-semibold mb-10">
                No current subscription.
              </p>
            ) : null}
          </h1>

          <Link
            href="/auth/forgot-password"
            className="flex justify-center items-center mb-10 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Reset Password
          </Link>

          <Button
            onClick={() =>
              !props.userData.isSubscribed
                ? router.push("/pricing")
                : loadPortal()
            }
            className="flex justify-center items-center mb-10 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Manage Subscription
          </Button>

          <Link
            onClick={() => signOut()}
            href="/auth/login"
            className="flex justify-center items-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign Out
          </Link>
        </div>

        <div className="col-start-4 flex flex-col text-gray-200">
          <h2 className="text-3xl mt-20 font-bold underline">Your Profile</h2>
          <h4 className="text-lg mt-10 font-semibold">
            Full Name:
            <p className="ml-2 text-white font-normal">
              {props.userData.firstName + " " + props.userData.lastName}
            </p>
          </h4>
          <h4 className="text-lg mt-10 font-semibold">
            Email:
            <p className="ml-2 text-white font-normal">
              {props.userData.email}
            </p>
          </h4>
          <h4 className="text-lg mt-10 font-semibold">
            Company:
            <p className="ml-2 text-white font-normal">
              {props.userData.company}
            </p>
          </h4>
          <h4 className="text-lg mt-10 font-semibold">
            Account Last Updated:
            <p className="ml-2 text-white font-normal">
              {props.userData.updatedAt.toString()}
            </p>
          </h4>
          <h4 className="text-lg mt-10 font-semibold">
            Account Created:
            <p className="ml-2 text-white font-normal">
              {props.userData.createdAt.toString()}
            </p>
          </h4>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
      <div className="flex-col flex h-screen items-center justify-center overflow-hidden">
        <CircularProgress />
      </div>
    </div>
  );
}
