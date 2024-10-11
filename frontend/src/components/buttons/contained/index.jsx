const ButtonContained = (props) => {
  return (
    <input
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      value={props.value ?? "Resgatar"}
      className="bg-lime-500 hover:bg-lime-700 transition-all ease-in-out delay-100 
    hover:scale-95 border-none text-white font-bold 
    min-w-36 p-2 cursor-pointer mt-4"
    />
  );
};

export default ButtonContained;
