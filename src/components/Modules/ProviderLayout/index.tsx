"use client";

import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

import store from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import ButtonOnTop from "@/components/Share/ButtonOnTop";
import dynamic from "next/dynamic";

const ChatBox = dynamic(() => import("@/components/Share/ChatBox"), { ssr: false })

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const matchesMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <>
            <SessionProvider>
                <Provider store={store}>
                    <ThemeProvider attribute="class">

                        <Suspense>
                            <div className="transition-all duration-1000 ease-linear fixed right-7 bottom-7 z-50 flex">
                                <ButtonOnTop />
                                <ChatBox />
                            </div>
                            <NextTopLoader
                                color="#2563ebcc"
                                initialPosition={0.08}
                                crawlSpeed={200}
                                height={3}
                                crawl={true}
                                showSpinner={false}
                                easing="ease"
                                speed={200}
                            />
                        </Suspense>

                        {children}
                    </ThemeProvider>
                </Provider>
            </SessionProvider>
        </>
    );
}
