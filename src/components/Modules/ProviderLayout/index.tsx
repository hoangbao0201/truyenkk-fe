"use client";

import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

import store from "@/redux/store";
import { Provider } from "react-redux";
import { useMediaQuery } from "usehooks-ts";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import ButtonOnTop from "@/components/Share/ButtonOnTop";

import Script from "next/script";

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const matchesMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <>
            <Suspense>
                <ButtonOnTop />
                {matchesMobile && (
                    <>
                        <Script
                            strategy="lazyOnload"
                            src="https://www.vipads.live/vn/886F8AFE-FF83-1620-33-D7BCF23CEE7C.blpha"
                        ></Script>
                    </>
                )}
            </Suspense>
            <NextTopLoader height={3} color="#2563ebcc" showSpinner={false} />
            <SessionProvider>
                <Provider store={store}>
                    <ThemeProvider attribute="class">
                        {children}
                    </ThemeProvider>
                </Provider>
            </SessionProvider>
        </>
    );
}
