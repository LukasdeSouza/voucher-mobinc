import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/root";
import VoucherPage from "../pages/voucher";
import ResgateVoucherPage from "../pages/voucher/resgate";
import SuccessPage from "../pages/success";
import LoginPage from "../pages/login";
import GerenciarPage from "../pages/gerenciar";
import NotFoundPage from "../pages/notFound";
import HomePage from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/resgatar",
        element: <VoucherPage />,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/gerenciar",
        element: <GerenciarPage/>,
      },
      // {
      //   path: "/sucesso",
      //   element: <SuccessPage/>,
      // },
    ],
  },
]);
