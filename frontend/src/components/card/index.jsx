import React from "react";

const Card = ({ children, ...props }) => {
  return (
    <div
      className="absolute bg-transparent backdrop-blur-sm backdrop-brightness-50 flex flex-col 
      gap-4 p-5 w-96"
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
