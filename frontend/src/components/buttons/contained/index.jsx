const ButtonContained = (props) => {
  return (
    <input
      type={props.type}
      onClick={props.onClick}
      name="Resgatar"
      className="bg-white hover:bg-slate-300 transition-all ease-in-out delay-100 
    hover:scale-95 border-none text-black font-bold 
    min-w-36 p-2 cursor-pointer"
    />
  );
};

export default ButtonContained;
