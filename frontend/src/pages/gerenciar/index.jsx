import React, { useState } from "react";
import Card from "../../components/card";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const GerenciarPage = () => {
  const [seePassword, setSeePassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const generateVoucher = (length = 12) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let voucher = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      voucher += charset[randomIndex];
    }
    setValue("numerovoucher", voucher);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast("Voucher Gerado com sucesso!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="flex w-full h-3/4 justify-center items-center bg-white">
      <Card>
        <div className="flex flex-col gap-8">
          <p className="text-black font-bold">cadastrar um novo voucher.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                gerar número do voucher
              </label>
              <input
                readOnly
                className="bg-white text-gray-600 p-2 border border-[#222222] hover:bg-slate-100 hover:scale-95 delay-75 transition-all"
                {...register("numerovoucher", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-700">
                  gere um número de voucher para salvar
                </span>
              )}
              <button
                // onSubmit={(e) => e.preventDefault()}
                onClick={(e) => {
                    e.preventDefault()
                    generateVoucher()
                }}
                className="bg-gray-700 hover:bg-slate-200 transition-all ease-in-out delay-100 
                    hover:scale-95 border-none text-white hover:text-black font-bold 
                    min-w-36 p-2 cursor-pointer mt-2"
              >
                Gerar código
              </button>
              {/* <ButtonContained/> */}
            </div>
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                senha do voucher
              </label>
              <input
                type={seePassword ? "text" : "password"}
                className="bg-white text-gray-600 p-2 border border-[#222222] hover:bg-slate-100 hover:scale-95 delay-75 transition-all"
                {...register("senha", { required: true, minLength: 8 })}
              />
              {seePassword ? (
                <FaRegEyeSlash
                  size={20}
                  className="hover:text-gray-500 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              ) : (
                <FaRegEye
                  size={20}
                  className="hover:text-gray-500 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              )}
              {errors.senha && (
                <span className="text-xs text-red-700">
                  digite uma senha para o voucher.
                </span>
              )}
            </div>
            <input
              type={"submit"}
              name="Gerar"
              className="bg-black hover:bg-slate-200 transition-all ease-in-out delay-100 
                    hover:scale-95 border-none text-white hover:text-black font-bold 
                    min-w-36 p-2 cursor-pointer"
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default GerenciarPage;
