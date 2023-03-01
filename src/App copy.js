// import { BrowserRouter as Router, Outlet } from "react-router-dom";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import { useState, useCallback } from "react";
// import { AuthContext } from "./shared/context/auth-context";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);

//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       <MainNavigation />
//       <main>
//         <Outlet />
//       </main>
//     </AuthContext.Provider>
//   );
// }

// export default App;
