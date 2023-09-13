import { PreloadedState } from "@reduxjs/toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { router } from "../../router/router";
import { RootState } from "../../store/store";
import renderWithProviders from "./renderWithProviders";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";

export interface RouterRenderOptions {
  ui?: React.ReactElement;
  preloadedState?: PreloadedState<RootState>;
}

const getComponentRouter = (ui: JSX.Element) =>
  createBrowserRouter([
    {
      path: "/",
      element: ui,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/my-list",
      element: <></>,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

const renderRouterWithProviders = ({
  ui,
  preloadedState,
}: RouterRenderOptions) => {
  const customRouter = ui ? getComponentRouter(ui) : router;

  return renderWithProviders(
    <RouterProvider router={customRouter}></RouterProvider>,
    preloadedState
  );
};

export default renderRouterWithProviders;
