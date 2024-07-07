"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useRef, useState } from "react";

import ReactQuill from "react-quill";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import CardComment from "./CardComment";
import { NavButtonPagination } from "../NavButtonPagination";
import commentService, { GetCommentsProps } from "@/services/comment.services";
import SkeletonItemComment from "@/components/Modules/Skeleton/SkeletonItemComment";
import {
    RootStateCommentSlide,
    addComments,
    addReplyComments,
    setCommentId,
    setComments,
    setIsLoading,
} from "@/redux/commentSlide";

const FormEditorComment = dynamic(() => import("./FormEditorComment"), {
    ssr: false,
    loading: () => (
        <div className="rounded-md animate-pulse h-[116px] bg-gray-200 dark:bg-slate-800"></div>
    ),
});

interface ContentCommentProps {
    bookId: number;
    isRead?: boolean;
    chapterNumber?: number;
    comments: GetCommentsProps[];
    countPage: number
}
const ContentComment = ({
    isRead = false,
    bookId,
    chapterNumber,
    comments,
    countPage,
}: ContentCommentProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const commentSlide = useSelector(
        (state: RootStateCommentSlide) => state.commentSlide
    );

    const commentRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<ReactQuill>(null);
    const [isDisabledComment, setIsDisabledComment] = useState(false);
    const [editorState, setEditorState] = useState<string>("");
    const [pageNumber, setPageNumber] = useState(1);

    // Handle Send Comment
    const handleSendComment = async ({
        receiverId,
        parentId,
        commentText,
    }: {
        receiverId?: number;
        parentId?: number;
        commentText: string;
    }) => {
        if (!session) {
            return;
        }

        try {
            // Add comment before posting to the Server
            if (receiverId && parentId) {
                dispatch(
                    addReplyComments({
                        commentId: parentId,
                        replyComments: [
                            {
                                bookId: bookId,
                                chapterNumber: chapterNumber,
                                commentId: -1,
                                commentText: JSON.stringify(commentText.trim()),
                                parentId: parentId,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                sender: {
                                    userId: session.user.userId,
                                    name: session.user.name,
                                    username: session.user.username,
                                    rank: session.user.rank,
                                    item: session.user.item,
                                    role: {
                                        roleId: session.user.role.roleId,
                                        roleName: session.user.role.roleName,
                                    },
                                    avatarUrl: session.user.avatarUrl,
                                },
                                receiver: {
                                    userId: receiverId,
                                    name: "",
                                    username: "",
                                },
                            },
                        ],
                    })
                );
            } else {
                dispatch(
                    addComments({
                        bookId: bookId,
                        chapterNumber: chapterNumber ?? null,
                        commentId: -1,
                        commentText: JSON.stringify(commentText.trim()),
                        parentId: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        sender: {
                            userId: session.user.userId,
                            name: session.user.name,
                            username: session.user.username,
                            rank: session.user.rank,
                            item: session?.user.item,
                            role: {
                                roleId: session.user.role.roleId,
                                roleName: session.user.role.roleName,
                            },
                            avatarUrl: session.user.avatarUrl,
                        },
                        _count: {
                            replyComments: 0,
                        },
                    })
                );
            }

            const commentRes = await commentService.addComment({
                data: {
                    bookId,
                    chapterNumber,
                    receiverId,
                    parentId,
                    commentText: JSON.stringify(commentText.trim()),
                },
                token: session.backendTokens.accessToken,
            });

            if (commentRes?.success) {
                if (receiverId && parentId) {
                    dispatch(
                        setCommentId({
                            type: "replycomment",
                            commentId: commentRes?.comment.commentId,
                            parentId: parentId,
                        })
                    );
                } else {
                    dispatch(
                        setCommentId({
                            type: "comment",
                            commentId: commentRes?.comment.commentId,
                        })
                    );
                }
            }
        } catch (error) {}
    };

    // Call Handle Send Comment
    const handleCallSendComment = async ({
        receiverId,
        parentId,
    }: {
        receiverId?: number;
        parentId?: number;
    }) => {
        if (isDisabledComment) {
            alert(
                "Bạn bình luận quá nhanh. Vui lòng đợi 10 giây nữa để bình luận tiếp."
            );
            return;
        }
        setIsDisabledComment(true);
        setTimeout(() => {
            setIsDisabledComment(false);
        }, 15000);

        const textLength = editorState.replace(/<[^>]*>/g, "").length;
        if (textLength < 3 || textLength >= 600) {
            alert("Nhập trên 3 và nhỏ hơn 600 kí tự");
            return;
        }

        try {
            editorRef.current?.focus();
            setEditorState("");

            await handleSendComment({
                receiverId,
                parentId,
                commentText: editorState.replace(/<p><br><\/p>/g, ""),
            });
        } catch (error) {}
    };

    const handleChangePage = async (page: number) => {
        setPageNumber(page);
        try {
            if (commentRef?.current) {
                commentRef?.current.scrollIntoView({
                    behavior: "instant",
                    block: "start",
                });
            }
            dispatch(setIsLoading(true));
            const dataComments = await commentService.findAll({
                query: `?bookId=${bookId}&otherId=${
                    isRead || ""
                }&take=${8}&skip=${(page - 1) * 8}`,
                cache: "force-cache",
            });

            dispatch(setComments([...dataComments.comments]));
        } catch (error) {}
    };

    useEffect(() => {
        if (comments) {
            dispatch(setComments([...comments]));
        }
    }, [comments]);

    return (
        <div className="md:px-5 px-3 py-5 dark:bg-slate-900/50 md:rounded-md">
            <h5
                ref={commentRef}
                id="comment"
                className="text-lg font-semibold mb-2 scroll-mt-[70px]"
            >
                Bình luận truyện
            </h5>
            {status === "authenticated" && (
                <div>
                    <Link
                        href={"/secure/user-profile"}
                        prefetch={false}
                        className="mt-2 text-sm text-blue-600 underline"
                    >
                        Đổi tên ngay
                    </Link>
                </div>
            )}
            <div className={`pb-3`}>
                {status === "unauthenticated" && (
                    <>
                        Hãy{" "}
                        <Link
                            aria-label={`đăng nhập`}
                            className="font-semibold text-blue-500 hover:underline"
                            href={`/auth/login`}
                        >
                            đăng nhập
                        </Link>{" "}
                        hoặc{" "}
                        <Link
                            aria-label={`đăng ký`}
                            className="font-semibold text-blue-500 hover:underline"
                            href={`/auth/login`}
                        >
                            đăng ký
                        </Link>{" "}
                        để bắt đầu bình luận
                    </>
                )}
            </div>

            <div className="mb-4 block">
                <FormEditorComment
                    isReply={false}
                    sender={session?.user}
                    receiver={session?.user}
                    editorRef={editorRef}
                    isEditorComment={false}
                    dataComment={editorState}
                    setDataComment={setEditorState}
                    handleSend={handleCallSendComment}
                />
            </div>

            <div
                className={`list-item-comment -mx-2 ${
                    isRead ? "readItemChild" : ""
                }`}
            >
                {commentSlide?.isLoading ? (
                    <SkeletonItemComment count={3} />
                ) : (
                    commentSlide?.comments &&
                    commentSlide?.comments.map(
                        (comment: any, index: number) => {
                            if (Object.keys(comment).length > 0) {
                                return (
                                    <Fragment
                                        key={`${comment?.commentId}-${index}`}
                                    >
                                        <CardComment
                                            isDisabledComment={
                                                isDisabledComment
                                            }
                                            setIsDisabledComment={
                                                setIsDisabledComment
                                            }
                                            bookId={bookId}
                                            user={session?.user}
                                            comment={comment}
                                            handleSendComment={
                                                handleSendComment
                                            }
                                        />
                                    </Fragment>
                                );
                            } else {
                                <Fragment key={`${new Date().toISOString()}`}>
                                    Rỗng
                                </Fragment>;
                            }
                        }
                    )
                )}
            </div>

            {
                countPage > 1 && (
                    <NavButtonPagination
                        currentPage={pageNumber}
                        countPage={countPage}
                        handleChangePage={handleChangePage}
                    />
                )
            }
        </div>
    );
};

export default ContentComment;
