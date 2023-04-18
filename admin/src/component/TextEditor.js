import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ setValue }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      buttons: [
        "italic",
        "bold",
        "underline",
        "link",
        "unlink",
        "hr",
        "font",
        "fontsize",
        "symbol",
        "brush",
      ],
      removeButtons: ["image"],
    }),
    []
  );

  return (
    <>
      <div className="w-[75%]">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={(newContent) => {
            setValue(newContent);
          }}
        />
      </div>
    </>
  );
};

export default TextEditor;
