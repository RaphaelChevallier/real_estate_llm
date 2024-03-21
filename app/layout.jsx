import { Inter } from "next/font/google";
import "./globals.css";
// import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Data Dive Homes",
  description: "Your pocket AI real estate investing advisor",
  generator: 'Next.js',
  applicationName: 'Data Dive Homes',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Typescript', 'LLM', 'AI', 'Real Estate', 'Real Estate AI', 'EstateMate', 'Real Estate Investing', 'Investing', 'Properties', 'Homes', 'Data'],
  authors: [{ name: 'Raphael Chevallier' }],
  creator: 'Raphael Chevallier',
  publisher: 'Raphael Chevallier',
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  category: 'technology',
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout(
 {children}
) {
  return (
    <html lang="en" className="bg-[#251E1E] min-h-screen">
      {/* <AuthContext session={session}> */}
        {/* <Providers> */}
          <body className='min-h-screen'>{children}</body>
        {/* </Providers> */}
      {/* </AuthContext> */}
    </html>
  );
}
