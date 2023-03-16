import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  // editor?.chain().focus().toggleBold().run();

  return (
    <>
      <button onClick={() => editor?.chain().focus().toggleBold().run()}>
        bold
      </button>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H1
      </button>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
