import { Metadata } from "next";
import UpdatePassword from "@/components/Modules/SecureTemplate/UpdatePassword";

type Props = {
    params: {
        slugBook: string;
    };
};
export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Đăng nhập bằng tài khoản Google - HENTAIKK`,
    };
}
export default async function SecurePage({ params, searchParams }: Props & { searchParams: any }) {

    return (
        <>
            <UpdatePassword />
        </>
    );
}
