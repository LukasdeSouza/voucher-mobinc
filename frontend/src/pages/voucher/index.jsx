import React, { useState } from "react";
import Card from "../../components/card";
import Input from "../../components/input";
import ButtonContained from "../../components/buttons/contained";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const VoucherPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch(
        "http://localhost:5000/api/vouchers/redeem",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            number: data.number,
            password: data.password,
            nome: data.nome,
            banco: data.banco,
            chavePix: data.chavePix,
          }),
        }
      );
      const result = await response.json();
      if (
        result.message === "Voucher já resgatado" ||
        result.message === "Voucher não encontrado"
      ) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate("/");
      }
    } catch (error) {
      toast("Ocorreu um erro ao recuperar o voucher, tente novamente!", {
        icon: "🔥",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(false)
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
                {...register("number", { required: true })}
              />
              {errors.number && (
                <span className="text-xs text-red-700">
                  preencha o número do voucher.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                senha do voucher
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-700">
                  a senha do voucher é obrigatória.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                seu nome completo
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("nome", { required: true })}
              />
              {errors.nome && (
                <span className="text-xs text-red-700">
                  nome completo é obrigatório.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                instituição bancária
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                placeholder="ex: Itaú, Bradesco, Nubank"
                {...register("banco", { required: true })}
              />
              {errors.banco && (
                <span className="text-xs text-red-700">
                  a instituição financeira é obrigatória.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                chave Pix
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("chavePix", { required: true })}
              />
              {errors.chavePix && (
                <span className="text-xs text-red-700">
                  a chave pix é obrigatória.
                </span>
              )}
            </div>
            <ButtonContained
              value={loading ? "Carregando..." : "Resgatar voucher"}
              type="submit"
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default VoucherPage;
