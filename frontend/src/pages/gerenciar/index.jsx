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

const GerenciarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [inputValue, setInputValue] = useState("");
  // const [quantityValue, setQuantityValue] = useState("");
  // const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    }
  });

  // const generateVoucher = (length = 12) => {
  //   const charset =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let voucher = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     voucher += charset[randomIndex];
  //   }
  //   setValue("number", voucher);
  // };

  const onChangeInputValue = (e) => {
    let inputValue = formatCurrency(e.target.value);
    setInputValue(inputValue);
    setValue("value", inputValue);
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/vouchers/create",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            quantity: data.quantity,
            value: data.value
          }),
        }
      );
      const result = await response.json();
      if (result.vouchers) {
        toast(result.message, {
          icon: <MobIncLogo/>,
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
    // else {
    //   generateVoucher();
    // }
  }, []);

  return (
    <div className="flex w-full h-3/4 justify-center items-center bg-white">
      <Card>
        <div className="flex flex-col gap-8">
          <p className="text-black font-bold">cadastrar um novo voucher.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                código do voucher
              </label>
              <RxUpdate
                size={20}
                className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
                onClick={() => generateVoucher(12)}
              />
              <input
                disabled
                className="bg-white text-gray-600 p-2 border border-[#222222]"
                {...register("number", { required: true })}
              />
              {errors.number && (
                <span className="text-xs text-red-700">
                  gere um código de voucher para salvar
                </span>
              )}
            </div> */}
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                valor do voucher
              </label>
              <TbReportMoney
                size={20}
                className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
              />
              <input
                className="bg-white text-gray-600 p-2 border border-[#222222]"
                placeholder="R$ 0,00"
                value={inputValue}
                onChange={onChangeInputValue}
                // {...register("value", { required: true })}
              />
              {errors.value && (
                <span className="text-xs text-red-700">
                  digite um valor para o voucher
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                quantidade de vouchers
              </label>
              <TbNumbers
                size={20}
                className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
              />
              <input
                className="bg-white text-gray-600 p-2 border border-[#222222]"
                placeholder="ex: 2"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-xs text-red-700">
                  digite uma quantidade de vouchers
                </span>
              )}
            </div>
            {/* <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                senha do voucher
              </label>
              <input
                type={seePassword ? "text" : "password"}
                className="bg-white text-gray-600 p-2 border border-[#222222] hover:bg-slate-100 hover:scale-95 delay-75 transition-all"
                {...register("password", { required: true, minLength: 8 })}
              />
              {seePassword ? (
                <FaRegEyeSlash
                  size={20}
                  className="hover:rotate-180 hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              ) : (
                <FaRegEye
                  size={20}
                  className="hover:text-lime-400 cursor-pointer absolute right-3 top-8 text-gray-700 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              )}
              {errors.password && (
                <span className="text-xs text-red-700">
                  a senha deve conter no mínimo 8 caractéres.
                </span>
              )}
            </div> */}
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
