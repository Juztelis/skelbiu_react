import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/register",
        values,
        { withCredentials: true },
      );

      console.log(data);
      alert("Account created sucessfully");
      navigate("/skelbimai");
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.error || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div>
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username </label>
          <br></br>
          <input
            type="text"
            name="user"
            placeholder="username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          ></input>
          <br></br>
        </div>
        <div>
          <label>Email </label>
          <br></br>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          ></input>
          <br></br>
        </div>
        <div>
          <label>Password </label>
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          ></input>
          <br></br>
        </div>
        <button type="submit">Register</button>
        <br></br>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
