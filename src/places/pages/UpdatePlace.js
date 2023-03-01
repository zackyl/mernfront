import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useContext, useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttpClient from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const navigation = useNavigate();
  const context = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "", // idk where "".replace came from
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  // const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title, // idk where "".replace came from
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const updatePlaceSubmitHandler = (event) => {
    const updatePlace = async () => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
          "PATCH",
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          }
        );
        navigation(`/${context.userId}/places`);
      } catch (err) {}
    };
    updatePlace();
  };
  if (isLoading && !error) {
    console.log("loading", formState.inputs);
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value} // initial, not value
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            // description="textarea"
            element="Description"
            type="text"
            label="Title"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="sbumit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};
export default UpdatePlace;
