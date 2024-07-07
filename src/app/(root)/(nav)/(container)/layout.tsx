import dynamic from "next/dynamic";

import SkeletionItemComment from "@/components/Modules/Skeleton/SkeletionItemComment";
import Image from "next/image";

<SkeletionItemComment count={5} />;

const SideLeft = dynamic(() => import("./SideLeft"), {
    ssr: false,
    loading: () => <SkeletionItemComment count={5} />,
});
const SideTopMember = dynamic(
    () => import("@/components/Share/Side/TopMember"),
    { ssr: false, loading: () => <SkeletionItemComment count={5} /> }
);

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white shadow dark:shadow-none dark:bg-slate-900 [#0C1121] md:rounded-md">
                    <div className="py-4 lg:flex">
                        {children}

                        <div className="lg:w-4/12 px-3 mb-5">
                            <div className="mb-4">
                                <div className="border dark:border-none dark:bg-[#151D35] rounded-md px-3 py-1">
                                    <h2 className="text-xl border-b py-2 mb-3 text-red-600 dark:text-gray-100 font-semibold">
                                        Bình luận mới
                                    </h2>
                                    <SideLeft />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="border dark:border-none dark:bg-[#151D35] rounded-md px-3 py-1">
                                    <h2 className="text-xl border-b py-2 mb-3 text-red-600 dark:text-gray-100 font-semibold">
                                        Top thành viên
                                    </h2>
                                    <SideTopMember />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="border dark:border-none dark:bg-[#151D35] rounded-md px-3 py-3">
                                    <Image width={700} height={374} alt="Ảnh banner trang chủ" src={"/static/images/banner-home.png"}/>
                                </div>
                            </div>

                            {/* <div className="mb-4">
                                <div className="border dark:border-none dark:bg-[#151D35] rounded-md px-3 py-1">
                                    <h2 className="text-xl border-b py-2 mb-3 text-center text-red-600 dark:text-gray-100 font-semibold">
                                        Quảng cáo (ủng hộ ad với 1 click)
                                    </h2>
                                    <div className="max-w-[300px] h-[250px] my-4 mx-auto">
                                        <AdsClickAduBanner id="2025193"/>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="my-2 relative flex flex-col items-center">
                                <div className="max-w-[300px] h-[250px] m-2 bg-gray-100 rounded-md">
                                    <AdsClickAduBanner id="2025193"/>
                                </div>
                            </div> */}

                            {/* <iframe src="/vipads/index.html" className="aspect-[12/10] max-w-[300px] w-full m-2 bg-white"></iframe> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
