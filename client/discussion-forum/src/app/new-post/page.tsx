"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  FaUndo,
  FaRedo,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaRemoveFormat,
} from "react-icons/fa";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdOutlineFormatIndentDecrease,
  MdOutlineFormatIndentIncrease,
} from "react-icons/md";
import ColorDropdown from "./ColorDropdown";
import LineSpacingDropdown from "./LineSpacingDropdown";
import ListDropdown from "./ListDropdown";
import ImageUpload from "./ImageUpload";
import FileInsert from "./FileInsert";

const NewPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    // TODO: Add API call to submit the post
    console.log("Post submitted:", { title, content });
    router.push("/"); // Redirect to home or post feed
  };

  const formatOptions = [
    { icon: <FaUndo />, action: "undo", tooltip: "Undo" },
    { icon: <FaRedo />, action: "redo", tooltip: "Redo" },
    { icon: <FaBold />, action: "bold", tooltip: "Bold" },
    { icon: <FaItalic />, action: "italic", tooltip: "Italic" },
    { icon: <FaUnderline />, action: "underline", tooltip: "Underline" },
    {
      icon: <FaStrikethrough />,
      action: "strikethrough",
      tooltip: "Strikethrough",
    },
    {
      icon: (
        <ColorDropdown
          onSelectColor={(color) =>
            handleFormat("color", color, null, null, null)
          }
        />
      ),
      action: "color",
      tooltip: "Text Color",
    },
    {
      icon: (
        <FileInsert
          onInsertFile={() =>
            handleFormat(
              "link",
              null,
              null,
              document.getElementById("thoughts-editor"),
              null
            )
          }
        />
      ),
      action: "link",
      tooltip: "Insert Link",
    },
    {
      icon: (
        <ImageUpload
          onInsertImage={() =>
            handleFormat(
              "image",
              null,
              null,
              document.getElementById("thoughts-editor"),
              null
            )
          }
        />
      ),
      action: "image",
      tooltip: "Insert Image",
    },
    {
      icon: (
        <ListDropdown
          onSelectListStyle={(style) =>
            handleFormat(
              "list",
              null,
              null,
              document.getElementById("thoughts-editor"),
              style
            )
          }
        />
      ),
      action: "list",
      tooltip: "List Styles",
    },
    { icon: <MdFormatAlignLeft />, action: "alignLeft", tooltip: "Left Align" },
    {
      icon: <MdFormatAlignCenter />,
      action: "alignCenter",
      tooltip: "Center Align",
    },
    {
      icon: <MdFormatAlignRight />,
      action: "alignRight",
      tooltip: "Right Align",
    },
    {
      icon: <MdFormatAlignJustify />,
      action: "alignJustify",
      tooltip: "Justify Align",
    },
    {
      icon: (
        <LineSpacingDropdown
          onSelectSpacing={(value) =>
            handleFormat(
              "lineSpacing",
              null,
              value,
              document.getElementById("thoughts-editor"),
              null
            )
          }
        />
      ),
      action: "lineSpacing",
      tooltip: "Line Spacing",
    },
    {
      icon: <MdOutlineFormatIndentIncrease />,
      action: "indentRight",
      tooltip: "Indent Right",
    },
    {
      icon: <MdOutlineFormatIndentDecrease />,
      action: "indentLeft",
      tooltip: "Indent Left",
    },
    {
      icon: <FaRemoveFormat />,
      action: "removeFormat",
      tooltip: "Remove Formatting",
    },
  ];

  const handleInsertImage = (e: Event, editor: HTMLElement) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (editor) {
          const img = document.createElement("img");
          img.src = imageUrl;
          img.alt = "Uploaded Image";
          img.style.maxWidth = "100px"; // TODO: To be resized
          img.style.maxHeight = "100px"; // TODO: To be resized
          editor.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormat = (
    action: string,
    color: string,
    spacing: string,
    editor: HTMLElement,
    value: string
  ) => {
    switch (action) {
      case "undo":
        document.execCommand("undo", false, null);
        break;
      case "redo":
        document.execCommand("redo", false, null);
        break;
      case "bold":
        document.execCommand("bold", true, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underline":
        document.execCommand("underline", false, null);
        break;
      case "strikethrough":
        document.execCommand("strikethrough", false, null);
        break;
      case "color":
        document.execCommand("foreColor", false, color);
        break;
      case "link":
        // TODO: Allow user to attach files
        if (!editor) return;
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.addEventListener("change", (e) => {
          const input = e.target as HTMLInputElement;
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const fileUrl = event.target?.result as string;
              const link = document.createElement("a");
              link.href = fileUrl;
              link.textContent = file.name;
              link.target = "_blank";
              editor.appendChild(link);
            };
            reader.readAsDataURL(file);
          }
        });
        fileInput.click();
        break;
      case "image":
        if (!editor) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", (e) => handleInsertImage(e, editor));
        input.click();
        break;
      case "list":
        // if (!editor) return;

        // // Check list type and apply accordingly
        // if (value === "bullet") {
        //   //   document.execCommand("insertUnorderedList", false, null);
        //   // Insert unordered list first
        //   document.execCommand("insertUnorderedList", false, null);

        //   // Use MutationObserver to dynamically apply styles
        //   const observer = new MutationObserver(() => {
        //     const lists = editor.querySelectorAll("ol");
        //     lists.forEach((ul) => {
        //       if (!ul.getAttribute("data-custom-style")) {
        //         ul.style.listStyleType = value; // "circle", "square", etc.
        //         ul.style.paddingLeft = "1.5em"; // Indentation
        //         // ul.style.marginLeft = "0"; // Remove default margin
        //         ul.setAttribute("data-custom-style", "true");
        //       }
        //     });
        //     observer.disconnect(); // Stop observing after applying styles
        //   });

        //   observer.observe(editor, { childList: true, subtree: true });
        // } else if (value === "number") {
        //   //   document.execCommand("insertOrderedList", false, null);
        //   // Insert unordered list first
        //   document.execCommand("insertUnorderedList", false, null);

        //   // Use MutationObserver to dynamically apply styles
        //   const observer = new MutationObserver(() => {
        //     const lists = editor.querySelectorAll("ul");
        //     lists.forEach((ul) => {
        //       if (!ul.getAttribute("data-custom-style")) {
        //         ul.style.listStyleType = value; // "circle", "square", etc.
        //         ul.style.paddingLeft = "1.5em"; // Indentation
        //         // ul.style.marginLeft = "0"; // Remove default margin
        //         ul.setAttribute("data-custom-style", "true");
        //       }
        //     });
        //     observer.disconnect(); // Stop observing after applying styles
        //   });

        //   observer.observe(editor, { childList: true, subtree: true });
        // } else {
        //   const selection = window.getSelection();
        //   if (!selection || selection.rangeCount === 0) return;

        //   const range = selection.getRangeAt(0);
        //   const selectedText = range.toString();
        //   // Create a list with lowercase letters
        //   const ol = document.createElement("ol");
        //   ol.style.listStyleType = "lower-alpha"; // Lowercase letters

        //   if (selectedText) {
        //     // If text is selected, split the selected text into lines and wrap each line in <li>
        //     const lines = selectedText.split("\n");
        //     lines.forEach((line) => {
        //       if (line.trim() !== "") {
        //         const li = document.createElement("li");
        //         li.textContent = line;
        //         ol.appendChild(li);
        //       }
        //     });
        //   } else {
        //     // If no text is selected, insert a new item with lowercase letters
        //     const li = document.createElement("li");
        //     li.textContent = ""; // Empty item
        //     ol.appendChild(li);
        //   }

        //   // Replace the selected text with the list
        //   range.deleteContents();
        //   range.insertNode(ol);
        // }

        // if (!editor) return;

        // let listType = "disc"; // Default to bullet points

        // if (value === "number") {
        //   document.execCommand("insertOrderedList", false, null);
        //   listType = "decimal";
        // } else if (value === "lower-alpha") {
        //   document.execCommand("insertOrderedList", false, null);
        //   listType = "lower-alpha";
        // } else {
        //   document.execCommand("insertUnorderedList", false, null);
        //   listType = value === "bullet" ? "disc" : value; // Default "disc" for bullet points
        // }

        // // Apply styles dynamically
        // const observer = new MutationObserver(() => {
        //   const lists = editor.querySelectorAll("ul, ol");
        //   lists.forEach((list) => {
        //     if (!list.getAttribute("data-custom-style")) {
        //       list.style.listStyleType = listType; // Apply bullet, number, or lower-alpha
        //       list.style.paddingLeft = "20px"; // Indentation for spacing
        //       list.style.marginLeft = "20px"; // Moves the list to the right
        //       list.setAttribute("data-custom-style", "true"); // Prevent reapplying styles
        //     }
        //   });
        //   observer.disconnect();
        // });

        // observer.observe(editor, { childList: true, subtree: true });

        if (!editor) return;

        // Get the selected text range
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

        // Determine the list type
        let listType = "disc"; // Default to bullet points
        let command = "insertUnorderedList"; // Default command

        if (value === "number") {
          command = "insertOrderedList";
          listType = "decimal";
        } else if (value === "lower-alpha") {
          command = "insertOrderedList";
          listType = "lower-alpha";
        } else {
          command = "insertUnorderedList";
          listType = value === "bullet" ? "disc" : value;
        }

        // Apply list formatting to selected text
        document.execCommand(command, false, null);

        // Ensure styling is applied dynamically
        const observer = new MutationObserver(() => {
          const lists = editor.querySelectorAll("ul, ol");
          lists.forEach((list) => {
            if (!list.getAttribute("data-custom-style")) {
              (list as HTMLElement).style.listStyleType = listType; // Apply bullet, number, or lower-alpha
              (list as HTMLElement).style.paddingLeft = "20px"; // Indentation for spacing
              (list as HTMLElement).style.marginLeft = "20px"; // Moves the list to the right
              list.setAttribute("data-custom-style", "true"); // Prevent reapplying styles
            }
          });
          observer.disconnect();
        });

        // Observe the editor for new lists
        observer.observe(editor, { childList: true, subtree: true });

        // Restore selection after applying formatting (optional)
        if (range) {
          selection?.removeAllRanges();
          selection?.addRange(range);
        }

        break;

      case "alignLeft":
        document.execCommand("justifyLeft", false, null);
        break;
      case "alignCenter":
        document.execCommand("justifyCenter", false, null);
        break;
      case "alignRight":
        document.execCommand("justifyRight", false, null);
        break;
      case "alignJustify":
        document.execCommand("justifyFull", false, null);
        break;
      case "lineSpacing":
        if (!editor) return;
        editor.style.lineHeight = spacing;
        break;
      case "indentLeft":
        document.execCommand("outdent", false, null);
        break;
      case "indentRight":
        document.execCommand("indent", false, null);
        break;
      case "removeFormat":
        document.execCommand("removeFormat", false, null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const title_editor = document.getElementById("title-editor");
    const thoughts_editor = document.getElementById("thoughts-editor");
    const category_editor = document.getElementById("category-editor");

    if (!thoughts_editor || !title_editor || !category_editor) return;

    // Ensure placeholder appears when content is empty
    const handleTitleInput = () => {
      if (title_editor.innerText.trim() === "") {
        setTitle("");
      } else {
        setTitle(title_editor.innerHTML);
      }
    };

    const handleThoughtsInput = () => {
      if (thoughts_editor.innerText.trim() === "") {
        setContent("");
      } else {
        setContent(thoughts_editor.innerHTML);
      }
    };

    const handleCategoryInput = () => {
      if (category_editor.innerText.trim() === "") {
        setCategory("");
      } else {
        setCategory(category_editor.innerHTML);
      }
    };

    title_editor.addEventListener("input", handleTitleInput);
    thoughts_editor.addEventListener("input", handleThoughtsInput);
    category_editor.addEventListener("input", handleCategoryInput);

    return () => {
      title_editor.removeEventListener("input", handleTitleInput);
      thoughts_editor.removeEventListener("input", handleThoughtsInput);
      category_editor.removeEventListener("input", handleCategoryInput);
    };
  }, []);

  //   useEffect(() => {
  //     const title_editor = document.getElementById("title-editor");
  //     const thoughts_editor = document.getElementById("thoughts-editor");
  //     const category_editor = document.getElementById("category-editor");

  //     if (!thoughts_editor || !title_editor || !category_editor) return;

  //     // Ensure placeholder appears when content is empty
  //     const handleTitleInput = () => {
  //       if (title_editor.innerText.trim() === "") {
  //         setTitle("");
  //       } else {
  //         setTitle(title_editor.innerHTML);
  //       }
  //     };

  //     const handleThoughtsInput = () => {
  //       if (thoughts_editor.innerText.trim() === "") {
  //         setContent("");
  //       } else {
  //         setContent(thoughts_editor.innerHTML);
  //       }
  //     };

  //     const handleCategoryInput = () => {
  //       if (category_editor.innerText.trim() === "") {
  //         setCategory("");
  //       } else {
  //         setCategory(category_editor.innerHTML);
  //       }
  //     };

  //     // Handle list formatting when the user presses Enter
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       if (e.key === "Enter") {
  //         const selection = window.getSelection();
  //         if (!selection || selection.rangeCount === 0) return;

  //         const range = selection.getRangeAt(0);
  //         const parentElement = range.startContainer.parentElement;

  //         if (parentElement?.tagName === "LI") {
  //           e.preventDefault(); // Prevent default Enter behavior

  //           const newLi = document.createElement("li");
  //           newLi.innerHTML = "<br>"; // Add a line break to the new list item

  //           if (parentElement.parentElement?.tagName === "UL") {
  //             // If inside a bullet list, continue with bullet points
  //             parentElement.parentElement.appendChild(newLi);
  //           } else if (parentElement.parentElement?.tagName === "OL") {
  //             // If inside a numbered list, continue with numbers or lowercase letters
  //             const listStyle = parentElement.parentElement.style.listStyleType;
  //             parentElement.parentElement.appendChild(newLi);
  //           }

  //           // Move the cursor to the new list item
  //           const newRange = document.createRange();
  //           newRange.setStart(newLi, 0);
  //           newRange.setEnd(newLi, 0);
  //           selection.removeAllRanges();
  //           selection.addRange(newRange);
  //         }
  //       }
  //     };

  //     title_editor.addEventListener("input", handleTitleInput);
  //     thoughts_editor.addEventListener("input", handleThoughtsInput);
  //     category_editor.addEventListener("input", handleCategoryInput);
  //     thoughts_editor.addEventListener("keydown", handleKeyDown);

  //     return () => {
  //       title_editor.removeEventListener("input", handleTitleInput);
  //       thoughts_editor.removeEventListener("input", handleThoughtsInput);
  //       category_editor.removeEventListener("input", handleCategoryInput);
  //       thoughts_editor.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <Header />
      <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-left">Create Post</h2>
        <div className="relative">
          <div
            contentEditable="true"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none overflow-x-auto whitespace-nowrap"
            id="title-editor"
            style={{ display: "inline-block" }}
          ></div>
          {!title && (
            <div
              className="absolute inset-0 pointer-events-none px-3 flex overflow-x-auto"
              style={{ top: "calc(20%)" }}
            >
              <span className="text-gray-400">
                Add a title here...<span className="text-red-500">*</span>
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            contentEditable="true"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none overflow-x-auto whitespace-nowrap"
            id="category-editor"
            style={{ display: "inline-block" }}
          ></div>
          {!category && (
            <div
              className="absolute inset-0 pointer-events-none px-3 flex overflow-x-auto"
              style={{ top: "calc(20%)" }}
            >
              <span className="text-gray-400">
                Add a category here...<span className="text-red-500">*</span>
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            contentEditable="true"
            className="w-full p-3 h-40 border border-gray-300 rounded-md outline-none overflow-y-auto"
            id="thoughts-editor"
            style={{ display: "inline-block" }}
          ></div>
          {!content && (
            <div
              className="absolute inset-0 pointer-events-none px-3 flex"
              style={{ top: "calc(8%)" }}
            >
              <span className="text-gray-400">
                Share your thoughts...<span className="text-red-500">*</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center border-t border-gray-300 p-2">
          {formatOptions.map((option, index) => (
            <button
              key={index}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded mr-1"
              title={option.tooltip}
              onClick={() =>
                handleFormat(option.action, null, null, null, null)
              }
            >
              {option.icon}
            </button>
          ))}

          <div className="ml-auto">
            <button
              className="bg-purple-600 text-white px-4 py-1 rounded"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
