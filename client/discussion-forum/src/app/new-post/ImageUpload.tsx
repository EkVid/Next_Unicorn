import React from "react";
import { FaImage } from "react-icons/fa";

const ImageUpload = ({ onInsertImage }: { onInsertImage: () => void }) => {
  return (
    <div
      className="bg-gray-600 text-white p-2 rounded-md"
      onClick={onInsertImage}
    >
      <FaImage />
    </div>
  );
};

export default ImageUpload;