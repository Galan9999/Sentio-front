import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom";
import App from "../components/App/App";
import Layout from "../components/Layout/Layout";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import UnprotectedRoutes from "../components/UnprotectedRoutes/UnprotectedRoutes";
import CreatePage from "../pages/CreatePage/CreatePage";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <App />
        <ScrollRestoration />
      </>
    ),
    errorElement: (
      <Layout>
        <div>Page not found</div>
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <UnprotectedRoutes>
            <LoginPage />
          </UnprotectedRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <UnprotectedRoutes>
            <RegisterPage />
          </UnprotectedRoutes>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoutes>
            <CreatePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
