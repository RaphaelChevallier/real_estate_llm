"use client";

import Footer from "@/components/Footer";
import RememberPassword from "@/components/RememberPassword";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contactUs" },
  { name: "Product", href: "/about" },
  // { name: 'About Us', href: '#' },
];

const ForgotPassword = () => {
  return (
    <>
      <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
        <div className="px-6 pt-6 lg:px-8 ">
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
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
                href="/auth/signup"
                className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
              >
                Sign Up <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex-col flex h-screen items-center justify-center overflow-hidden">
          <div className="w-full p-6 bg-gray-200 rounded-md items-center justify-center shadow-md lg:max-w-xl">
            <div className="mb-10">
              <div className="flex justify-center">
                <Link href={"/"}>
                  <Image
                    src="/aiOrb.gif"
                    width={80}
                    height={80}
                    alt="Logo Image"
                  />
                </Link>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Please enter the email associated to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Login
                </Link>
              </p>
            </div>
            <RememberPassword />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
