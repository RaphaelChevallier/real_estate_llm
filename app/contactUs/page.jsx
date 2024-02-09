import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Contact from "../../components/Contact";


const navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "Product", href: "/about" },
  // { name: 'About Us', href: '#' },
];

async function getProfileData() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function ContactUs() {
  return (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
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
              href="/auth/login"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Back <span aria-hidden="true">&rarr;</span>
            </Link>
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
