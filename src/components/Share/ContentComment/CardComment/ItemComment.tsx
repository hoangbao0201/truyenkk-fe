"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

import AvatarRank from "../../AvatarRank";
import convertTime from "@/utils/convertTime";
import { GetCommentsProps } from "@/services/comment.services";

const ButtonAction = dynamic(() => import("./ButtonAction"), { ssr: false });
const TextLevel = dynamic(() => import("@/components/Share/TextLevel"), {
    ssr: false,
    loading: () => (
        <div className="w-[110px] h-[20px] my-[2px] rounded-sm bg-gray-300 animate-pulse"></div>
    ),
});

interface ItemCommentProps {
    comment: GetCommentsProps;
    isReply?: boolean;
    isSended?: boolean;
    childIndex?: number;
    isLastChild?: boolean;
    isShowMore?: boolean;
    setReceiver: Dispatch<
        SetStateAction<{
            receiverId: number | null;
        }>
    >;
}

const ItemComment = ({
    comment,
    isReply,
    setReceiver,
    isSended,
    isLastChild,
    isShowMore,
}: ItemCommentProps) => {
    return (
        <div className="relative">
            <div className={`flex item-comment relative ${isReply && "pl-12"}`}>
                {isReply ? (
                    <>
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[20px] absolute left-[20px] top-[0px] rounded-bl-xl"></div>
                        {(!isLastChild || isShowMore) && (
                            <div className="border-l-[2.5px] border-gray-200 w-6 h-full absolute left-[20px] top-[0px] bottom-[0px]"></div>
                        )}
                    </>
                ) : (
                    comment?._count.replyComments > 0 && (
                        <div
                            style={{ height: "calc(100% - 45px)" }}
                            className="border-l-[2.5px] border-gray-200 w-6 h-full absolute left-[20px] bottom-[0px]"
                        ></div>
                    )
                )}

                <div className="flex-shrink-0">
                    <AvatarRank rank={1}>
                        <Image
                            unoptimized
                            loading="lazy"
                            width={60}
                            height={60}
                            alt={`Ảnh người dùng ${comment?.sender.name}`}
                            src={
                                comment?.sender.avatarUrl
                                    ? "https://hentaikk.cloudkkvippro.online/" +
                                      comment?.sender.avatarUrl
                                    : "/static/images/avatar_default.png"
                            }
                            className={`${
                                isReply
                                    ? "md:w-8 md:h-8 w-8 h-8"
                                    : "md:w-10 md:h-10 w-9 h-9"
                            } block object-cover rounded-full`}
                        />
                    </AvatarRank>
                </div>
                <div className="ml-2 pb-1 flex-1">
                    <div className="flex items-center w-full">
                        <div className="border dark:border-none rounded-[20px] py-[8px] px-[12px] mb-1 bg-gray-100 dark:bg-slate-700 min-h-[50px]">
                            <div className="flex items-center flex-wrap gap-x-2">
                                <TextLevel
                                    item={comment?.sender.item}
                                    role={comment?.sender.role.roleName}
                                    rank={comment?.sender.rank}
                                >
                                    {comment?.sender.name}
                                </TextLevel>
                                {comment?.chapterNumber && (
                                    <span className="text-blue-500 text-[12px] italic">
                                        Chapter {comment?.chapterNumber}
                                    </span>
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <div
                                    className="relative text-[17px]"
                                    dangerouslySetInnerHTML={{
                                        __html: JSON.parse(
                                            comment?.commentText
                                        ),
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 flex items-center whitespace-nowrap gap-4 pb-1 h-[29px]">
                        {isSended ? (
                            <span className="text-sm font-medium">
                                Đang viết...
                            </span>
                        ) : (
                            <>
                                <span className="text-sm">
                                    {convertTime(comment?.createdAt)}
                                </span>
                                <span
                                    onClick={() =>
                                        setReceiver({
                                            receiverId: comment?.sender.userId,
                                        })
                                    }
                                    className="text-sm font-medium hover:underline cursor-pointer"
                                >
                                    Phản hồi
                                </span>
                                <ButtonAction
                                    parentId={comment?.parentId}
                                    senderId={comment?.sender.userId}
                                    commentId={comment?.commentId}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemComment;
