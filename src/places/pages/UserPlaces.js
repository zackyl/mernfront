import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import useHttpClient from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

function UserPlaces() {
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        console.log(
          "url",
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        console.log("setting user places loading no error", responseData);
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log("setting loading in userplaces error", err);
      }
    };
    getUserPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((prevPlaces) => prevPlaces.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        loadedPlaces && (
          <PlaceList places={loadedPlaces} onDelete={placeDeleteHandler} />
        )
      )}
    </>
  );
}

export default UserPlaces;
