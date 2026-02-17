import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export default function Editor() {
  const [text, setText] = useState("# Hello Markdown");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const rendered = marked.parse(text);
    setHtml(DOMPurify.sanitize(rendered));
  }, [text]);

  return (
    <div className="flex h-screen">
      {/* Editor pane */}
      <div className="w-1/2 p-4 overflow-auto border-r">
        <CodeMirror
          value={text}
          height="100%"
          extensions={[markdown()]}
          onChange={(value) => setText(value)}
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
