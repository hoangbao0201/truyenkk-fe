import { configureStore } from "@reduxjs/toolkit";
import chatSlide from "./chatSlide";
import commentSlide from "./commentSlide";
import typeLoadingSlide from "./typeLoadingSlide";

const store = configureStore({
    reducer: {
        chatSlide: chatSlide,
        commentSlide: commentSlide,
        typeLoading: typeLoadingSlide
    },
});

export default store;
