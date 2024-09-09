"use client"

import clsx from "clsx"
import { Suspense } from "react";
import Head from "next/head";
import { poppins } from "./fonts"
import { useScrollManager } from "@/app/hooks/ScrollManager"
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useScrollManager()

  return (
    <html lang="de">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />
        <title>ontron GmBH</title>
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      </Head>
      <body className={clsx(poppins.variable)}>
      <main className={"main"}>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Header /> */}
            {/* <div className={"parallax"}> */}
              {children}
              {/* <Footer /> */}
            {/* </div> */}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
