"use client";

import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IoSend } from "react-icons/io5";

const navigation = [
  // { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contactUs" },
  // { name: "Product", href: "/about" },
  // { name: 'About Us', href: '#' },
];

export default function Chat() {
  return (
    <>
      <div className="px-6 pt-6 lg:px-8 bg-[#251E1E]">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Data Dive Homes</span>
              <Image
                src="/aiOrb.png"
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
              onClick={() => signOut()}
              href="/"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Sign Out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className="relative bg-[#251E1E] flex flex-col bg-[#251E1E] items-center justify-center min-h-screen overflow-hidden">
        <Card className="bg-[#251E1E]  bg-white text-white text-sm overflow-auto">
          <CardBody>
            <p>
              New Specialized AI Buddy getting trained to help you on your
              journey to investing. Coming Soon!
            </p>
          </CardBody>
        </Card>
        <div className="relative bottom-0 flex w-[80%] items-center px-5 justify-center">
          <Textarea
            variant="bordered"
            placeholder="Speak with EstateMate"
            //   value={estateMateMessage}
            //   onValueChange={setEstateMateMessage}
            minRows={2}
            endContent={
              <div className="flex justify-center items-center">
                <Button isIconOnly size="md" variant="light">
                  <IoSend color="#FFFFFF" />
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
