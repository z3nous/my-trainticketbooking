import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter
        ,RouterProvider } from "react-router-dom";
import Root from "./index/Root";
import Query from "./query/query";
import ErrorPage from "./errorpage";
import Ticket from "./ticket/ticket";
import Order from "./order/Order";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        errorElement:<ErrorPage/>,
    },
    {
        path:"/query",
        element:<Query/>
    },
    {
        path:"/ticket",
        element:<Ticket/>
    },
    {
        path:"/order",
        element:<Order/>
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);