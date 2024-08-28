import React from "react";

const Card = ({ children, ...props }) => {
  return (
    <div
      className="flex flex-col gap-4 p-5 border border-[#222222] w-80"
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
