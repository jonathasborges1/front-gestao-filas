import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const DisplayPage = lazy(() => import("./modules/queue/view/page"));

export const router = createBrowserRouter([
  { path: "/", element: <DisplayPage /> },
  // { path: "/display", element: <DisplayPage /> },
]);
