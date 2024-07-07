import { GetChatMessageProps } from "@/services/chat.services";
import { createSlice } from "@reduxjs/toolkit";

export interface RootStateChatSlide {
    chatSlide: ChatSlideProps;
}

export interface ChatSlideProps {
    chats: GetChatMessageProps[];
    unreadCount: number;
    countMember: number;
    isLoading: boolean;
    isShowChatbox: boolean;
}
const initialState: ChatSlideProps = {
    chats: [],
    countMember: 0,
    unreadCount: 0,
    isShowChatbox: false,
    isLoading: true,
};
export const chatSlide = createSlice({
    name: "chatSlide",
    initialState,
    reducers: {
        setCountMember: (state, action) => {
            state.countMember = action.payload;
        },
        setChats: (state, action: { payload: GetChatMessageProps[] }) => {
            state.isLoading = false;
            state.chats = action.payload;
            state.unreadCount = action.payload.length;
        },
        addChats: (state, action: { payload: GetChatMessageProps }) => {
            if (state?.chats) {
                state.chats.push(action?.payload);
            }

            if (!state?.isShowChatbox) {
                state.unreadCount++;
            }
        },
        setSuccessChat: (
            state,
            action: {
                payload: {
                    chatId: number;
                    socketId: string;
                    createdAt: string;
                };
            }
        ) => {
            const findIndex = state.chats.findIndex(
                (state) =>
                    state.socketId === action.payload.socketId &&
                    state.createdAt === action.payload.createdAt
            );

            if (findIndex !== -1) {
                state.chats[findIndex].chatId = action.payload.chatId;
            }
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        setIsShowChatbox: (state, action) => {
            state.isShowChatbox = action.payload;
        },
    },
});

export const {
    setChats,
    addChats,
    setCountMember,
    setUnreadCount,
    setSuccessChat,
    setIsShowChatbox,
} = chatSlide.actions;

export default chatSlide.reducer;
