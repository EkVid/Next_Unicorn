import { useState } from "react";
import { FaList } from "react-icons/fa";

const ListDropdown = ({
  onSelectListStyle,
}: {
  onSelectListStyle: (style: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const listStyles = [
    { label: "• Bullet", value: "bullet" },
    { label: "1. Numbered", value: "number" },
    { label: "a. Lowercase", value: "lower-alpha" },
  ];

  return (
    <div className="relative">
      <div
        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaList />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          {listStyles.map((style, index) => (
            <div
              key={index}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onSelectListStyle(style.value);
                setIsOpen(false);
              }}
            >
              {style.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListDropdown;
