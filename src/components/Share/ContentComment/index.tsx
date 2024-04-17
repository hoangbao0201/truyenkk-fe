"use client"

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

import ReactQuill from "react-quill";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import CardComment from "./CardComment";
import FormEditorComment from "./FormEditorComment";
import commentService, { GetCommentsProps } from "@/services/comment.services";
import SkeletonItemComment from "@/components/Modules/Skeleton/SkeletonItemComment";
import { RootStateCommentSlide, addComments, addReplyComments, setCommentId, setComments } from "@/redux/commentSlide";

interface ContentCommentProps {
    bookId: number
    isRead?: boolean
    chapterNumber?: number
    comments: GetCommentsProps[]
}
const ContentComment = ({ isRead = false, bookId, chapterNumber, comments }: ContentCommentProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const commentSlide = useSelector(
        (state: RootStateCommentSlide) => state.commentSlide
    );

    const editorRef = useRef<ReactQuill>(null);
    const [isDisabledComment, setIsDisabledComment] = useState(false);
    const [editorState, setEditorState] = useState<string>("");

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
        if(!session) {
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
        if(isDisabledComment) {
            alert("Bạn bình luận quá nhanh. Vui lòng đợi 10 giây nữa để bình luận tiếp.");
            return;
        }
        setIsDisabledComment(true);
        setTimeout(() => {
            setIsDisabledComment(false);
        }, 15000);

        const textLength = editorState.replace(/<[^>]*>/g, '').length;
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

    useEffect(() => {
        if(comments) {
            dispatch(setComments(comments));
        }
    }, [comments])

    return (
        <div className="md:px-5 px-3 py-5 dark:bg-slate-900 mt-5 md:rounded-md">
            
            <h5 id="comment" className="text-lg font-semibold mb-2 scroll-mt-[70px]">
                Bình luận truyện
            </h5>
            <div className={`pb-3`}>
                {status === "unauthenticated" && (
                    <>
                        Hãy{" "}
                        <Link aria-label={`đăng nhập`} className="font-semibold text-blue-500 hover:underline" href={`/auth/login`}>
                            đăng nhập
                        </Link>{" "}
                        hoặc{" "}
                        <Link aria-label={`đăng ký`} className="font-semibold text-blue-500 hover:underline" href={`/auth/login`}>
                            đăng ký
                        </Link>{" "}
                        để bắt đầu bình luận
                    </>
                )}
            </div>

            <div className="pb-4 block">
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
            

            <div className={`list-item-comment -mx-2 ${isRead ? "readItemChild" : ""}`}>
                {commentSlide?.isLoading ? (
                    <SkeletonItemComment count={3} />
                ) : (
                    commentSlide?.comments &&
                    commentSlide?.comments.map((comment: any, index: number) => {
                        return (
                            <Fragment key={`${comment?.commentId}-${index}`}>
                                <CardComment
                                    isDisabledComment={isDisabledComment}
                                    setIsDisabledComment={setIsDisabledComment}
                                    bookId={bookId}
                                    user={session?.user}
                                    comment={comment}
                                    handleSendComment={handleSendComment}
                                />
                            </Fragment>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ContentComment;
