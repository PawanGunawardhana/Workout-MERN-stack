import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");
      setError(null);
      dispatch({ type: "LOGIN", payload: json });
      console.log("User Signed up successfully!", json);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button>Sign Up</button>
      {error && <div className="error">{error}</div>}
      {!error && <div className="success">User Successfully Signed Up! </div>}
    </form>
  );
};

export default Signup;
