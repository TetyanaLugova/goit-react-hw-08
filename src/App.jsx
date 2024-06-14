import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../src/components/Layout/Layout";
import RestrictedRoute from "../src/components/RestrictedRoute";
import PrivateRoute from "../src/components/PrivateRoute";
import { refreshUser } from "../src/redux/auth/operations";
import { selectIsRefreshing } from "../src/redux/auth/selectors";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const RegisterPage = lazy(() =>
  import("../src/pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../src/pages/LoginPage/LoginPage"));
const ContactPage = lazy(() => import("../src/pages/ContactPage/ContactPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactPage />} redirectTo="/login" />
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
