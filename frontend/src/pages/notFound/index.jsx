import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonContained from "../../components/buttons/contained";
import { TbArrowBack } from "react-icons/tb";
import MobIncLogo from "../../assets/mob_inc_logo";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-full flex flex-col gap-6 justify-center items-center">
        <MobIncLogo/>
      <h2>Desculpe, essa página não foi encontrada.</h2>
      <div
        className="flex flex-row items-center gap-1 hover:scale-95 
      delay transition-all cursor-pointer"
        onClick={() => navigate("/")}
      >
        <TbArrowBack />
        <small>voltar</small>
      </div>
    </div>
  );
};

export default NotFoundPage;
