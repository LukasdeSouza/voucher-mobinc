import React from "react";
import Card from "../../components/card";
import Input from "../../components/input";
import ButtonContained from "../../components/buttons/contained";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const VoucherPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast("Enviado com sucesso!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="flex w-full h-3/4 justify-center items-center">
      <Card>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-white font-semibold">Resgate seu voucher.</p>
            <small className="text-xs font-thin">
             informe o número do voucher seguido da senha
            </small>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                número do voucher
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("numerovoucher", { required: true })}
              />
              {errors.numerovoucher && (
                <span className="text-xs text-red-700">
                  preencha o número do voucher.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                senha
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("senhavoucher", { required: true })}
              />
              {errors.senhavoucher && (
                <span className="text-xs text-red-700">
                  preencha a senha do voucher.
                </span>
              )}
            </div>
            <ButtonContained type="submit" onClick={handleSubmit(onSubmit)} />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default VoucherPage;
