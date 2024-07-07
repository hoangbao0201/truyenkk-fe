import clsx from "clsx";
import Image from "next/image";
import { socket } from "@/lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { RootStateChatSlide, addChats } from "@/redux/chatSlide";
import IconSend from "@/components/Modules/Icons/IconSend";
import getTimeMessage from "@/utils/getTimeMessage";
import TextLevel from "../TextLevel";
import { GetChatMessageProps } from "@/services/chat.services";
import imageService from "@/services/image.services";

interface FormChatProps {
    // isShowChatBox: boolean
    // setIsShowChatBox: Dispatch<SetStateAction<bo>>
}
const FormChat = ({}: FormChatProps) => {
    const dispatch = useDispatch();
    const chatSlide = useSelector(
        (state: RootStateChatSlide) => state.chatSlide
    );
    const { data: session, status } = useSession();
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLInputElement>(null);
    const [contentMessage, setContentMessage] = useState<string>("");
    const [dataImage, setDataImage] = useState<{
        fileImage: null | File;
        urlImage: string;
    }>({
        fileImage: null,
        urlImage: "",
    });

    // Handle Send Message
    const handleSendMessage = async () => {
        if (contentMessage.trim().length === 0 && !dataImage?.fileImage) {
            return;
        }

        if (!socket?.id) {
            return;
        }

        try {
            const keyCreatedAt = new Date();
            const dataUser: GetChatMessageProps["sender"] =
                status === "authenticated"
                    ? {
                          userId: session?.user.userId,
                          name: session?.user.name,
                          username: session?.user.username,
                          role: {
                              roleName: session?.user.role.roleName,
                          },
                          item: session?.user.item,
                          rank: session?.user.rank,
                          avatarUrl: session?.user.avatarUrl,
                      }
                    : null;
            
            let image = null;
            // if(dataImage?.fileImage) {
            //     if(session?.user.role.roleName !== "admin") {
            //         alert("Bạn không có quyền hạn này");
            //         return;
            //     }
            //     setDataImage({ fileImage: null, urlImage: "" });
                
            //     const formData = new FormData();
            //     formData.append("Filedata", dataImage?.fileImage);
            //     const imageUpload = await imageService?.uploadArtworksFile({
            //         file: formData,
            //         token: session?.backendTokens.accessToken,
            //     });

            //     if(!imageUpload?.success) {
            //         alert("Upload ảnh thất bại");
            //         return;
            //     }
            //     image = imageUpload?.image;
            // }
            // else {
                // setContentMessage("");
            // }
                setContentMessage("");

            // Send Message Socket
            socket.emit("message", {
                image: image,
                sender: dataUser,
                socketId: socket?.id,
                chatText: contentMessage,
                createdAt: keyCreatedAt,
            });
            dispatch(addChats({
                chatId: -1,
                image: image,
                sender: dataUser,
                socketId: socket?.id,
                chatText: image ? "" : contentMessage,
                createdAt: keyCreatedAt.toISOString(),
            }));
            inputRef?.current?.focus();
        } catch (error) {}
    };

    // Event Onchange Value Send Message
    const eventOnchangeValueSendMessage = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if (value.length > 200) {
            alert("Nội dung không quá 200 kí tự");
            return;
        }
        setContentMessage(value);
    };

    const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            return;
        }
        const dataImg = e.target.files[0];

        setDataImage({
            fileImage: dataImg,
            urlImage: URL.createObjectURL(dataImg),
        });
    };

    useEffect(() => {
        if (messagesEndRef?.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [chatSlide?.chats]);

    // useEffect(() => {
    //     if (inputRef?.current && chatSlide?.isShowChatbox && !matchesMobile) {
    //         inputRef.current.focus();
    //     }
    // }, [chatSlide?.isShowChatbox]);

    return (
        <>
            {/* <div className="chatbox-header"> */}
            <div className="flex-shrink-0 h-[60px] flex items-center px-4 bg-indigo-600">
                <Image
                    unoptimized
                    priority={true}
                    width={100}
                    height={100}
                    alt="Logo TRUYENKK"
                    src={`/static/images/logo.png`}
                    className="w-6 h-6 object-cover"
                />
                <p className="ml-1 text-base text-white font-bold uppercase">
                    TRUYENKK
                </p>

                <div className="ml-auto text-white">
                    <div className="text-[15px] font-semibold text-right">{status === "authenticated" ? session?.user.name : "Thành viên ẩn danh"}</div>
                    <div className="flex items-center justify-end">
                        <span className="relative flex h-[10px] w-[10px] mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-green-400"></span>
                        </span>
                        <div className="text-xs">{chatSlide?.countMember} Thành viên online</div>
                    </div>
                </div>
            </div>
            <div
                // ref={messagesListRef}
                className="relative h-full overflow-x-hidden overflow-y-auto custom-scroll px-2 py-2"
            >
                {chatSlide?.chats && status !== "loading" ? (
                    chatSlide?.chats?.map((message, index) => {
                        const isSender = message?.sender
                            ? message?.sender.userId === session?.user.userId
                            : message?.socketId === socket?.id;
                        const isContinual =
                            index >= 1
                                ? chatSlide?.chats[index].socketId ===
                                  chatSlide?.chats[index - 1].socketId
                                : false;
                        const isLastContinual =
                            chatSlide?.chats.length - 2 >= index
                                ? chatSlide?.chats[index].socketId !==
                                      chatSlide?.chats[index + 1].socketId ||
                                  chatSlide?.chats[index].sender?.userId !==
                                      chatSlide?.chats[index + 1].sender?.userId
                                : chatSlide?.chats.length - 1 === index;
                        return (
                            <div
                                ref={messagesEndRef}
                                key={`${message?.createdAt}`}
                                className={`flex flex-shrink-0  ${
                                    isSender ? "justify-end" : ""
                                } ${isContinual ? "mt-[2px]" : "mt-3"}`}
                            >
                                <div>
                                    <div className="">
                                        <h4
                                            className={clsx(
                                                "text-[12px] ml-14 mr-3",
                                                {
                                                    "flex justify-end":
                                                        isSender,
                                                    hidden: isContinual,
                                                }
                                            )}
                                        >
                                            {message?.sender ? (
                                                <TextLevel
                                                    role={message?.sender.role.roleName}
                                                    isFormLevel={true}
                                                    item={
                                                        message?.sender &&
                                                        message?.sender.item
                                                    }
                                                    rank={message?.sender.rank}
                                                >
                                                    {message?.sender.name}
                                                </TextLevel>
                                            ) : (
                                                "Thành viên ẩn danh"
                                            )}
                                        </h4>
                                        <div
                                            className={clsx(
                                                "flex items-stretch",
                                                {
                                                    "justify-start flex-row-reverse":
                                                        isSender,
                                                }
                                            )}
                                        >
                                            <div className="flex items-end flex-shrink-0">
                                                {!isSender &&
                                                    (isLastContinual ? (
                                                        <Image
                                                            unoptimized
                                                            priority={true}
                                                            width={100}
                                                            height={100}
                                                            alt="Logo TRUYENKK"
                                                            src={`${
                                                                message?.sender
                                                                    ? message
                                                                          ?.sender
                                                                          .avatarUrl
                                                                        ? "https://d32phrebrjmlad.cloudfront.net/" +
                                                                          message
                                                                              ?.sender
                                                                              .avatarUrl
                                                                        : "/static/images/avatar_default.png"
                                                                    : "/static/images/avatar_default.png"
                                                            }`}
                                                            className="w-10 h-10 mr-2 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 mr-2 rounded-full"></div>
                                                    ))}
                                            </div>

                                            {
                                                message?.image ? (
                                                    <div className={isSender ? "ml-auto w-2/3 my-1" : ""}>
                                                        <Image
                                                            unoptimized
                                                            width={500}
                                                            height={500}
                                                            alt="Ảnh"
                                                            src={"https://p21-ad-sg.ibyteimg.com/obj/ad-site-i18n-sg/" + message?.image}
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={clsx(
                                                            "bg-indigo-600 rounded-3xl py-2 px-3",
                                                            {
                                                                "": isSender,
                                                            }
                                                        )}
                                                    >
                                                        <div className="text-white whitespace-pre-wrap break-words	">
                                                            {message?.chatText}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            

                                            <div className="flex items-center flex-shrink-0">
                                                <div
                                                    className={`w-[84px] flex ${
                                                        isSender
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >
                                                    <span className="text-xs mx-2">
                                                        {
                                                            message.chatId === -1 ? (
                                                                "Đang gửi"
                                                            ) : (
                                                                getTimeMessage(
                                                                    new Date(message?.createdAt)
                                                                )
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {!socket?.id && (
                <div className="absolute select-none right-4 left-4 top-1/2 bottom-1/2 text-center h-10 leading-10 px-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    Vui lòng đợi trong giây lát...
                    <div className="loading-bar !h-[3px] !bg-transparent mt-1"></div>
                </div>
            )}
            <div className="flex py-2 px-1 relative">
                {
                    dataImage.fileImage && (
                        <div className="absolute -top-[100px]">
                            <div className="flex items-center h-[100px]">
                                <Image
                                    unoptimized
                                    width={500}
                                    height={500}
                                    alt="Ảnh"
                                    src={dataImage?.urlImage}
                                    className="w-[70px] h-[100px] object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    )
                }
                <input
                    ref={inputRef}
                    value={contentMessage}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                    onChange={eventOnchangeValueSendMessage}
                    className="resize-none leading-10 outline-none bg-gray-100 dark:bg-gray-600 rounded-full focus:border-blue-600 px-3 w-full h-10 border border-transparent"
                />
                <button
                    onClick={handleSendMessage}
                    className={`ml-1 w-10 h-10 rounded-full ${
                        !socket?.id
                            ? "select-none cursor-default opacity-60"
                            : "hover:bg-gray-100 hover:dark:bg-gray-600"
                    }`}
                >
                    <IconSend className="w-10 h-10 p-2 fill-indigo-600" />
                </button>
            </div>
        </>
    );
};

export default FormChat;
