"use client"

import { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState } from "react";

import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";

import ItemComment from "./ItemComment";
import commentService, { GetCommentsProps } from "@/services/comment.services";
import { addReplyComments } from "@/redux/commentSlide";
import FormEditorComment from "../FormEditorComment";
import IconArrowTurnUp from "@/components/Modules/Icons/IconArrowTurnUp";
import {
    RootStateTypeLoadingSlide,
    setTypeLoading,
} from "@/redux/typeLoadingSlide";
import IconLoadingSpin from "@/components/Modules/Icons/IconLoadingSpin";

interface CardCommentProps {
    user?: {
        userId: number;
        name: string;
        username: string;
        email: string;
        description: "" | null;
        rank: number;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        role: {
            roleId: number,
            roleName: "admin" | "editor" | "guest"
        };
    };
    bookId: number;
    comment: GetCommentsProps & { replyComments: GetCommentsProps[] };
    handleSendComment: ({ receiverId, parentId, commentText, }: {
        receiverId?: number | undefined;
        parentId?: number | undefined;
        commentText: string;
    }) => Promise<void>;
    isDisabledComment: boolean
    setIsDisabledComment: Dispatch<SetStateAction<boolean>>
}
const CardComment = ({
    bookId,
    user,
    comment,
    isDisabledComment,
    setIsDisabledComment,
    handleSendComment,
}: CardCommentProps) => {
    const dispatch = useDispatch();
    const typeLoadingSlide = useSelector(
        (state: RootStateTypeLoadingSlide) => state.typeLoading
    );
    const editorRef = useRef<ReactQuill>(null);

    const [editorState, setEditorState] = useState<string>("");
    const [dataReceiver, setDataReceiver] = useState<{
        receiverId: number | null;
    }>({
        receiverId: null,
    });

    // Handle Get Reply Comments
    const handleGetReplyComments = async () => {
        dispatch(setTypeLoading(`replycomment_${comment?.commentId}`));
        try {
            const replyCommentsRes = await commentService.findAll({
                query: `?bookId=${bookId}&parentId=${
                    comment?.commentId
                }&take=10&skip=${comment?.replyComments?.length || 0}`,
            });
            if (replyCommentsRes?.success) {
                dispatch(
                    addReplyComments({
                        commentId: comment.commentId,
                        replyComments: replyCommentsRes?.comments,
                    })
                );
            }
            dispatch(setTypeLoading(""));
        } catch (error) {
            dispatch(setTypeLoading(""));
        }
    };

    // Call Handle Get Reply Comments
    const handleCallSendComment = async () => {
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
                receiverId: dataReceiver?.receiverId || undefined,
                parentId: comment?.commentId,
                commentText: editorState.replace(/<p><br><\/p>/g, ""),
            });
        } catch (error) {
            editorRef.current?.focus();
            setEditorState("");
        }
    };

    return (
        <div className="relative item-comment px-2 pt-2 pb-1 mb-1 rounded-md">
            <ItemComment
                isSended={comment?.commentId === -1}
                isReply={false}
                comment={comment}
                setReceiver={setDataReceiver}
            />
            <div className="relative">
                {comment?.replyComments &&
                    comment?.replyComments.map(
                        (replyComment: any, index: number) => {
                            return (
                                <Fragment key={replyComment.commentId}>
                                    <ItemComment
                                        isReply={true}
                                        comment={replyComment}
                                        setReceiver={setDataReceiver}
                                        isShowMore={
                                            comment._count.replyComments -
                                                (comment?.replyComments
                                                    ?.length || 0) >
                                                0 || !!dataReceiver?.receiverId
                                        }
                                        isLastChild={
                                            comment?.replyComments?.length ===
                                            index + 1
                                        }
                                        isSended={
                                            replyComment?.commentId === -1
                                        }
                                    />
                                </Fragment>
                            );
                        }
                    )}
            </div>

            <div>
                {(comment?.replyComments
                    ? comment._count.replyComments >
                      comment?.replyComments.length
                    : comment?._count.replyComments > 0) && (
                    <div className="pl-12 text-sm relative">
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[16px] absolute left-[20px] top-[0px] rounded-bl-xl"></div>
                        <div
                            className={`cursor-pointer whitespace-nowrap flex items-center select-none hover:underline py-[5px]
                            `}
                            onClick={handleGetReplyComments}
                        >
                            <IconArrowTurnUp
                                size={17}
                                className="fill-gray-800 dark:fill-gray-200 rotate-90 mx-2"
                            />
                            <span className="mr-2">
                                Xem tất cả{" "}
                                {comment?._count.replyComments -
                                    (comment?.replyComments?.length || 0)}{" "}
                                phản hồi
                            </span>

                            {typeLoadingSlide?.nameTypeLoading ===
                                `replycomment_${comment?.commentId}` && (
                                <IconLoadingSpin size={13} />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="pl-12 relative">
                {dataReceiver?.receiverId && (
                    <>
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[78px] absolute left-[20px] -top-[50px] rounded-bl-xl"></div>
                        <FormEditorComment
                            isReply={true}
                            sender={user}
                            editorRef={editorRef}
                            isEditorComment={false}
                            receiver={comment.sender}
                            dataComment={editorState}
                            setDataComment={setEditorState}
                            handleSend={handleCallSendComment}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CardComment;
