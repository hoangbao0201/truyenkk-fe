import { Metadata } from "next";
import UserProfileTemplate from "@/components/Modules/SecureTemplate/UserProfileTemplate";

type Props = {
    params: {
        slugBook: string;
    };
};
export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Thông tin chung - HENTAIKK`,
    };
}
export default async function UserProfilePage({ params, searchParams }: Props & { searchParams: any }) {

    return (
        <>
            <UserProfileTemplate />
        </>
    );
}
