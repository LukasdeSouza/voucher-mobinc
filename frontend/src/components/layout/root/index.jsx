import { Outlet } from "react-router-dom";
import HeaderNavigation from "../../header";
import {Toaster} from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="w-screen h-full">
      <HeaderNavigation />
      <Outlet />
      <div>
      <Toaster />
      </div>
    </div>
  );
};

export default RootLayout;
