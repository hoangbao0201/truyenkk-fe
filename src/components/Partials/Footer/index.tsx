import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Footer = () => {
    return (
        <footer>
            <div className="bg-slate-800 shadow">
                <div className="text-white xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto py-5 px-3">
                    <div className="-mx-3">
                        <div className="lg:flex">
                            <div className="lg:w-4/12 px-3 mb-4">
                                <div className="mb-2">
                                    <Link
                                        href={`/`}
                                        className="flex items-center"
                                    >
                                        <Image
                                            unoptimized
                                            loading="lazy"
                                            width={100}
                                            height={100}
                                            alt="Logo TRUYENKK"
                                            src={`/static/images/logo.png`}
                                            className="w-8 h-8 object-cover"
                                        />
                                        <p className="ml-2 text-2xl text-white font-bold uppercase">
                                            TRUYENKK
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        href={`/chinh-sach-bao-mat`}
                                        className="hover:underline"
                                    >
                                        Chính sách bảo mật
                                    </Link>
                                </div>

                                <div>
                                    <Suspense fallback={<div className="w-[280px] h-[100px]"></div>}>
                                        <iframe
                                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Filovetruyentranh&tabs=Fanpage%20ILOVE%20Truy%E1%BB%87n%20Tranh&width=280&height=70&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=7580406775327227"
                                            width="280"
                                            height="100"
                                            style={{
                                                border: "none",
                                                overflow: "hidden",
                                            }}
                                            scrolling="no"
                                            frameBorder="0"
                                            loading="lazy"
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        ></iframe>
                                    </Suspense>
                                </div>
                            </div>

                            <div className="lg:w-8/12 px-3 mb-4">
                                <div className="mb-3">
                                    <div>
                                        <span>
                                            © 2021 Copyright:{" "}
                                            <span className="font-bold">
                                                TRUYENKK
                                            </span>
                                            . Liên hệ quảng cáo - Telegram:{" "}
                                            <Link
                                                target="_blank"
                                                href={`https://t.me/sknguyen09`}
                                                className="hover:underline"
                                            >
                                                @sknguyen09
                                            </Link>
                                            .
                                        </span>
                                    </div>
                                </div>
                                <p className="font-semibold mb-2">Từ khóa</p>
                                <ul className="text-sm whitespace-nowrap flex flex-wrap [&>li>a]:block [&>li]:mb-2 [&>li]:mr-2 [&>li>a]:border [&>li>a]:p-1 [&>li>a]:rounded-md">
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Netruyen"
                                        >
                                            Netruyen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Hentaivn"
                                        >
                                            Hentaivn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Lxhentai"
                                        >
                                            Lxhentai
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Hentai18vn"
                                        >
                                            Hentai18vn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyenvn"
                                        >
                                            Truyenvn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyenhentaivn"
                                        >
                                            Truyenhentaivn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Vi-hentai"
                                        >
                                            Vi-hentai
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyện tranh"
                                        >
                                            Truyện tranh
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyen tranh online"
                                        >
                                            Truyen tranh online
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Đọc truyện tranh"
                                        >
                                            Đọc truyện tranh
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyện tranh hot"
                                        >
                                            Truyện tranh hot
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyện tranh hay"
                                        >
                                            Truyện tranh hay
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Truyện ngôn tình"
                                        >
                                            Truyện ngôn tình
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Manhwa"
                                        >
                                            Manhwa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Manga"
                                        >
                                            Manga
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="Manhua"
                                        >
                                            Manhua
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="truyenqq"
                                        >
                                            truyenqq
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="mi2manga"
                                        >
                                            mi2manga
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="doctruyen3q"
                                        >
                                            doctruyen3q
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="toptruyen"
                                        >
                                            toptruyen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="cmanga"
                                        >
                                            cmanga
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="vlogtruyen"
                                        >
                                            vlogtruyen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="blogtruyen"
                                        >
                                            blogtruyen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="truyentranhaudio"
                                        >
                                            truyentranhaudio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            target="_self"
                                            title="vcomi"
                                        >
                                            vcomi
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
