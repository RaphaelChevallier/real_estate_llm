import { Inter } from "next/font/google";
import "./globals.css";
// import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Data Dive Homes",
  description: "Your pocket AI real estate investing advisor",
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
