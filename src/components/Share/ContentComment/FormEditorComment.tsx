"use client"

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Dispatch, RefObject, SetStateAction, useState } from "react";

import ReactQuill from "react-quill";
import AvatarRank from "../AvatarRank";
import { useSession } from "next-auth/react";

const EditorComment = dynamic(() => import("./CardComment/EditorComment"), {
    ssr: false,
});


interface FormEditorCommentProps {
    sender?: {
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
    receiver: any
    isReply: boolean
    editorRef: RefObject<ReactQuill>;
    handleSend: ({receiverId, parentId}: {
        receiverId?: number;
        parentId?: number;
    }) => void;
    isEditorComment: boolean;
    dataComment: string;
    setDataComment: Dispatch<SetStateAction<string>>
}
const FormEditorComment = ({
    editorRef,
    sender,
    isReply,
    handleSend,
    isEditorComment,
    dataComment,
    setDataComment,
}: FormEditorCommentProps) => {
    const { status } = useSession();
    const [isFormEditor, setIsFormEditor] = useState(isEditorComment);

    const handleShowFormEditor = () => {
        if(status !== "authenticated") {
            alert("Bạn chưa đăng nhập tài khoản");
            return;
        }
        setIsFormEditor(true);
    }

    return (
        <div className="flex py-2 px-2 -mx-2 rounded-md">
            <div className="flex-shrink-0">
                <AvatarRank rank={1}>
                    <Link aria-label={`${sender?.name}`} href={`/`}>
                        <Image
                            unoptimized
                            loading="lazy"
                            width={60}
                            height={60}
                            alt="ảnh người dùng"
                            src={"/static/images/avatar_default.png"}
                            className={`${isReply ? "md:w-8 md:h-8 w-8 h-8" : "md:w-10 md:h-10 w-9 h-9"} block object-cover rounded-full`}
                        />
                    </Link>
                </AvatarRank>
            </div>
            <div className="w-full flex-1 flex-shrink-0 ml-2">
                <div
                    className="rounded-md border dark:border-gray-600 mb-2 bg-gray-100 dark:bg-slate-700 min-h-[50px] transition-all"
                    onClick={handleShowFormEditor}
                >
                    {isFormEditor ? (
                        <>
                            <div className="">
                                <EditorComment
                                    editorRef={editorRef}
                                    placeholder="Viết bình luận..."
                                    editorState={dataComment}
                                    setEditorState={setDataComment}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-500 py-3 px-3 cursor-text">Viết bình luận...</div>
                    )}
                </div>
                <div className="flex space-x-2">
                    <input
                        className="w-full px-3 py-2 border dark:border-gray-600 text-gray-500 rounded-md outline-none"
                        disabled={true}
                        value={sender?.name || " "}
                    />
                    <button
                        title="Nút gởi tin nhắn"
                        onClick={() => handleSend({})}
                        className={`${!sender && "pointer-events-none"} select-none text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]`}
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormEditorComment;
