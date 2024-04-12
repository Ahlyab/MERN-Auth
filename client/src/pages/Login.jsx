import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {}
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>password</label>
        <input
          type="password"
          placeholder="enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
