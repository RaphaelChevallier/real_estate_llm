"use client";

import { CircularProgress } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage(props: any) {
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const navigation = [
    {
      name:
        session && status == "authenticated"
          ? session.user?.firstName + " " + session.user?.lastName
          : "",
      href:
        session && status == "authenticated"
          ? "/profile/" + session.user?.firstName + session.user?.lastName
          : "",
    },
    {
      name: session && status == "authenticated" ? "Plans" : "Pricing",
      href: "/pricing",
    },
    { name: "Contact Us", href: "/contactUs" },
    { name: "Product", href: "/about" },
    // { name: 'About Us', href: '#' },
  ];

  return session && status == "authenticated" ? (
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
            <Link
              onClick={() => {
                signOut(), router.push("/auth/login");
              }}
              href="/auth/login"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Sign Out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="grid grid-cols-5 gap-4 px-4">
        <div className="col-start-2 text-gray-200 flex flex-col">
          <h1 className="text-4xl font-extrabold mb-10">
            Hello {session?.user?.firstName}!
          </h1>

          <Link
            href="/auth/forgot-password"
            className="flex justify-center items-center mb-10 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Reset Password
          </Link>

          <Link
            href="/pricing"
            className="flex justify-center items-center mb-10 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Manage Subscription
          </Link>

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
              {session?.user?.firstName + " " + session?.user?.lastName}
            </p>
          </h4>
          <h4 className="text-lg mt-10 font-semibold">
            Email:
            <p className="ml-2 text-white font-normal">
              {session?.user?.email}
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
