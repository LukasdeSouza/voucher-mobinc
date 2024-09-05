import { Link, useNavigate } from "react-router-dom";
import MobIncLogo from "../../assets/mob_inc_logo";
import { FaRegUserCircle } from "react-icons/fa";
import { getToken } from "../../utils/localStorage";

const HeaderNavigation = () => {
  const navigate = useNavigate();

  const token = getToken();

  return (
    <div className="w-full flex flex-row items-center justify-between p-8">
      <MobIncLogo style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
      {token ? (
        <div className="flex flex-row items-center gap-1 px-3 py-2 cursor-default rounded-lg hover:bg-gray-700 delay-75 transition-all scale-95">
          <FaRegUserCircle size={16} />
          <small className="text-xs">{token.email}</small>
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
