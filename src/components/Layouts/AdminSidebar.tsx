import Image from "next/image";
import IconBook from "../Modules/Icons/IconBook";
import IconChartUser from "../Modules/Icons/IconChartUser";
import IconUserNinja from "../Modules/Icons/IconUserNinja";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const contentNav = [
    {
        title: "",
        children: [
            {
                title: "Cào truyện",
                link: "/admin/crawl/book",
                icon: <IconUserNinja size={20} />,
            },
            {
                title: "Cào Nhiều truyện",
                link: "/admin/crawl/books",
                icon: <IconUserNinja size={20} />,
            },
            {
                title: "Truyện tranh",
                link: "/admin/books",
                icon: <IconBook size={20} />,
            },
            {
                title: "Hoạt động",
                link: "/admin/books/action",
                icon: <IconChartUser size={20} />,
            },
        ],
    },
];


interface AdminSidebarProps {
    isSide: boolean
    matchesMobile: boolean
    pathName: string
    setIsSide: Dispatch<SetStateAction<boolean>>
}
const AdminSidebar = ({ isSide, matchesMobile, pathName, setIsSide }: AdminSidebarProps) => {

    return (
        <aside className="">
            {isSide && matchesMobile && (
                <div
                    onClick={() => setIsSide(false)}
                    className="transition-all ease-out fixed z-[19] top-0 left-0 right-0 bottom-0 bg-black/30"
                ></div>
            )}
            <div
                className={`w-full z-[20] bg-white dark:bg-slate-700 fixed transition-all ease-out duration-300 ${
                    matchesMobile
                        ? isSide
                            ? "left-0 max-w-72"
                            : "-left-72 max-w-72"
                        : isSide
                        ? "max-w-16"
                        : "max-w-72"
                } top-0 bottom-0 border-r`}
            >
                <div className="px-4 py-4">
                    <p className="text-red-600 font-bold uppercase text-xl text-center">
                        <Link
                            title="TRUYENKK"
                            href={`/`}
                            className="flex items-center"
                        >
                            <Image
                                unoptimized
                                width={100}
                                height={100}
                                loading="lazy"
                                alt="Logo TRUYENKK"
                                src={`/static/images/logo.png`}
                                className="w-8 h-8 object-cover"
                            />
                        </Link>
                    </p>
                </div>
                <div>
                    {contentNav.map((nav, index) => {
                        return (
                            <div key={index}>
                                {nav.children.map(
                                    (item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="mb-1"
                                            >
                                                <Link
                                                    href={
                                                        item?.link
                                                    }
                                                >
                                                    <div
                                                        className={`mx-3 px-2 py-2 dark:fill-white flex items-center space-x-2 rounded-md whitespace-nowrap overflow-hidden ${
                                                            item?.link ===
                                                            pathName
                                                                ? "text-white fill-white bg-blue-500"
                                                                : "hover:bg-gray-100 dark:hover:bg-gray-500"
                                                        }`}
                                                    >
                                                        {
                                                            item?.icon
                                                        }
                                                        <span
                                                            className={`${
                                                                !matchesMobile &&
                                                                isSide &&
                                                                "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                item?.title
                                                            }
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    )
}

export default AdminSidebar;