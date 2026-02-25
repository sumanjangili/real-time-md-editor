// src/components/Editor.tsx
import { useState, useMemo, ChangeEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import DOMPurify from "dompurify";
import { marked } from "marked";

/**
 * Props expected from the parent (App.tsx)
 */
type EditorProps = {
  /** Called with the current markdown text whenever it changes */
  sendMessage: (payload: string) => void;
};

export default function Editor({ sendMessage }: EditorProps) {
  // -------------------------------------------------------------------------
  //  Local markdown state
  // -------------------------------------------------------------------------
  const [text, setText] = useState("# Hello Markdown");

  // -------------------------------------------------------------------------
  //  Convert markdown → HTML (sanitized) – memoised for performance
  // -------------------------------------------------------------------------
  const html = useMemo(() => {
    const rendered = marked.parse(text) as string;
    return DOMPurify.sanitize(rendered);
  }, [text]);

  // -------------------------------------------------------------------------
  //  Handler that updates local state **and** pushes the new text to the WS
  // -------------------------------------------------------------------------
  const handleChange = (value: string) => {
    setText(value);          // update the editor UI
    sendMessage(value);      // broadcast the new markdown to peers
  };

  // -------------------------------------------------------------------------
  //  Render the two‑pane editor + preview
  // -------------------------------------------------------------------------
  return (
    <div className="flex h-[80vh] gap-4">
      {/* ------------------- Editor pane ------------------- */}
      <CodeMirror
        value={text}
        height="100%"
        extensions={[markdown()]}
        onChange={handleChange}
      />

      {/* ------------------- Preview pane ------------------- */}
      <div
        className="w-1/2 p-4 overflow-auto prose max-w-none"
        // SAFETY: `html` is already sanitized by DOMPurify
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
