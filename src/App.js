import { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "./components/Container/Container";
import PrivateRoute from "./components/routers/PrivateRoute";
import PublicRoute from "./components/routers/PublicRoute";
import AppBar from "./components/AppBar/AppBar";
import s from "./App.module.css";
import authOperations from "./redux/auth/auth-operations";
import authSelectors from "./redux/auth/auth-selectors";

// import HomePage from "./pages/HomePage";
// import ContactsPage from "./pages/ContactsPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
  const dispatch = useDispatch();

  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  console.log("isFetchingCurrentUser: ", isFetchingCurrentUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    //рендерим только после того как пришел ответ на операцию authOperations.fetchCurrentUser()
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />
        <Switch>
          <Suspense fallback={<p>Загружаем...</p>}>
            <PublicRoute path="/" exact>
              <HomePage />
            </PublicRoute>

            <PublicRoute exact path="/register" restricted>
              <RegisterPage />
            </PublicRoute>

            <PublicRoute exact path="/login" redirectTo="/contacts" restricted>
              <LoginPage />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsPage />
            </PrivateRoute>

            {/* <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/login" exact>
            <LoginPage />
          </Route>

          <Route path="/register" exact>
            <RegisterPage />
          </Route> */}
          </Suspense>
        </Switch>
      </Container>
    )
  );
}

export default App;
