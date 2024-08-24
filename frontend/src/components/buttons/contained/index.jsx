const ButtonContained = ({ label }) => {
  return (
    <button className="bg-white hover:bg-slate-300 transition-all ease-in-out delay-100 hover:scale-95 border-none rounded-lg text-black font-semibold min-w-36 p-2">
      {label}
    </button>
  );
};

export default ButtonContained;
