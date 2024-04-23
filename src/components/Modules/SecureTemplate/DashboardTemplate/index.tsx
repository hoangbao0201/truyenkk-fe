"use client"

import { useState } from "react";

import { useSession } from "next-auth/react";
import calculateRank from "@/utils/calculateRank";

const DashboardTemplate = () => {
    const { data: session, status } = useSession();
    
    return (
        <div>
            <h1
                title="THÔNG TIN CHUNG"
                className="postname"
            >
                THÔNG TIN CHUNG
            </h1>
            <div>
                <div className="mb-7">
                    <h3 className="posttitle">Thông tin tài khoản</h3>
                    <div className="flex">
                        <div className="border rounded-md py-2 px-2 max-w-[500px] flex-1">
                            <div className="flex whitespace-nowrap">
                                <div className="w-24 px-1 py-1">Họ và tên</div>
                                <div className="px-1 py-1">{session?.user.name}</div>
                            </div>
                            <div className="flex whitespace-nowrap">
                                <div className="w-24 px-1 py-1">Email</div>
                                <div className="px-1 py-1">{session?.user.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-7">
                    <h3 className="posttitle">Liên kết Tài khoản Google</h3>
                    <div className="flex">
                        <div className="border rounded-md py-2 px-2 max-w-[500px] flex-1">
                            <div className="flex whitespace-nowrap">
                                <div className="w-24 px-1 py-1">Trạng thái</div>
                                <div className="px-1 py-1">Đã liên kết</div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    status === "authenticated" && (
                        <div className="mb-7">
                            <h3 className="posttitle">Tu luyện</h3>
                            <div className="border rounded-md py-2 px-2 max-w-[500px] flex-1">
                                <FormRankUser rank={session?.user.rank}/>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default DashboardTemplate;


const FormRankUser = ({ rank }: { rank: number }) => {
    const { level, percentage } = calculateRank(rank);

    return (
        <>
            <div className="flex justify-between mb-1">
                <span>Cấp {level}</span>
                <span>Cấp {level + 1}</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-gray-100 mb-2">
                <div style={{ width: `${percentage === 0 ? 2 : percentage}%`}} className={`progress-rank`}>{percentage}%</div>
            </div>
            <div>
                Loại cấp bậc <span className="text-red-500">Cấp {level}</span>
            </div>
        </>
    )
}