import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
      setSuccess(false);
    }

    if (response.ok) {
      //set the user JWT to local storge
      localStorage.setItem("user", JSON.stringify(json));

      //get the user JWT from local storge
      const user = localStorage.getItem("user");
      const object = JSON.parse(user);
      const token = object.token;
      console.log("Logged user token", token);
      console.log(typeof user);
      console.log(typeof object);

      //set states
      setError(null);
      setIsLoading(false);
      setSuccess(true);

      //globally syncing
      dispatch({ type: "LOGIN", payload: json });
      console.log("User Logged in Successfully!", json);
    }
  };
  return { login, error, isLoading, success };
};

export default useLogin;
