import { Metadata } from "next";

import { MAIN_BASE_URL } from "@/lib/config";
import LoginTemplate from "@/components/Modules/Auth/LoginTemplate";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Đăng nhập - HENTAIKK`,
        description: `HENTAIKK Trang đăng nhập`,
        openGraph: {
            title: `Đăng nhập - HENTAIKK`,
            siteName: `HENTAIKK`,
            url: `${MAIN_BASE_URL}/auth/login`,
            type: "website",
            images: [],
            description: `HENTAIKK Trang đăng nhập`,
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