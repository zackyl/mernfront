// import React, { Children } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
// import ErrorPage from "./ErrorPage";
// import NewPlace from "./places/pages/NewPlace";
// import Users from "./user/pages/Users";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
// import { AuthContext } from "./shared/context/auth-context";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Users />,
//       },
//       {
//         path: "/places/new",
//         element: <NewPlace />,
//       },
//       {
//         path: "/:userId/places",
//         element: <UserPlaces />,
//       },
//       {
//         path: "/places/:placeId",
//         element: <UpdatePlace />,
//       },
//       {
//         path: "/auth",
//         element: <Auth />,
//       },
//       {
//         path: "*",
//         element: <Navigate to="/" replace />,
//       },
//     ],
//   },
// ]);




// // Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   // const uluru = { lat: -25.344, lng: 131.031 };
//   // // The map, centered at Uluru
//   // const map = new google.maps.Map(document.getElementById("map"), {
//   //   zoom: 4,
//   //   center: uluru,
//   // });
//   // // The marker, positioned at Uluru
//   // const marker = new google.maps.Marker({
//   //   position: uluru,
//   //   map: map,
//   // });
// }
// window.initMap = initMap;

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
