"use client";

import adminService, { AdminGetUsersProps } from "@/services/admin.services";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SkeletonAdminItemUser from "../../Skeleton/SkeletonAdminItemUser";
import { listIdToData } from "@/constants/data";
import Link from "next/link";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

interface AdminBooksActionTemplateProps {
    page?: number;
}
const AdminBooksActionTemplate = ({}: AdminBooksActionTemplateProps) => {
    const { data: session, status } = useSession();
    const [infoManager, setInfoManager] = useState<null | {
        countBook: number;
        countCreateBook: number;
        countDeleteBook: number;
        totalPayment: number;
        countBookOfTags: { tagId: string; _count: { bookTags: number } }[];
    }>(null);
    const [dataViews, setDataViews] = useState<null | {
        countView: number;
        views: number;
    }>(null);
    const [dataUsers, setDataUsers] = useState<null | {
        countUser: number;
        users: AdminGetUsersProps[];
    }>(null);

    const eventGetViews = async () => {
        if (
            status !== "authenticated" ||
            session?.user.role.roleName !== "admin"
        ) {
            return;
        }
        try {
            const [usersRes, viewsRes, dataInfoManagerRes] = await Promise.all([
                adminService.getUsers({
                    token: session?.backendTokens.accessToken,
                }),
                adminService.getViews({
                    token: session?.backendTokens.accessToken,
                }),
                adminService.dataInfoManager({
                    token: session?.backendTokens.accessToken,
                }),
            ]);

            console.log("dataInfoManagerRes: ", dataInfoManagerRes)

            if (viewsRes?.success) {
                setDataViews({
                    countView: viewsRes?.countView,
                    views: viewsRes?.views,
                });
            }
            if (usersRes?.success) {
                setDataUsers({
                    countUser: usersRes?.countUser,
                    users: usersRes?.users,
                });
            }
            if (dataInfoManagerRes?.success) {
                const {
                    countBook,
                    countCreateBook,
                    countDeleteBook,
                    countBookOfTags,
                    totalPayment
                } = dataInfoManagerRes?.dataInfoManager;

                console.log(dataInfoManagerRes?.dataInfoManager);
                setInfoManager({
                    countBook: countBook || 0,
                    countCreateBook: countCreateBook || 0,
                    countDeleteBook: countDeleteBook || 0,
                    countBookOfTags: countBookOfTags,
                    totalPayment: totalPayment || 0
                });
            }
        } catch (error) {}
    };
    useEffect(() => {
        eventGetViews();
    }, [status]);

    return (
        <>
            <div>
                <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">
                    <div className="mb-5">
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Tổng lượt xem là:</p>
                            {dataViews?.countView || (
                                <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                            )}
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Tổng số lượng tiền thanh toán là:</p>
                            {infoManager?.totalPayment ? infoManager?.totalPayment.toLocaleString("de-DE") + " VNĐ" : (
                                <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                            )}
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Tổng số lượng truyện là:</p>
                            {infoManager?.countBook || (
                                <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                            )}
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Tổng số lượng truyện đã xóa là:</p>
                            {infoManager ? (
                                infoManager?.countDeleteBook
                            ) : (
                                <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                            )}
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="mr-2">Tổng số lượng truyện đã tạo là:</p>
                            {infoManager?.countCreateBook || (
                                <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                            )}
                        </div>
                        <div>
                            <p className="mb-2">Số lượng truyện của từng thể loại là:</p>
                            <ul className="flex flex-wrap gap-3">
                                {infoManager?.countBookOfTags.map((tag) => {
                                    return (
                                        <li key={tag?.tagId} >
                                            <Link href={`http://localhost:3000/tim-truyen?genres=${tag?.tagId}`} target="_blank" className="relative flex">
                                                <div className="px-3 py-1 bg-slate-700 dark:bg-[#c6d4df26] rounded-l-sm text-[#c6d4df]">
                                                    {listIdToData[
                                                        tag?.tagId as keyof typeof listIdToData
                                                    ].title || ""}
                                                </div>
                                                <span className=" text-white bg-red-500 rounded-r-sm px-2 py-1 -top-1 -right-1">{tag?._count.bookTags}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="max-w-[500px] mb-4">
                        <Line
                            data={{
                                labels: [
                                    "2024-01",
                                    "2024-02",
                                    "2024-03",
                                    "2024-04",
                                    "2024-05",
                                    "2024-06",
                                    "2024-07",
                                ],
                                datasets: [
                                    {
                                        data: [
                                            100, 120, 115, 134, 168, 132, 200,
                                        ],
                                        backgroundColor: "blue",
                                    },
                                ],
                            }}
                        />
                    </div> */}

                    <h3 className="font-semibold text-base mb-2">
                        Top thành viên cấp cao
                    </h3>

                    <div className="flex items-center mb-4">
                        <p className="mr-2">Tổng thành viên là:</p>
                        {dataUsers?.countUser || (
                            <span className="w-10 h-5 block rounded-md bg-gray-200 animate-pulse"></span>
                        )}
                    </div>
                    <div className="overflow-y-auto max-w-[400px] relative border rounded-md mb-5">
                        <table className="table-auto w-full">
                            <colgroup>
                                <col style={{ minWidth: "30px" }} />
                                <col style={{ minWidth: "250px" }} />
                            </colgroup>
                            <thead className="text-gray-600 bg-gray-100">
                                <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                    <th className="rounded-tl-md">Id</th>
                                    <th>Người dùng</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm">
                                {status === "authenticated" &&
                                    (dataUsers?.users ? (
                                        dataUsers?.users?.map((user, index) => {
                                            return (
                                                <tr
                                                    key={user?.userId}
                                                    className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                                >
                                                    <td className="text-center">
                                                        {user?.userId}
                                                    </td>
                                                    <td className="">
                                                        <div>
                                                            <div className="flex mb-1 space-x-2">
                                                                <strong>
                                                                    Username:{" "}
                                                                </strong>
                                                                <p>
                                                                    {user?.name}
                                                                </p>
                                                            </div>
                                                            <div className="flex mb-1 space-x-2">
                                                                <strong>
                                                                    Email:{" "}
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        user?.email
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex mb-1 space-x-2">
                                                                <strong>
                                                                    Số chương
                                                                    đọc:{" "}
                                                                </strong>
                                                                <p>
                                                                    {user?.rank ||
                                                                        0}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <SkeletonAdminItemUser count={5} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminBooksActionTemplate;
