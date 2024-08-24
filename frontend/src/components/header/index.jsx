import MobIncLogo from "../../assets/mob_inc_logo";
import ButtonContained from "../buttons/contained";

const HeaderNavigation = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between p-8">
      <MobIncLogo />
      <ButtonContained label="Login" />
    </div>
  );
};

export default HeaderNavigation;
