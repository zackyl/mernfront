import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";

const Users = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    // let ignore = false;
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/`,
          "GET",
          null,
          {}
        );

        console.log("setting loading no error", responseData);
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log("setting loading error");
        // setError(err.message);
        // throw err;
      }
    };
    getUsers();

    // return () => {
    //   ignore = true;
    // };
  }, [sendRequest]);

  // const errorHandler = () => {
  //   setError(null);
  // };

  // can also check loadedUsers for not empty but should be at least [] if loaded
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
        <UsersList users={loadedUsers} />
      )}
    </>
  );
};

export default Users;
