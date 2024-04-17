"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import DropdownButton from "../../DropdownButton";
import { deleteComment } from "@/redux/commentSlide";
import { useDispatch, useSelector } from "react-redux";
import commentService from "@/services/comment.services";
import IconEllipsis from "@/components/Modules/Icons/IconEllipsis";
import { RootStateTypeLoadingSlide, setTypeLoading } from "@/redux/typeLoadingSlide";

const Modal = dynamic(() => import("../../Modal"), { ssr: false });

interface ButtonActionProps {
    parentId: number | null;
    commentId: number;
    senderId: number;
}
const ButtonAction = ({ parentId, commentId, senderId }: ButtonActionProps) => {
    const dispatch = useDispatch();
    const typeLoadingSlide = useSelector(
        (state: RootStateTypeLoadingSlide) => state.typeLoading
    );
    const { data: session, status } = useSession();
    const [isOptions, setIsOptions] = useState(false);
    const [isFormDeleteBlog, setIsFormDeleteBlog] = useState(false);

    const handleEditComment = async () => {
        try {
        } catch (error) {}
    };
    const handleDeleteComment = async () => {
        if (!session || status !== "authenticated") {
            return;
        }
        dispatch(setTypeLoading("button_delete_comment"));

        try {
            const commentRes = await commentService.delete({
                commentId: commentId,
                token: session?.backendTokens.accessToken,
            });
            if (commentRes.success) {
                dispatch(
                    deleteComment({
                        commentId: commentId,
                        parentId: parentId,
                    })
                );
            }
            dispatch(setTypeLoading(""));
            setIsFormDeleteBlog(false);
        } catch (error) {}
    };

    return (
        <>
            <DropdownButton
                isOptions={isOptions}
                setIsOptions={setIsOptions}
                className="top-full right-0 translate-x-1/3 shadow-lg border rounded-md bg-white dark:bg-gray-800"
                content={
                    <div className="py-2 px-2 min-w-[300px] select-none">
                        {status === "loading" ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            <>
                                {(senderId === session?.user.userId || session?.user.role.roleName === "admin") && (
                                    <>
                                        <div
                                            onClick={handleEditComment}
                                            className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer"
                                        >
                                            Chỉnh sửa bài luận
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsFormDeleteBlog(true);
                                                setIsOptions(false);
                                            }}
                                            className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer"
                                        >
                                            Xóa bình luận
                                        </div>
                                    </>
                                )}

                                <div className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer">
                                    Báo cáo bình luận
                                </div>
                            </>
                        )}
                    </div>
                }
            >
                <span className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/30 block">
                    <IconEllipsis className="fill-gray-700 dark:fill-gray-100" />
                </span>
            </DropdownButton>
            <Modal
                isOpen={isFormDeleteBlog}
                size="medium"
                setIsOpen={setIsFormDeleteBlog}
                title="Xóa bình luận?"
            >
                <div className="">
                    Bạn không thể khôi phục bình luận này nếu xóa đi.
                </div>

                <div className="text-right mt-4">
                    <button
                        title="Nút hủy phương thức"
                        onClick={() => setIsFormDeleteBlog(false)}
                        className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                    >
                        Hủy
                    </button>
                    <button
                        title="Nút xóa bình luận"
                        onClick={handleDeleteComment}
                        className="py-2 px-3 rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                    >
                        Xóa{" "}
                        {typeLoadingSlide.nameTypeLoading === "button_delete_comment" && (
                            <span
                                style={{ borderColor: "white" }}
                                className="w-3 h-3 loading-button"
                            ></span>
                        )}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ButtonAction;
