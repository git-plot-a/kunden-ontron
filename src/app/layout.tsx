"use client"

import clsx from "clsx"
import { Suspense } from "react";
import { poppins } from "./fonts"
import { useScrollManager } from "@/app/hooks/ScrollManager"
import "./globals.scss";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useScrollManager()

  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />
        <title>Kundenbereich | ontron</title>
        <meta name="description" content="Persönlichen ontron Kundenbereich für maßgeschneiderten Support, Statusüberwachung und sichere Verwaltung Ihres Kontos." />
        <meta name="keywords" content="Kundenbereich ontron" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </head>
      <body className={clsx(poppins.variable)}>
        <main className={"main"}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}

          </Suspense>
        </main>
      </body>
    </html>
  );
}
