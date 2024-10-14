import React from "react";
import Mobcash from "../../assets/mob_cash.png";
import "./loader.css";

const SplashPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
      <p
        className="text-black font-light text-4xl"
        style={{ fontFamily: "Playfair Display" }}
      >
        MOB
      </p>
      <p
        className="text-black font-light text-4xl -mt-3"
        style={{ fontFamily: "Playfair Display" }}
      >
        CASH
      </p>
      <small className="text-sm font-light text-[#666]">Seguro e rápido.</small>
      <div className="loader"></div>
    </div>
  );
};

export default SplashPage;
