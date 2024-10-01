import { useEffect, useRef } from "react";
import "./TextEditor.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor({ ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const quill = new Quill(ref.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    });

    return () => {
      ref.current = null;
    };
  }, []);

  return (
    <div className="common-text-editor" ref={ref}>
      {props.children}
    </div>
  );
}
