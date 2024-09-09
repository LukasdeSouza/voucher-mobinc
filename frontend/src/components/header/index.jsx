import { Link, useNavigate } from "react-router-dom";
import MobIncLogo from "../../assets/mob_inc_logo";
import { FaRegUserCircle } from "react-icons/fa";
import { getToken, removeToken } from "../../utils/localStorage";
import { useState } from "react";
import toast from "react-hot-toast";

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const token = getToken(true);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full flex flex-row items-center justify-between p-8">
      <MobIncLogo style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
      {token ? (
        <div
          className="relative flex flex-row items-center gap-1 px-3 py-2 
        rounded-lg hover:bg-gray-700 delay-75 transition-all scale-95
        cursor-pointer"
          onClick={() => setShowMenu((showMenu) => !showMenu)}
        >
          <FaRegUserCircle size={16} />
          <small className="text-xs">{token.email}</small>
          <div
            className={`top-8 border w-[120px] bg-slate-950 border-gray-800 absolute p-2 
              transition-all ease-in-out delay-100 shadow-md
               ${
              showMenu ? "flex flex-row" : "hidden"
            }`}
            onMouseLeave={() => setShowMenu(false)}
          >
            <ul className="flex flex-col gap-2">
              <li
                className="p-1 text-sm hover:bg-slate-800"
                onClick={() => navigate("/gerenciar")}
              >
                Criar Vouchers
              </li>
              <hr />
              <li
                className="p-1 text-sm hover:bg-slate-800"
                onClick={() => {
                  removeToken();
                  toast.success("Logout efetuado com sucesso!");
                  setTimeout(() => {
                    navigate("/gerenciar");
                  }, 1000)
                }}
              >
                Log out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link
          className="font-light hover:scale-105 delay-75 transition-all"
          to={"/login"}
        >
          Entrar
        </Link>
      )}
    </div>
  );
};

export default HeaderNavigation;
