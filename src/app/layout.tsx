"use client"

import clsx from "clsx"
import { Suspense, useEffect, useState } from "react";
import { poppins } from "./fonts"
import { useScrollManager } from "@/app/hooks/ScrollManager"
import useAnimation from '@/app/hooks/Animation/Animation';
import "./globals.scss";
import Footer from "./components/_sections/Footer/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useScrollManager()
  useAnimation()

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1193); // Например, для ширины менее 768px
    };

    // Вызываем обработчик один раз при монтировании
    handleResize();

    // Добавляем обработчик события resize
    window.addEventListener("resize", handleResize);

    // Убираем обработчик при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {isSmallScreen ? (<div className={"mobileVrsion"}>
            <h1 className="mobileTitle">Die mobile Version ist noch nicht verfügbar
            </h1>
          </div>) : (
            <Suspense fallback={<div>Loading...</div>}>
              {children}

            </Suspense>
          )}
        </main>
      </body >
    </html >
  );
}
