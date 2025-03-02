import React from "react";
import { useState } from "react";

const ColorDropdown = ({
  onSelectColor,
}: {
  onSelectColor: (color: string) => void;
}) => {
  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#FFA500", // Orange
    "#0000FF", // Blue
    "#006400", // Dark Green
    "#FF00FF", // Magenta
  ];

  // Track the selected color (default is black)
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className="relative group">
      <div
        className="w-4 h-4 rounded-full border border-gray-100"
        style={{ backgroundColor: selectedColor }}
      />
      <div className="absolute hidden group-hover:flex flex-wrap bg-white border border-gray-300 rounded-md p-2 w-32">
        {colors.map((color, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            className="w-6 h-6 m-1 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            onKeyDown={(e) => e.key === "Enter" && handleColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorDropdown;