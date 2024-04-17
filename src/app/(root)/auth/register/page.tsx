import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import RegisterTemplate from "@/components/Modules/Auth/RegisterTemplate/page";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Đăng kí - TRUYENKK`,
        description: `TRUYENKK Trang đăng kí`,
        openGraph: {
            title: `Đăng kí - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/auth/login`,
            type: "website",
            images: [],
            description: `TRUYENKK Trang đăng kí`,
        },
        alternates: {
            canonical: `${MAIN_BASE_URL}`,
        },
    };
}
const LoginPage = async ({ searchParams }: SearchParamProps) => {
    const { returnurl } = searchParams;
    return (
        <>
            <RegisterTemplate returnurl={returnurl?.toString()}/>
        </>
    )
}

export default LoginPage;