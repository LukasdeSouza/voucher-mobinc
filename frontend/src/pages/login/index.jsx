import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";
import ButtonContained from "../../components/buttons/contained";
import mobCashLogin from "../../assets/mobcash_login.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      const result = await response.json();
      if (result.token) {
        setToken(result.token);
        toast("Login efetuado com sucesso!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/gerenciar");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Erro no servidor (500):", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("@mobinc-token");
    if (token) {
      navigate("/gerenciar");
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
          <p className="text-lime-400 font-bold">faça login.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs text-lime-400" htmlFor="">
                e-mail de administrador
              </label>
              <input
                className="p-2 border border-[#222222] bg-[#1111] hover:scale-95 delay-75 transition-all"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-700">
                  preencha um email válido.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label className="font-thin text-xs text-lime-400" htmlFor="">
                senha
              </label>
              <input
                type={seePassword ? "text" : "password"}
                className="p-2 border border-[#222222] bg-[#1111] hover:scale-95 delay-75 transition-all"
                {...register("password", { required: true })}
              />
              {seePassword ? (
                <FaRegEyeSlash
                  size={20}
                  className="hover:rotate-180 hover:text-gray-400 cursor-pointer absolute right-3 top-8 text-slate-800 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              ) : (
                <FaRegEye
                  size={20}
                  className="hover:text-gray-400 cursor-pointer absolute right-3 top-8 text-slate-800 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              )}
              {errors.password && (
                <span className="text-xs text-red-700">
                  preencha sua senha.
                </span>
              )}
            </div>

            <ButtonContained
              value={loading ? "Carregando..." : "Entrar"}
              type="submit"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
