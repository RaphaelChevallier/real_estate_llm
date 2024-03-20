"use client";

import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormAction from "../../../../../components/FormAction";
import { resetPassword } from "../../../../actions/forgotPasswordActions";

export default function Page({ params }) {
  const router = useRouter();
  const email = params.email;
  const token = params.token;
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingPassword(true);
    if (passwordInput && confirmPassword) {
      if (passwordInput === confirmPassword) {
        let response = await resetPassword(email, token, passwordInput);
        if (!response.error) {
          setConfirmPassword("");
          setPasswordInput("");
          setMessage(response.message);
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        } else if (response.error) {
          setError(JSON.parse(response.message).name + ". Please try again");
        }
      } else {
        setError("Please have both the password and confirmation equal");
      }
    } else {
      setError("Please fill the form with a password");
    }
    setUpdatingPassword(false);
  };

  return (
    <>
      {email && token ? (
        <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
          <div className="flex-col flex h-screen items-center justify-center overflow-hidden">
          <div className="w-full p-6 bg-gray-200 rounded-md items-center justify-center shadow-md lg:max-w-xl">
          <p className="flex justify-center font-bold mb-4">
            Please enter your new password below
          </p>
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
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {' '}
            <Link href='/auth/login' className="font-medium text-purple-600 hover:text-purple-500">
            Head Back to Login Page
            </Link>
            </p>
        </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error ? (
              <>
                <p className="text-red-600">{error}</p>
              </>
            ) : null}
            {message ? (
              <p className="text-green-600">{message}</p>
            ) : (
              <>
                <div className="-space-y-px">
                  <div className="my-5">
                    <Input
                      onValueChange={setPasswordInput}
                      value={passwordInput}
                      labelFor="New Password"
                      id="password"
                      name="password"
                      type="password"
                      isRequired={true}
                      label="New Password"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onValueChange={setConfirmPassword}
                      value={confirmPassword}
                      labelFor="New Confirm Password"
                      id="confirm password"
                      name="confirm password"
                      type="password"
                      isRequired={true}
                      label="Confirm New Password"
                      labelPlacement="inside"
                    />
                  </div>
                </div>

                <FormAction
                  handleSubmit={handleSubmit}
                  text={
                    updatingPassword
                      ? "Updating Password..."
                      : "Update Password"
                  }
                />
              </>
            )}
          </form>
          </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col min-h-screen justify-center items-center">
            <p className="text-red-600 font-bold mb-4">
              The page you&apos;re trying to get to isn&apos;t available.
            </p>
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
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {' '}
            <Link href='/auth/login' className="font-medium text-purple-600 hover:text-purple-500">
              Head Back to Login Page
            </Link>
            </p>
        </div>
          </div>
        </>
      )}
    </>
  );
}
