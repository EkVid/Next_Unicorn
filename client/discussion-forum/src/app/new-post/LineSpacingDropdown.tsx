import React from "react";
import { MdFormatLineSpacing } from "react-icons/md";
import { useState } from "react";

const LineSpacingDropdown = ({
  onSelectSpacing,
}: {
  onSelectSpacing: (value: string) => void;
}) => {
  const spacings = [
    {
      value: "1.0",
      label: "Single",
    },
    {
      value: "1.15",
      label: "1.15",
    },
    {
      value: "1.5",
      label: "1.5",
    },
    {
      value: "2.0",
      label: "Double",
    },
  ];

  // State to track the selected spacing (default to 1.0)
  const [selectedSpacing, setSelectedSpacing] = useState<string>("1.0");

  // Handle spacing selection
  const handleSpacingSelect = (value: string) => {
    setSelectedSpacing(value); // Update the selected spacing
    onSelectSpacing(value); // Pass the selected spacing to the parent
  };

  return (
    <div className="relative group">
      <MdFormatLineSpacing />
      <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-300 rounded-md p-2 w-32">
        {spacings.map((spacing, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            className="w-full text-left cursor-pointer px-2 py-1 hover:bg-gray-200 rounded"
            onClick={() => handleSpacingSelect(spacing.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSpacingSelect(spacing.value)
            }
          >
            {spacing.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineSpacingDropdown;