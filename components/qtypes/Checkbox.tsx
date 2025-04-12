"use client";

import React, { useState } from "react";

const Checkbox = () => {
  const [options, setOptions] = useState<string[]>([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  return (
    <div className="w-full space-y-2">
      {options.map((opt, index) => (
        <div key={index} className="flex items-center gap-2">
          <input type="checkbox" disabled />
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-[#29A0B1] px-2 py-1 w-full"
          />
          <button
            type="button"
            onClick={() => handleRemoveOption(index)}
            className="text-red-500 text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddOption}
        className="mt-2 text-[#29A0B1] font-medium hover:underline"
      >
        + Add Option
      </button>
    </div>
  );
};

export default Checkbox;
