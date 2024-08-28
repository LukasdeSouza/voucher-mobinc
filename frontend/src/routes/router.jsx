import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/root";
import VoucherPage from "../pages/voucher";
import ResgateVoucherPage from "../pages/voucher/resgate";
import SuccessPage from "../pages/success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <VoucherPage />,
      },
      {
        path: "/resgate",
        element: <ResgateVoucherPage />,
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "/gerenciar",
        element: <div>Gerenciar</div>,
      },
      {
        path: "/sucesso",
        element: <SuccessPage/>,
      },
    ],
  },
]);
