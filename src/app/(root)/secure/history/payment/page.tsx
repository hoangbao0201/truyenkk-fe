import { Metadata } from "next";
// import HistoryPaymentTemplate from "@/components/Modules/SecureTemplate/HistoryPaymentTemplate";

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
export default async function HistoryPaymentPage({ params, searchParams }: Props & { searchParams: any }) {

    return (
        <>
            {/* <HistoryPaymentTemplate /> */}
        </>
    );
}
