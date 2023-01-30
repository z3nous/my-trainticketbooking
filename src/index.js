import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter
        ,RouterProvider } from "react-router-dom";
import Root from "./index/Root";
import Query from "./query/query";
import ErrorPage from "./errorpage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        errorElement:<ErrorPage/>,
    },
    {
        path:"/query",
        element:<Query/>
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);