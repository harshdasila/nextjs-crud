import React from "react";
import { ButtonProps } from "@/interfaces/frontend";


const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className="submit-button bg-black mt-4  text-white py-2 px-4 rounded w-full hover:bg-primary/90 text-sm font-medium font-sans"
      >
        {text || ""}
      </button>
    </div>
  );
};

export default Button;
