import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/root";
import VoucherPage from "../pages/voucher";
import ResgateVoucherPage from "../pages/voucher/resgate";
import SuccessPage from "../pages/success";
import LoginPage from "../pages/login";
import GerenciarPage from "../pages/gerenciar";
import NotFoundPage from "../pages/notFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <VoucherPage />,
      },
      // {
      //   path: "/resgate",
      //   element: <ResgateVoucherPage />,
      // },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/gerenciar",
        element: <GerenciarPage/>,
      },
      {
        path: "/sucesso",
        element: <SuccessPage/>,
      },
    ],
  },
]);
