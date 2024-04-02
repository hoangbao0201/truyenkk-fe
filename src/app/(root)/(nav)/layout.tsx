import MainNav from "@/components/Partials/MainNav";
import IconCircleInfo from "@/components/Modules/Icons/IconCircleInfo";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MainNav />
            <div className="mt-2 mx-1">
                <div>
                    <div className="relative xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto rounded-sm overflow-hidden shadow-sm bg-blue-500 flex items-center">
                        <div className="px-3 py-4 h-full">
                            <IconCircleInfo  className="fill-white"/>
                        </div>
                        <span className="relative flex h-3 w-3 translate-x-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                        <div className="pl-3 pr-2 py-1 leading-tight bg-white dark:bg-gray-700 flex-1">
                            <div>Fix xong rồi nha anh em, tận hưởng đi nào &lt;3</div>
                            <div className="text-sm mt-1">
                                Tham gia fanpage <Link href={`https://www.facebook.com/ilovetruyentranh`} target="_blank" className="underline cursor-pointer">facebook</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main className="block">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
