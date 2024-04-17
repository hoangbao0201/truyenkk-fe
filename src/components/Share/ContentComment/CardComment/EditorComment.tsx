// "use client";

// import { Dispatch, RefObject, useEffect, useState } from "react";

// import { EditorState, AtomicBlockUtils } from "draft-js";
// import Editor from "@draft-js-plugins/editor";

// interface EditorCommentProps {
//     editor: RefObject<Editor> | null;
//     placeholder?: string;
//     editorState: EditorState;
//     setEditorState: Dispatch<React.SetStateAction<EditorState>>;
// }
// const EditorComment = ({
//     editor,
//     placeholder,
//     editorState,
//     setEditorState,
// }: EditorCommentProps) => {
//     const [open, setOpen] = useState(false);

//     const focusEditor = () => {
//         if (editor?.current) {
//             editor.current.focus();
//         }
//     };
//     useEffect(() => {
//         focusEditor();
//     }, []);

//     return (
//         <>
//             <Editor
//                 ref={editor}
//                 editorKey={"editor"}
//                 editorState={editorState}
//                 placeholder={placeholder || ""}
//                 onChange={(editorState) => setEditorState(editorState)}
//             />
//         </>
//     );
// };

// export default EditorComment;

"use client";

import {
    Dispatch,
    RefObject,
    useEffect,
} from "react";

import FormIcon from "../FormIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorCommentProps {
    editorRef: RefObject<ReactQuill>;
    placeholder?: string;
    editorState: string;
    setEditorState: Dispatch<React.SetStateAction<string>>;
}
const EditorComment = ({
    editorRef,
    placeholder,
    editorState,
    setEditorState,
}: EditorCommentProps) => {
    const handleInsertIcon = (icon: string) => {
        const content = editorState + "<p>" + icon + "</p>"; 
        setEditorState(content);
    }
    const eventOnchangeValue = (value: string) => {
        setEditorState(value)
    }

    useEffect(() => {
        editorRef?.current?.focus();
    }, []);

    return (
        <>
            <div className="pt-1 pb-1 px-1 border-b">
                <FormIcon handleInsertIcon={handleInsertIcon}/>
            </div>
            <div className="px-3 py-3" onDrop={(e) => e.preventDefault()}>
                <ReactQuill
                    ref={editorRef}
                    theme="bubble"
                    value={editorState}
                    onChange={eventOnchangeValue}
                    modules={{
                        toolbar: false,
                        clipboard: {
                            matchVisual: false,
                        }
                    }}
                    className="text-[17px] break-all"
                />
            </div>
        </>
    );
};

export default EditorComment;
