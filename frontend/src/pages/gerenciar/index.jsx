import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TbNumbers, TbReportMoney } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { getToken } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import MobIncLogo from "../../assets/mob_inc_logo";
import mobCashLogin from "../../assets/mobcash_login.png";

const GerenciarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [inputValue, setInputValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const onChangeInputValue = (e) => {
    let inputValue = formatCurrency(e.target.value);
    setInputValue(inputValue);
    setValue("value", inputValue);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}api/vouchers/create`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            quantity: data.quantity,
            value: data.value,
          }),
        }
      );
      const result = await response.json();
      if (result.vouchers) {
        toast(result.message, {
          icon: <MobIncLogo />,
          style: {
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            gap: "8px",
            alignItems: "baseline",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 10000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <img className="h-screen" src={mobCashLogin} alt="" />
      <div className="absolute top-8 left-8">
        <p
          className="text-black font-light text-2xl"
          style={{ fontFamily: "Playfair Display" }}
        >
          MOB
        </p>
        <p
          className="text-black font-light text-2xl -mt-3"
          style={{ fontFamily: "Playfair Display" }}
        >
          CASH
        </p>
      </div>
      <Card>
        <div className="flex flex-col gap-8">
          <p className="text-lime-400 font-bold">cadastrar um novo voucher.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-lime-400" htmlFor="">
                valor do voucher
              </label>
              <TbReportMoney
                size={20}
                className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-white transition-all ease-in-out delay-100"
              />
              <input
                className="p-2 border border-[#222222] bg-[#1111] text-white hover:scale-95 delay-75 transition-all"
                placeholder="R$ 0,00"
                {...register("value", { required: true })}
                // value={inputValue}
                // onChange={onChangeInputValue}
              />
              {errors.value && (
                <span className="text-xs text-red-700">
                  digite um valor para o voucher
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-lime-400" htmlFor="">
                quantidade de vouchers
              </label>
              <TbNumbers
                size={20}
                className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-white transition-all ease-in-out delay-100"
              />
              <input
                className="p-2 border border-[#222222] bg-[#1111] text-white hover:scale-95 delay-75 transition-all"
                placeholder="ex: 2"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-xs text-red-700">
                  digite uma quantidade de vouchers
                </span>
              )}
            </div>
            <input
              type={"submit"}
              disabled={loading}
              value={loading ? "Carregando..." : "Cadastrar Vouchers"}
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
