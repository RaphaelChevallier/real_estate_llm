import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

async function getProfileData() {
  const session = await getServerSession();
  return session;
}

export default async function Home() {
  const session = await getProfileData();
  const navigation = [
    { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contactUs" },
    { name: "Product", href: "/about" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-[#251E1E] bg-center bg-no-repeat bg-[url('/aiOrb.gif')]">
      <main>
        <div className="px-6 pt-6 lg:px-8">
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
              {session && session.user?.email ? (
                <Link
                  href="/chat"
                  className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
                >
                  Chat with EstateMate <span aria-hidden="true">&rarr;</span>
                </Link>
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
        <div className="">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                Your personal AI real estate investing advisor
              </h1>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p> */}
              {session && session.user?.email ? (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/chat"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110"
                  >
                    Chat with EstateMate <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              ) : (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/auth/signup"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
                  >
                    Log In <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
