import { Outlet } from "react-router-dom";
import HeaderNavigation from "../../header";
import {Toaster} from "react-hot-toast";
import SplashPage from "../../../pages/splash";
import { useState } from "react";

const RootLayout = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2500);

  if(loading) {
    return <SplashPage/>
  } else {
    return (
      <div className="w-screen h-full bg-[#0000]">
        <HeaderNavigation />
        <Outlet />
        <Toaster />
      </div>
    );
  }

};

export default RootLayout;
