import React, { useState } from "react";
import Card from "../../components/card";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";
import ButtonContained from "../../components/buttons/contained";
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
      const response = await fetch("https://voucher-mobinc.onrender.com/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
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

  return (
    <div className="flex w-full h-3/4 justify-center items-center">
      <Card>
        <div className="flex flex-col gap-8">
          <p className="text-white font-bold">faça login.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs" htmlFor="">
                e-mail de administrador
              </label>
              <input
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
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
              <label className="font-thin text-xs" htmlFor="">
                senha
              </label>
              <input
                type={seePassword ? "text" : "password"}
                className="p-2 border border-[#222222] hover:bg-gray-900 hover:scale-95 delay-75 transition-all"
                {...register("password", { required: true })}
              />
              {seePassword ? (
                <FaRegEyeSlash
                  size={20}
                  className="hover:rotate-180 hover:text-gray-400 cursor-pointer absolute right-3 top-8 text-slate-400 transition-all ease-in-out delay-100"
                  onClick={() => setSeePassword((seePassword) => !seePassword)}
                />
              ) : (
                <FaRegEye
                  size={20}
                  className="hover:text-gray-400 cursor-pointer absolute right-3 top-8 text-slate-400 transition-all ease-in-out delay-100"
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
