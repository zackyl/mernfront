import { Suspense } from "react";
import {
  RouterProvider
} from "react-router-dom";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

function App({ router, routerOut }) {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={token ? router : routerOut} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
