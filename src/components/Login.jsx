import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/skelbimai", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        values,
        { withCredentials: true },
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      console.log(data);
      alert("Login successful");
      navigate("/skelbimai", { replace: true });
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.error || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div>
      <h2>Log in Account</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <br></br>
        <span>
          Dont have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
