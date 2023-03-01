import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  Navigate,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
// import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";

const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainNavigation />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {/* <Route path="*" to="/" replace /> */}
      </Route>{" "}
    </Route>
  )
);

const routerLoggedOut = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainNavigation />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App router={router} routerOut={routerLoggedOut} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
