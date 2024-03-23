import Footer from "@/components/Footer";
import { SignOut } from "@/components/SignOut";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDownCircle } from "react-icons/fi";
import { getUserData } from "../actions/getUserInfo";

export default async function About() {
  const session = await getServerSession();
  const userData = await getUserData(session?.user?.email);
  let navigation;
  if (session) {
    if (userData?.isSubscribed) {
      navigation = [
        { name: "Contact Us", href: "/contactUs" },
        {
          name: userData?.firstName + " " + userData?.lastName,
          href: "/profile/" + userData?.firstName + userData?.lastName,
        },
      ];
    } else {
      navigation = [
        {
          name: "Pricing",
          href: "/pricing",
        },
        { name: "Contact Us", href: "/contactUs" },
        {
          name: userData?.firstName + " " + userData?.lastName,
          href: "/profile/" + userData?.firstName + userData?.lastName,
        },
      ];
    }
  } else {
    navigation = [
      {
        name: "Pricing",
        href: "/pricing",
      },
      { name: "Contact Us", href: "/contactUs" },
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
                <SignOut />
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
      <div className="overflow-hidden h-screen grid grid-cols-5 grid-rows-8 gap-6">
        <div className="flex-col flex mt-20 items-center justify-center row-span-2 row-start-2 col-span-2">
          <Image
            src="/aiOrb.gif"
            width={400}
            height={400}
            className={
              "transform transition animate-pulse transition duration-100 "
            }
            alt="Breathing Image"
          />
          <h1 className="text-gray-100 font-extrabold text-4xl mt-10">
            Hello, I&apos;m EstateMate.
          </h1>
          <h1 className="text-gray-100 font-semibold text-xl mt-2">
            I&apos;m here to help!
          </h1>
        </div>
        <div className="flex-1 overflow-y-scroll flex-col row-start-3 row-span-8 text-gray-300  col-start-3 col-span-2">
          <div className="row-span-8 min-h-screen">
            <h1 className="text-gray-100 font-extrabold text-4xl">
              Welcome to Data Dive Homes!
            </h1>
            <div className="flex flex-col space-y-2 text-md font-semibold mt-20">
              <p>
                This is the home of our in house real estate AI, EstateMate. If
                you need some advice on properties EstateMate will take care of
                you. Trained on reputated and enterprise-grade data, EstateMate
                has reliable and some of the most up-to-date information on
                millions of properties around the country. We are dedicated in
                keeping EstateMate as informed as possible gathering as many
                trusted data sources. We use only sources that are used by the
                industry itself with a huge following from real estate agents
                and realtors as well as experienced investors.
              </p>
              <p>
                EstateMate is also trained specifically to help with real estate
                investing advice and strategies. Using the latest AI LLM
                techniques to provide robust reasonings with the propietary data
                at hand.
              </p>
              <p>
                * Create an account today and get a 3 day free trial. No credit
                card needed!
              </p>
            </div>
            <FiArrowDownCircle
              className="animate-bounce mt-10"
              style={{ color: "#7DF9FF", fontSize: "2em" }}
            />
          </div>

          <div className="row-span-8 min-h-screen">
            <h1 className="text-gray-100 font-extrabold text-4xl">
              Current Plans & Roadmap
            </h1>
            <div className="flex flex-col space-y-2 text-md font-semibold justify-center items-center mt-20">
              <ul className="list-disc">
                <li>Adding more states. Currently Washington state only.</li>
                <li>
                  A way for user&apos;s to download their previous messages and
                  responses.
                </li>
                <li>
                  Input property images and have EstateMate analyze faults and
                  characteristics.
                </li>
                <li>Add accurate skip tracing data for properties.</li>
                <li>
                  Integrate with MLS listings directly for real estate agents.
                </li>
                <li>
                  Once funds increase we plan on using more data sources for
                  cross checking.
                </li>
                <li>
                  Continuously improve user experience. Send me a message to
                  share suggestions!
                </li>
              </ul>
            </div>
            <FiArrowDownCircle
              className="animate-bounce mt-10"
              style={{ color: "#7DF9FF", fontSize: "2em" }}
            />
          </div>

          <div className="row-span-8 min-h-screen">
            <h1 className="text-gray-100 font-extrabold text-4xl">
              Disclaimers & Terms of Use
            </h1>
            <div className="flex flex-col space-y-2 text-md font-semibold justify-center items-center mt-20">
              <p className="font-bold underline">
                This product is in public open beta currently.
              </p>
              <p className="text-sm">
                We are not responsible for the total accuracy of this product
                and please do your own research after using the product. We do
                not guarantee full functionality of the website at all times.
                For any questions or inquiries please email:
                support@datadivehomes.com or use the contactUs page. We do not
                provide refunds. You may cancel your subscription through the
                account profile page or by contacting us. The price of the
                subscription may suddenly change.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
