import { useEffect, useRef, useState, useCallback } from "react";

const useHttpClient = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      // console.log("sending request", {
      //   method,
      //   body,
      //   headers,
      //   signal: httpAbortCtrl.signal,
      // });
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqctrl) => reqctrl !== httpAbortCtrl
        );
        if (!response.ok) {
          console.log("RESPONSE not ok");
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    // console.log("abort error!");
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((AbortController) =>
        AbortController.abort()
      );
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
