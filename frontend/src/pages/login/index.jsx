import React, { useState } from "react";
import Card from "../../components/card";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
      }
    } catch (error) {
      toast.error("Erro:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full h-3/4 justify-center items-center bg-white">
      <Card>
        <div className="flex flex-col gap-8">
          <p className="text-black font-bold">faça login.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                e-mail
              </label>
              <input
                className="bg-white text-gray-600 p-2 border border-[#222222] hover:bg-slate-100 hover:scale-95 delay-75 transition-all"
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
            <div className="flex flex-col gap-1">
              <label className="font-thin text-xs text-gray-900" htmlFor="">
                senha
              </label>
              <input
                className="bg-white text-gray-600 p-2 border border-[#222222] hover:bg-slate-100 hover:scale-95 delay-75 transition-all"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-700">
                  preencha sua senha.
                </span>
              )}
            </div>
            <input
              type={"submit"}
              value={loading ? "Carregando..." : "Entrar"}
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

export default LoginPage;
