import { Metadata } from "next";
// import PaymentRankTemplate from "@/components/Modules/SecureTemplate/PaymentRankTemplate";

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
export default async function PaymentRankPage({ searchParams }: SearchParamProps) {

    const { isSuccess = 'false', amount = 0}: any = searchParams;

    return (
        <>
            {/* <PaymentRankTemplate isSuccess={+amount > 1000 ? true : false} amount={parseInt(amount) || 0}/> */}
        </>
    );
}
