import { CircularProgress } from "@nextui-org/react";

export const metadata = {
  title: "Data Dive Homes",
  description: "Your pocket AI real estate investing advisor",
  generator: "Next.js",
  applicationName: "Data Dive Homes",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Typescript",
    "LLM",
    "AI",
    "Real Estate",
    "Real Estate AI",
    "EstateMate",
    "Real Estate Investing",
    "Investing",
    "Properties",
    "Homes",
    "Data",
  ],
  authors: [{ name: "Raphael Chevallier" }],
  creator: "Raphael Chevallier",
  publisher: "Raphael Chevallier",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  category: "technology",
  icons: {
    icon: "/icon.ico",
  },
};

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="bg-[#251E1E] flex-col flex h-screen items-center justify-center overflow-hidden">
      <CircularProgress />
    </div>
  );
}
