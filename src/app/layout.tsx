import "./globals.scss";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MAIN_BASE_URL } from "@/lib/config";
import ProviderLayout from "@/components/Modules/ProviderLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons: [`${MAIN_BASE_URL}/favicon.ico`],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <meta
                    name="google-site-verification"
                    content="SEWaNQkiLxRP8mVcnipgnIS0UGNsrIUGNwypzGm1ffA"
                />
                <meta name="mnd-ver" content="fexyd1lxme8jr5n4zgv6q" />
                <Script
                    async
                    strategy="lazyOnload"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7782743322103441"
                    crossOrigin="anonymous"
                ></Script>
            </head>
            <body
                className={`${inter.className} text-gray-900 bg-[#f8f8f8f8] dark:text-gray-100 dark:bg-slate-800`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
