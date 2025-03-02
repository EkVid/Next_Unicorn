import React from "react";
import { FaLink } from "react-icons/fa";

const FileInsert = ({ onInsertFile }: { onInsertFile: () => void }) => {
  return (
    <div
      className="bg-gray-600 text-white p-2 rounded-md"
      onClick={onInsertFile}
    >
      <FaLink />
    </div>
  );
}

export default FileInsert;