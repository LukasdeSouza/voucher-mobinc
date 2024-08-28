import React from "react";
import Card from "../../../components/card";
import Input from "../../../components/input";
import ButtonContained from "../../../components/buttons/contained";

const ResgateVoucherPage = () => {
  return (
    <div className="flex w-full h-3/4 justify-center items-center">
      <Card>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <p className="text-white font-semibold">show, agora seus dados.</p>
            <span className="text-xs text-gray-400 font-light">
              adicione seus dados bancários para resgate do valor representado
              pelo voucher
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Input label={"email"} />
            <Input label={"telefone"} />
            <Input label={"chave pix"} />
          </div>
          <ButtonContained label={"salvar"} />
        </div>
      </Card>
    </div>
  );
};

export default ResgateVoucherPage;
