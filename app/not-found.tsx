import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#251E1E] flex-col flex h-screen items-center justify-center overflow-hidden text-gray-200">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Data Dive Homes</span>
        <Image src="/aiOrb.gif" width={400} height={400} alt="Logo Image" />
      </Link>
      <h2>Sorry this page doesn&apos;t seem to exist.</h2>
      <p>Could not find you the requested resource, sorry!</p>
      <Link href="/" className="underline text-blue-400 hover:text-blue-300">
        Return Home
      </Link>
    </div>
  );
}
