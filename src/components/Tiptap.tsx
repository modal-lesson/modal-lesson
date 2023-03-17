import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none border rounded-lg border-red-500 h-[400px]",
      },
    },
  });

  // to get the contents of the editor
  // const html = editor?.getHTML();
  return (
    <>
      <div className="flex border rounded-lg border-red-500">
        <button
          className="btn"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className="btn"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          className="btn"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          className="btn"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </button>

        <button
          className="btn"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          bold
        </button>

        {/* Text Alignment */}
        <button
          className={` btn ${
            editor?.isActive({ textAlign: "left" }) ? "btn-accent" : ""
          }`}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          Left
        </button>
        <button
          className={` btn ${
            editor?.isActive({ textAlign: "right" }) ? "btn-accent" : ""
          }`}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          Right
        </button>
        <button
          className={` btn ${
            editor?.isActive({ textAlign: "center" }) ? "btn-accent" : ""
          }`}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          Center
        </button>
        <button
          className={` btn ${
            editor?.isActive({ textAlign: "justify" }) ? "btn-accent" : ""
          }`}
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
        >
          Justify
        </button>

        {/*
        A good resource: https://github.com/Aldhanekaa/TipTap-Example-React-Editor/blob/7cff6c89d555f3b6380bade20041b05825fb25dd/components/content/Toolbar.tsx#L159
          Bold, italic, Quote, Image, Video, Link, Bullet List, Ordered List, Undo, Redo
        */}
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
