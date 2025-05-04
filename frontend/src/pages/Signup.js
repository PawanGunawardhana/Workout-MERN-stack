import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, isLoading, success, error} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await signup(email, password);
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
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">User Signed Up Successfully!</div>}
    </form>
  );
};

export default Signup;
