import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "../../redux/auth/auth-selectors";

/**
 * - Если маршрут ограниченный, и юзер залогинен, рендерит редирект на redirectTo
 * - В противном случае рендерит компонент
 *
 */
//как только пользователь залогинится или авторизуется - закрывает страницы логина и авторизации
//и перенаправляет на маршрут "/"- home page, см тетрадь и вебинар
export default function PublicRoute({
  children,
  restricted = false, //default value
  redirectTo = "/",
  ...routProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return (
    <Route {...routProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
