import { Metadata } from "next";
import DashboardTemplate from "@/components/Modules/SecureTemplate/DashboardTemplate";

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
export default async function DashboardPage({ params, searchParams }: Props & { searchParams: any }) {

    return (
        <>
            <DashboardTemplate />
        </>
    );
}
