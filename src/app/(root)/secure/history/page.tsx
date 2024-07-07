import { Metadata } from "next";
// import HistoryTemplate from "@/components/Modules/SecureTemplate/HistoryTemplate";

type Props = {
    params: {
        slugBook: string;
    };
};
export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Thông tin chung - TRUYENKK`,
    };
}
export default async function HistoryPage({ params, searchParams }: Props & { searchParams: any }) {

    return (
        <>
            {/* <HistoryTemplate /> */}
        </>
    );
}
