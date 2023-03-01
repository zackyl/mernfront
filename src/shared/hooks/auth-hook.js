import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    const tokenExpirationDate = // shadow variable, differrnet scoping from state
      expiration || new Date(new Date().getTime() + 1000 * 3600);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    // read localstorage and potentially login
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    // set timer based on token expiration date, idea is it changes when you log in/out
    if (token && tokenExpirationDate) {
      logoutTimer = setTimeout(
        logout,
        tokenExpirationDate.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(logoutTimer); // feel like we shouldn't use global scoped logouttimer id, but return cleanup instead
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};

export default useAuth;
