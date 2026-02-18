import { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function Editor() {
  const [text, setText] = useState("# Hello Markdown");

  // `as string` tells TypeScript the value is definitely a string
  const html = useMemo(() => {
    const rendered = marked.parse(text) as string;
    return DOMPurify.sanitize(rendered);
  }, [text]);

  return (
    <div className="flex h-full w-full">
      {/* Editor pane */}
      <div className="w-1/2 p-4">
        <CodeMirror
          value={text}
          height="100%"
          extensions={[markdown()]}
          onChange={(value: string) => setText(value)}
        />
      </div>

      {/* Preview pane */}
      <div
        className="w-1/2 p-4 overflow-auto prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
