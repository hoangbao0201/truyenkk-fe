import { Suspense } from "react";

import Image from "next/image";
import SideLeft from "./SideLeft";
import SkeletionItemComment from "@/components/Modules/Skeleton/SkeletionItemComment";

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-900 md:rounded-md shadow">
                    <div className="py-4 lg:flex">

                        {children}

                        <div className="lg:w-4/12 px-3 mb-5">
                            <div className="mb-4">
                                <h2 className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold">
                                    Bình luận mới
                                </h2>
                                <div className="border rounded-md px-3 py-1">
                                    <Suspense fallback={<SkeletionItemComment count={5}/>}>
                                        <SideLeft />
                                    </Suspense>
                                </div>
                            </div>
                            <div>
                                <Image
                                    unoptimized
                                    loading="lazy"
                                    alt="Ảnh ads"
                                    width={400}
                                    height={400}
                                    className="max-w-[400px] w-full mx-auto"
                                    src={`/static/images/thumb_ads.jpg`}
                                />
                            </div>
                        </div> 

                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
