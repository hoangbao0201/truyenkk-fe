import { configureStore } from "@reduxjs/toolkit";
import commentSlide from "./commentSlide";
import typeLoadingSlide from "./typeLoadingSlide";

const store = configureStore({
    reducer: {
        commentSlide: commentSlide,
        typeLoading: typeLoadingSlide
    },
});

export default store;
