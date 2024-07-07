import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import { useOnClickOutside } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormChat from "./FormChat";
import IconClose from "@/components/Modules/Icons/IconClose";
import IconComment from "@/components/Modules/Icons/IconComment";
import chatService, { GetChatMessageProps } from "@/services/chat.services";
import {
    RootStateChatSlide,
    addChats,
    setChats,
    setCountMember,
    setIsShowChatbox,
    setSuccessChat,
    setUnreadCount,
} from "@/redux/chatSlide";

const ChatBox = () => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const formMessageRef = useRef<HTMLDivElement>(null);

    const chatSlide = useSelector(
        (state: RootStateChatSlide) => state.chatSlide
    );

    // Handle Get List Message
    const handleGetListMessage = async () => {
        try {
            const messagesRes = await chatService.findAllMessage();

            if (messagesRes?.success) {
                dispatch(setChats([...JSON.parse(messagesRes?.messages)]));
            }
        } catch (error) {}
    };

    useEffect(() => {
        handleGetListMessage();
    }, []);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            socket.emit("count-member");
        }

        function onDisconnect() {
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    // Use clickoutside
    useOnClickOutside(formMessageRef, () => {
        dispatch(setIsShowChatbox(false));
    });

    // Handle Toggle Message Form
    const handleToggleMessageForm = () => {
        dispatch(setIsShowChatbox(!chatSlide?.isShowChatbox));
    };

    useEffect(() => {
        const handleReciveMessage = (message: any) => {
            if (message?.success) {
                const dataMessage: GetChatMessageProps = message?.message;
                const { chatId, sender, socketId, chatText, image, createdAt } = dataMessage;

                if(socket.id !== socketId) {
                    dispatch(
                        addChats({
                            sender: sender,
                            chatId: chatId,
                            image: image,
                            chatText: chatText,
                            socketId: socketId,
                            createdAt: createdAt,
                        })
                    );
                }
                else {
                    dispatch(
                        setSuccessChat({
                            chatId: chatId,
                            socketId: socketId,
                            createdAt: createdAt,
                        })
                    );
                }
            } else {
                alert(message?.error);
            }
        };
        const handleSetCountMember = (data: any) => {
            if(data?.success) {
                dispatch(setCountMember(data?.countMember));
            }
        }

        socket.on("message", handleReciveMessage);
        socket.on("countMember", handleSetCountMember);
        
        return () => {
            socket.off("message", handleReciveMessage);
            socket.off("countMember", handleSetCountMember);
        };
    }, [socket]);

    useEffect(() => {
        if (chatSlide?.isShowChatbox) {
            dispatch(setUnreadCount(0));
        }
    }, [chatSlide?.isShowChatbox]);

    return (
        <>
            <div
                ref={formMessageRef}
                className="relative w-11 h-11 rounded-full bg-indigo-600"
            >
                <button
                    title="Chat box"
                    className={`w-11 h-11 select-none cursor-pointer relative button-chatbox ${
                        chatSlide?.isShowChatbox ? "active" : ""
                    }`}
                    onClick={handleToggleMessageForm}
                >
                    <IconClose className="button-hidden-chatbox absolute top-0 fill-white w-11 h-11 p-2" />
                    <IconComment className="button-show-chatbox absolute top-0 fill-white w-11 h-11 p-2" />
                    {chatSlide?.unreadCount !== 0 && (
                        <span className="absolute -top-1 -right-1 text-white bg-red-600 rounded-md px-1">
                            {chatSlide.unreadCount > 9
                                ? "+9"
                                : chatSlide.unreadCount}
                        </span>
                    )}
                </button>

                {/* <div className="fixed top-5 bottom-5 right-auto left-auto w-11 bg-red-600 z-[100]"></div> */}

                <Transition
                    show={chatSlide?.isShowChatbox}
                    enter="transition-all duration-75"
                    enterFrom="opacity-0 scale-90"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-90"
                    className={
                        "chatbox animation-bottom-right fixed top-16 bottom-[85px] right-[15px] left-[15px] md:left-auto md:w-[400px] overflow-hidden shadow-lg flex flex-col bg-white dark:bg-gray-700"
                    }
                >
                    <FormChat />
                </Transition>
            </div>
        </>
    );
};

export default ChatBox;
