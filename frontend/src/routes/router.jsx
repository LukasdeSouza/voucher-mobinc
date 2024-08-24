import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/voucher",
        element: <div>Voucher</div>,
        children: [
          {
            path: "/voucher/resgate",
            element: <div>Resgate VOUCHER</div>,
          },
        ],
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "/gerenciar",
        element: <div>Gerenciar</div>,
      },
    ],
  },
]);
