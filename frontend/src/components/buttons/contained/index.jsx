const ButtonContained = (props) => {
  return (
    <input
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      value={props.value ?? "Resgatar"}
      className="bg-white hover:bg-slate-300 transition-all ease-in-out delay-100 
    hover:scale-95 border-none text-black font-bold 
    min-w-36 p-2 cursor-pointer mt-4"
    />
  );
};

export default ButtonContained;
