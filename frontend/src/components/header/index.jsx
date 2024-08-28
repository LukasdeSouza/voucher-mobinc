import { Link } from "react-router-dom";
import MobIncLogo from "../../assets/mob_inc_logo";

const HeaderNavigation = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between p-8">
      <MobIncLogo />
      <Link
        className="font-light hover:scale-105 delay-75 transition-all"
        to={"/login"}
      >
        Entrar
      </Link>
    </div>
  );
};

export default HeaderNavigation;
