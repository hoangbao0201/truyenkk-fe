import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";
import { Suspense, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import convertTime from "@/utils/convertTime";
import { usePathname, useRouter } from "next/navigation";
import IconComment from "@/components/Modules/Icons/IconComment";
import commentService, { GetNotificationsProps } from "@/services/comment.services";

const CountNotification = dynamic(() => import('./CountNotification'), { ssr: false });

const Notification = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dropdownNotificationRef = useRef(null);
    const { data: session, status } = useSession();

    const [comments, setComments] = useState<GetNotificationsProps[] | null>();
    const [isNotification, setIsNotification] = useState(false);

    useOnClickOutside(dropdownNotificationRef, () => setIsNotification(false));

    const eventGetNotification = async () => {
        if (status !== "authenticated") {
            return;
        }
        try {
            const commentsRes = await commentService.findAllNotification({
                token: session?.backendTokens.accessToken,
            });

            if (commentsRes?.success) {
                setComments(commentsRes?.comments);
            }
        } catch (error) {}
    };

    const handleChangePage = async ({
        isRead,
        bookId,
        parentId,
        commentId,
    }: {
        isRead: boolean;
        bookId: number;
        parentId: number;
        commentId: number;
    }) => {
        if (status !== "authenticated") {
            return;
        }
        try {
            if (!isRead && comments) {
                commentService.readComment({
                    token: session?.backendTokens.accessToken,
                    commentId,
                });
                const updatedComments = await comments.map((obj) => {
                    if (obj?.commentId === commentId) {
                        return { ...obj, isRead: true };
                    }
                    return obj;
                });
                setComments(updatedComments);
            }
            router.push(`/truyen/${bookId}?isRead=${parentId}#comment`);
        } catch (error) {}
    };

    useEffect(() => {
        if (status === "authenticated") {
            eventGetNotification();

            const intervalId = setInterval(eventGetNotification, 60000);

            return () => clearInterval(intervalId);
        }
    }, [status]);

    useEffect(() => {
        setIsNotification(false);
    }, [pathname]);

    return (
        <>
            <div className="w-10 h-10" ref={dropdownNotificationRef}>
                <button
                    title="Thông báo"
                    onClick={() => setIsNotification((state) => !state)}
                    className="relative select-none bg-gray-100 transition-all duration-75 cursor-pointer active:scale-105 dark:bg-slate-800/70 rounded-full outline-blue-600 outline-2 hover:outline-dashed"
                >
                    <IconComment
                        className="w-10 h-10 px-2 fill-gray-500 dark:fill-white"
                        size={22}
                    />
                    <Suspense>
                        {comments && <CountNotification comments={comments} />}
                    </Suspense>
                </button>
                {status !== "loading" && isNotification && (
                    <div className="absolute top-[52px] right-0 sm:w-[500px] w-full mt-1 z-[10] px-1">
                        <div className="bg-white dark:bg-slate-700 shadow-md p-1 rounded-md">
                            <div className="font-lg font-semibold text-center mb-1">
                                Thông báo
                            </div>
                            {status === "authenticated" ? (
                                <div className="max-h-[372px] overflow-y-auto space-y-1 px-1">
                                    {comments &&
                                        comments.map((comment) => {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleChangePage({
                                                            isRead: comment?.isRead,
                                                            bookId: comment?.bookId,
                                                            commentId:
                                                                comment?.commentId,
                                                            parentId:
                                                                comment?.parentId,
                                                        })
                                                    }
                                                    className={`flex px-2 py-2 rounded-md cursor-pointer  ${
                                                        comment?.isRead
                                                            ? "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 dark:bg-transparent dark:hover:bg-slate-600 dark:active:bg-slate-500"
                                                            : "bg-red-50 hover:bg-red-100 active:bg-gray-200 dark:bg-gray-600 hover:dark:bg-gray-500"
                                                    }`}
                                                    key={`${comment?.commentId}`}
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <Image
                                                            unoptimized
                                                            loading="lazy"
                                                            width={100}
                                                            height={200}
                                                            alt="Avatar"
                                                            className="w-9 h-9 rounded-full overflow-hidden object-cover"
                                                            src={`/static/images/avatar_default.png`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="line-clamp-2">
                                                            <strong>
                                                                {
                                                                    comment
                                                                        ?.sender
                                                                        .name
                                                                }
                                                            </strong>{" "}
                                                            đã trả lời bình luận
                                                            của bạn trong truyện{" "}
                                                            <strong>
                                                                {
                                                                    comment
                                                                        ?.book
                                                                        .title
                                                                }
                                                                .
                                                            </strong>
                                                        </div>
                                                        <div className="text-sm">
                                                            {convertTime(
                                                                comment?.createdAt
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <div className="px-2 py-2 text-center">
                                    Bạn chưa đăng nhập!{" "}
                                    <Link
                                        href={`/auth/login`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Notification;
