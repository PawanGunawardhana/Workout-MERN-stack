import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch("/api/user/signup", {
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
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      setError(null);
      setIsLoading(false);
      setSuccess(true);

      //update the AuthContext
      dispatch({ type: "LOGIN", payload: json });
      console.log("User Signed up successfully!", json);
    }
  };
  return { signup, error, isLoading, success };
};

export default useSignup;
