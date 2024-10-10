import React from "react";
import mobCashBackground from "../../assets/mobcash_background.png";
import { IoGlobeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <img className="h-screen" src={mobCashBackground} alt="" />
      <h1
        onClick={() => navigate("/resgatar")}
        className="absolute top-[30%] left-[28%] text-[141px] font-serif 
        font-light text-lime-300 hover:text-green-800 hover:scale-105 
        delay-100 transition-all ease-in-out drop-shadow-xl cursor-pointer"
        style={{ fontFamily: "Playfair Display" }}
      >
        MOBCASH
      </h1>
      <p
        className="absolute right-[28%] mt-24 font-light text-white"
        style={{ fontFamily: "Playfair Display" }}
      >
        Seguro e rápido.
      </p>
      <div className="absolute bottom-14 right-56 flex flex-row items-center gap-2">
        <IoGlobeSharp size={48} />
        <p className="text-white text-xs max-w-48 capitalize">
          CONECTE-SE, PARTICIPE. NO FINAL, TEM UM AGRADECIMENTO ESPECIAL, FEITO
          COM CARINHO, PARA VOCÊ APROVEITAR DO SEU JEITO.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
