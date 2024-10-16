import { Link, Outlet, useNavigate } from "react-router-dom";
import HeaderNavigation from "../../header";
import { Toaster } from "react-hot-toast";
import SplashPage from "../../../pages/splash";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("@mobinc-token");

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  if (loading) {
    return <SplashPage />;
  } else {
    return (
      <div className="w-screen h-full bg-[#0000]">
        <div className="flex flex-row items-center gap-1">
          <Link
            className="absolute right-4 top-4 text-white text-sm z-20 hover:underline"
            to="/resgatar"
          >
            Resgatar Voucher
          </Link>
          {token && (
            <Link
              className="absolute right-4 top-12 text-white text-sm z-20 hover:underline"
              onClick={() => {
                localStorage.removeItem("@mobinc-token");
                navigate("/login");
              }}
            >
              Sair
            </Link>
          )}
        </div>
        {/* <HeaderNavigation /> */}
        <Outlet />
        <Toaster />
      </div>
    );
  }
};

export default RootLayout;
