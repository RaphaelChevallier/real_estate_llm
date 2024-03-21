"use client";
import Footer from "@/components/Footer";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
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

export default function Login(props: any) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(0);
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((response) => {
      if (response?.status === 200) {
        router.push("/chat");
      } else if (response?.status === 401) {
        if (response.error) {
          console.log(response);
          setError(1);
          setErrorMessage(
            "These credentials are not recognized. Please try again."
          );
          setEmail("");
          setPassword("");
        }
      } else {
        setError(1);
        setErrorMessage(
          "There was a problem connecting to the server. Please try again later."
        );
        setEmail("");
        setPassword("");
      }
    });
  };

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
              {error === 1 ? (
                <p className="text-red-600 max-w-xs">{errorMessage}</p>
              ) : null}
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onValueChange={setEmail}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  isRequired={true}
                  label="Email"
                  labelPlacement="outside"
                />
              </div>
              <div className="mb-2">
                <Input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onValueChange={setPassword}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  isRequired={true}
                  label="Password"
                  labelPlacement="outside"
                />
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-blue-600 hover:underline"
              >
                Forget Password?
              </Link>
              <div className="mt-2">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-700">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
