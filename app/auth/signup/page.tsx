"use client";

import Footer from "@/components/Footer";
import { CircularProgress, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contactUs" },
  { name: "Product", href: "/about" },
  // { name: 'About Us', href: '#' },
];

export default function Signup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(0);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 6) {
      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          company: company,
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setError(0);
        setConfirmPasswordError(false);
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/chat",
        });
      } else if (data.status === 409) {
        setConfirmPasswordError(false);
        setError(data.status);
      } else if (data.status === 500) {
        console.log(data);
        setEmail("");
        setFirstName("");
        setLastName("");
        setCompany("");
        setPassword("");
        setConfirmPassword("");
        setConfirmPasswordError(false);
        setError(data.status);
      }
    } else {
      if (password.length < 6) {
        setError(1);
        setConfirmPasswordError(true);
      } else {
        setError(0);
        setConfirmPasswordError(true);
      }
    }
  };

  return (
    <>
      {!session && status === "loading" ? (
        <div className="relative bg-[#251E1E] flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <CircularProgress aria-label="Loading..." />
        </div>
      ) : session?.user ? (
        router.push("/chat")
      ) : (
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
                  href="/auth/login"
                  className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
                >
                  Log In <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex-col flex h-screen items-center justify-center overflow-hidden">
            <div className="w-full p-6 bg-gray-200 rounded-md shadow-md lg:max-w-xl">
              <div className="flex items-center justify-center">
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
                {error === 500 ? (
                  <p className="text-red-600">
                    Something went wrong with the server. Please try again
                    later.
                  </p>
                ) : null}
              </div>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={setFirstName}
                    value={firstName}
                    id="firstName"
                    name="firstName"
                    type="text"
                    isRequired={true}
                    label="First Name"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={setLastName}
                    value={lastName}
                    id="lastName"
                    name="lastName"
                    type="text"
                    isRequired={true}
                    label="Last Name"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={setCompany}
                    value={company}
                    id="company"
                    name="company"
                    type="text"
                    isRequired={false}
                    label="Company"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={(e) => {
                      setEmail(e);
                      setError(0);
                    }}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    isRequired={true}
                    isInvalid={error === 409 ? true : false}
                    errorMessage={
                      error === 409
                        ? "The email you provided is already in use"
                        : null
                    }
                    label="Email"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={(e) => {
                      setPassword(e);
                      setError(0);
                    }}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    isRequired={true}
                    isInvalid={error === 1 ? true : false}
                    errorMessage={
                      error === 1
                        ? "Please have a password more than 6 characters"
                        : null
                    }
                    label="Password"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onValueChange={(e) => {
                      setConfirmPassword(e);
                      setConfirmPasswordError(false);
                    }}
                    value={confirmPassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    isRequired={true}
                    isInvalid={confirmPasswordError ? true : false}
                    errorMessage={
                      confirmPasswordError
                        ? "Please match your passwords"
                        : null
                    }
                    label="Confirm Password"
                    labelPlacement="outside"
                  />
                </div>
                <div className="mt-2">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="mt-4 text-sm text-center text-gray-700">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
