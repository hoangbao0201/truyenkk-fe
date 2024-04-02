import Link from "next/link";
import { headers } from "next/headers";
import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import Image from "next/image";

export default async function NotFound() {
    const headersList = headers();
    const domain = headersList.get("host");

    return (
        <>
            <Header />
            <div className="py-4">
                <div className={`bg-white dark:bg-slate-800/70 rounded-md shadow-sm border max-w-3xl w-full mx-auto overflow-hidden`}>
                    <div className="px-4 py-8">
                        <Image
                            unoptimized
                            loading="lazy"
                            width={500}
                            height={500}
                            alt="404 svg"
                            src="/static/icons/404.svg"
                            className="max-w-40 w-full mx-auto block"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
