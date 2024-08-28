import React from "react";
import Card from "../../components/card";
import ButtonContained from "../../components/buttons/contained";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-3/4 justify-center items-center">
      <Card>
        <div className="flex flex-col gap-3">
          <p className="text-white font-semibold">ótimo, é só aguardar.</p>
          <span className="text-xs text-gray-400">
            seus dados foram salvos e no prazo de <b>5 dias</b> você receberá o
            valor em sua conta
          </span>
          <ButtonContained label={"voltar"} onClick={() => navigate("/")} />
        </div>
      </Card>
    </div>
  );
};

export default SuccessPage;
