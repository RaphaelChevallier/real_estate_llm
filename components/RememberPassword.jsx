"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { sendResetPasswordEmail } from "../app/actions/forgotPasswordActions";
import FormAction from "./FormAction";

export default function RememberPassword() {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    if (emailInput) {
      let response = await sendResetPasswordEmail(emailInput);
      if (response?.error) {
        setError(response?.message);
      } else {
        setEmailInput("");
        setMessage(response?.message);
        setTimeout(() => {
          router.push("/login");
        }, 6000);
      }
    } else {
      setError("Please fill the form with an email");
    }
    setSendingEmail(false);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error ? (
        <>
          <p className="text-red-600">Failed to send email.</p>
          <p>{error}</p>
        </>
      ) : null}
      {message ? <p className="text-green-600">{message}</p> : null}
      <div className="-space-y-px">
        <div className="my-5">
          <Input
            className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onValueChange={setEmailInput}
            value={emailInput}
            labelFor="Email Address"
            id="email"
            name="email"
            type="email"
            isRequired={true}
            label="Email"
            labelPlacement="outside"
          />
        </div>
      </div>

      <FormAction
        handleSubmit={handleSubmit}
        text={sendingEmail ? "Sending..." : "Get Secure Password Reset Link"}
      />
    </form>
  );
}
