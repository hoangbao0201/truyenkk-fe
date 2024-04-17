import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import LoginTemplate from "@/components/Modules/Auth/LoginTemplate";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Đăng nhập - TRUYENKK`,
        description: `TRUYENKK Trang đăng nhập`,
        openGraph: {
            title: `Đăng nhập - TRUYENKK`,
            siteName: `TRUYENKK`,
            url: `${MAIN_BASE_URL}/auth/login`,
            type: "website",
            images: [],
            description: `TRUYENKK Trang đăng nhập`,
        },
        alternates: {
            canonical: `${MAIN_BASE_URL}`,
        },
    };
}
const LoginPage = async ({ searchParams }: SearchParamProps) => {
    const { token, returnurl }: any = searchParams;

    return (
        <>
            <LoginTemplate token={token} returnurl={returnurl}/>
        </>
    )
}

export default LoginPage;