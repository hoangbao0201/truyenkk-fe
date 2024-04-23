import clsx from "clsx";
import Image from "next/image";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import { useOnClickOutside } from "usehooks-ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import IconSend from "@/components/Modules/Icons/IconSend";
import IconClose from "@/components/Modules/Icons/IconClose";
import IconComment from "@/components/Modules/Icons/IconComment";
import chatService, { GetChatMessageProps } from "@/services/chat.services";

const ChatBox = () => {
    const formMessageRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: session, status } = useSession();
    const [isShowChatBox, setIsShowChatBox] = useState(false);
    const [listMessage, setListMessage] = useState<GetChatMessageProps[]>([]);
    const [sendMessage, setSendMessage] = useState<{
        socketId: null | string;
        content: string;
    }>({
        socketId: null,
        content: "",
    });
    const [isConnected, setIsConnected] = useState(false);
    const [isDisabledChat, setIsDisabledChat] = useState(false);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);

            if (socket?.id) {
                setSendMessage({
                    ...sendMessage,
                    socketId: socket?.id,
                });
            }
        }

        function onDisconnect() {
            setIsConnected(false);
            // setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    useEffect(() => {
        socket.on("message", (message) => {
            if (message?.success) {
                const dataMessage = message?.message;
                const newMessage = [...listMessage];
                setListMessage([...newMessage, dataMessage]);
            }
        });
    }, [listMessage]);

    const handleGetListMessage = async () => {
        try {
            const messagesRes = await chatService.findAllMessage();

            if (messagesRes?.success) {
                setListMessage([...messagesRes?.messages]);
            }
        } catch (error) {}
    };

    useEffect(() => {
        handleGetListMessage();
    }, []);

    // Use clickoutside
    useOnClickOutside(formMessageRef, () => {
        setIsShowChatBox(false);
    });

    // Event Onchange Value Send Message
    const eventOnchangeValueSendMessage = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.value.length > 200) {
            alert("Nội dung không quá 200 kí tự");
            return;
        }
        setSendMessage({
            ...sendMessage,
            content: e.target.value,
        });
    };

    // Handle Send Message
    const handleSendMessage = async () => {
        if (sendMessage?.content.trim().length <= 0) {
            return;
        }

        const { socketId, content } = sendMessage;
        if (!socketId) {
            return;
        }

        if (isDisabledChat) {
            alert("Bạn hành động quá nhanh.");
            return;
        }
        // setIsDisabledChat(true);
        // setTimeout(() => {
        //     setIsDisabledChat(false);
        // }, 5000);

        try {
            const dataUser =
                status === "authenticated"
                    ? {
                          userId: session?.user.userId,
                          name: session?.user.name,
                          username: session?.user.username,
                          role: session?.user.role.roleName,
                      }
                    : null;

            setSendMessage({
                ...sendMessage,
                content: "",
            });

            /// Send Message Socket
            socket.emit("message", {
                messageId: String(new Date()),
                socketId: socketId,
                user: dataUser,
                content: sendMessage?.content,
            });
            inputRef?.current?.focus();
        } catch (error) {}
    };

    useEffect(() => {
        if (messagesEndRef?.current && isShowChatBox) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [listMessage, isShowChatBox]);

    {
        /* <span className="absolute -top-1 -right-1 text-white bg-red-600 rounded-md px-1">
        8
    </span> */
    }

    return (
        <>
            <div
                ref={formMessageRef}
                className="relative w-11 h-11 rounded-full bg-indigo-600"
            >
                <button
                    className={`w-11 h-11 select-none cursor-pointer relative button-chatbox ${isShowChatBox ? "active" : ""}`}
                    onClick={() => setIsShowChatBox(state => !state)}
                >
                    <IconClose className="button-hidden-chatbox absolute top-0 fill-white w-11 h-11 p-2" />
                    <IconComment className="button-show-chatbox absolute top-0 fill-white w-11 h-11 p-2" />
                </button>

                <Transition
                    show={isShowChatBox}
                    enter="transition-all duration-75"
                    enterFrom="opacity-0 scale-90"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-90"
                    className={"chatbox"}
                >
                    <div className="chatbox-form border shadow-md flex flex-col bg-white dark:bg-slate-700">
                        <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-2 shadow">
                            <Image
                                unoptimized
                                priority={true}
                                width={100}
                                height={100}
                                alt="Logo TRUYENKK"
                                src={`/static/images/logo.png`}
                                className="w-8 h-8 object-cover"
                            />
                            <p className="ml-1 text-xl text-red-600 dark:text-white font-bold uppercase">
                                TRUYENKK
                            </p>
                        </div>
                        <div className="h-screen overflow-x-hidden overflow-y-auto custom-scroll px-2 py-2">
                            {isConnected ? (
                                listMessage?.map((message, index) => {
                                    const isSender =
                                        message?.socketId ===
                                        sendMessage?.socketId;
                                    const isContinual =
                                        index >= 1
                                            ? listMessage[index].socketId ===
                                            listMessage[index - 1].socketId
                                            : false;
                                    const isLastContinual =
                                        listMessage.length - 2 >= index
                                            ? listMessage[index].socketId !==
                                            listMessage[index + 1].socketId
                                            : listMessage.length - 1 === index;
                                    return (
                                        <div
                                            ref={messagesEndRef}
                                            key={`${message?.messageId}-${index}`}
                                            className={`flex flex-shrink-0 items-end ${
                                                isSender && "flex-row-reverse"
                                            } ${
                                                isContinual
                                                    ? "mt-[2px]"
                                                    : "mt-3"
                                            }
                                                `}
                                        >
                                            {!isSender &&
                                                (isLastContinual ? (
                                                    <Image
                                                        unoptimized
                                                        priority={true}
                                                        width={100}
                                                        height={100}
                                                        alt="Logo TRUYENKK"
                                                        src={`/static/images/avatar_default.png`}
                                                        className="w-10 h-10 mr-2 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 mr-2 rounded-full flex-shrink-0"></div>
                                                ))}
                                            <div>
                                                <div className="">
                                                    <h4
                                                        className={clsx(
                                                            "text-[12px] mx-3",
                                                            {
                                                                "text-right":
                                                                    isSender,
                                                                hidden: isContinual,
                                                            }
                                                        )}
                                                    >
                                                        {message?.user
                                                            ? message?.user.name
                                                            : "Thành viên ẩn danh"}
                                                    </h4>
                                                    <div
                                                        className={clsx(
                                                            "flex",
                                                            {
                                                                "justify-end":
                                                                    isSender,
                                                            }
                                                        )}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                "bg-blue-500 rounded-3xl py-2 px-3",
                                                                {
                                                                    "": isSender,
                                                                }
                                                            )}
                                                        >
                                                            <div className="text-white break-all whitespace-pre-wrap">
                                                                {
                                                                    message?.content
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center flex-shrink-0">
                                                <div className="w-[84px]"></div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                        <div className="flex py-2 px-2">
                            <input
                                ref={inputRef}
                                value={sendMessage?.content}
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
                                className="ml-1 w-10 h-10 hover:bg-gray-100 hover:dark:bg-gray-600 rounded-full"
                            >
                                <IconSend className="w-10 h-10 p-2 fill-indigo-600"/>
                            </button>
                        </div>
                    </div>
                </Transition>


            </div>
        </>
    );
};

export default ChatBox;
