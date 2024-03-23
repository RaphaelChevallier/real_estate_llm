import Footer from "@/components/Footer";
import { SignOut } from "@/components/SignOut";
import Image from "next/image";
import Link from "next/link";
import Contact from "../../components/Contact";
import { getProfileData, getUserData } from "../actions/getUserInfo";

export default async function ContactUs() {
  const session = await getProfileData()
  const user = await getUserData(session?.user?.email)
  let navigation;
  if (session) {
    if (user?.isSubscribed) {
      navigation = [
        { name: "Contact Us", href: "/contactUs" },
        { name: "Product", href: "/about" },
        {
          name: session.user?.firstName + " " + session.user?.lastName,
          href: "/profile/" + session.user?.firstName + session.user?.lastName,
        },
      ];
    } else {
      navigation = [
        
        {
          name: "Pricing",
          href: "/pricing",
        },
        { name: "Contact Us", href: "/contactUs" },
        { name: "Product", href: "/about" },
        {
          name: session.user?.firstName + " " + session.user?.lastName,
          href: "/profile/" + session.user?.firstName + session.user?.lastName,
        },
      ];
    }
  } else {
    navigation = [
      {
        name: "Pricing",
        href: "/pricing",
      },
      { name: "Product", href: "/about" },
    ];
  }
  return (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
      <div className="px-6 pt-6 lg:px-8 bg-[#251E1E]">
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
            <div className="flex items-center justify-center space-x-4">
            <SignOut/>
            <Link
              href="/chat"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Chat with EstateMate <span aria-hidden="true">&rarr;</span>
            </Link>
            </div>
          ): (
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
      <div className="flex-col flex h-screen items-center justify-center overflow-hidden">
        <div className="p-5">
          <Contact />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
