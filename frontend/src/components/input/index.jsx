import React from "react";

const Input = ( props ) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-thin text-xs" htmlFor="">
        {props.label}
      </label>
      <input
        className="p-2 border border-[#222222] hover:scale-95 delay-75 transition-all"
        {...props}
      />
    </div>
  );
};

export default Input;
