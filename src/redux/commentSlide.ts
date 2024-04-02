import { GetCommentsProps } from "@/services/comment.services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RootStateCommentSlide {
    commentSlide: CommentSlideProps
}

interface CommentsProps extends GetCommentsProps {
    replyComments?: GetCommentsProps[];
}
export interface CommentSlideProps {
    comments: CommentsProps[],
    isLoading: boolean
}
const initialState: CommentSlideProps = {
    comments: [],
    isLoading: true,
};
export const commentSlide = createSlice({
    name: "commentSlide",
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<CommentsProps[]>) => {
            state.comments = action.payload;
            state.isLoading = false;
        },
        addComments: (state, action: PayloadAction<CommentsProps>) => {
            state.comments.unshift(action.payload)
        },
        addReplyComments: (state, action) => {
            const foundIndex = state.comments.findIndex(
                (comment: any) => comment.commentId === action.payload.commentId
            );
            if (foundIndex !== -1) {
                const foundComment = state.comments[foundIndex];

                if (foundComment) {
                    foundComment.replyComments =
                        foundComment?.replyComments || [];

                    // Add Comment
                    foundComment.replyComments.push(
                        ...action.payload.replyComments
                    );

                    // Increase Count Reply Comment
                    if(action.payload.replyComments[0].commentId === -1) {
                        foundComment._count.replyComments++;
                    }
                }
            }
        },
        setCommentId: (
            state,
            action: {
                payload: {
                    type: "comment" | "replycomment";
                    commentId: number;
                    parentId?: number;
                };
            }
        ) => {
            if (action.payload.type === "comment") {
                state.comments[0].commentId =
                    action.payload.commentId;
            } else {
                const foundIndex = state.comments.findIndex(
                    (comment: any) => comment.commentId === action.payload.parentId
                );
                if (foundIndex !== -1) {
                    const foundComment = state.comments[foundIndex];

                    if (foundComment) {
                        foundComment.replyComments =
                            foundComment?.replyComments || [];
                        foundComment.replyComments[foundComment.replyComments.length - 1].commentId =
                            action.payload.commentId;
                    }
                }
            }
        },
        deleteComment: (
            state,
            action: {
                payload: {
                    commentId: number;
                    parentId: number | null;
                };
            }
        ) => {
            const { commentId, parentId } = action.payload;
            if (!parentId) {
                const indexToRemove = state.comments.findIndex(
                    (comment) => comment.commentId === commentId
                );
                if (indexToRemove !== -1) {
                    state.comments.splice(indexToRemove, 1);
                }
            } else {
                const indexToParentRemove = state.comments.findIndex(
                    (comment) => comment.commentId === action.payload.parentId
                );
                if (indexToParentRemove !== -1) {
                    const foundComment = state.comments[indexToParentRemove];

                    if (foundComment && foundComment?.replyComments) {
                        const indexToReplyCommentRemove = foundComment?.replyComments.findIndex(
                            (comment) => comment.commentId === action.payload.commentId
                        );
                        if(indexToReplyCommentRemove !== -1) {
                            foundComment._count.replyComments--;
                            state.comments[indexToParentRemove]?.replyComments?.splice(indexToReplyCommentRemove, 1);
                        }
                    }
                }
            }
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    setComments,
    setCommentId,
    setIsLoading,
    addComments,
    deleteComment,
    addReplyComments,
} = commentSlide.actions;

export default commentSlide.reducer;