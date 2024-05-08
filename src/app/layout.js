import { Inter } from "next/font/google";
import React from "react";
import "../styles/_global.scss";
import FooterSection from "../components/footer";
import SiteHeader from "../components/siteHeader";
import "../styles/style.scss";
import ContextCreator from "@/components/contextCreator/contextCreator";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clinician Seek",
  description: "A BlindWeight Referral Company"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script
        async
        src="https://cdn.jsdelivr.net/gh/ivsmani/formsleads@1.2.8/source/qa/formsleads.min.js?app-key=868ac55a4776a4bd98f198b8195eb06933aeeffe9c8594069fbf7529cced4fa6"
      ></script>
      <body className={inter.className}>
        <ContextCreator>
          <SiteHeader />
          {children}
          <FooterSection />
        </ContextCreator>
      </body>
    </html>
  );
}
