import { Suspense } from "react";
import ListBookFollow from "@/components/Modules/FollowTemplate/ListBookFollow";
import SkeletonCardBook from "@/components/Modules/Skeleton/SkeletonCardBook";

export default async function FollowPage({ searchParams }: SearchParamProps) {
    const { page: page = "" } = searchParams;
    const currentPage = Number(page) || 1;

    return (
        <div className="lg:w-8/12 px-3 mb-5">
            <h2 className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold">
                Truyện đang theo dõi
            </h2>
            
            <Suspense fallback={<div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3"><SkeletonCardBook count={12}/></div>}>
                <ListBookFollow currentPage={currentPage}/>
            </Suspense>            
        </div>
    )
}
