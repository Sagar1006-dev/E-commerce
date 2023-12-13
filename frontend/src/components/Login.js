import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if (auth) {
        navigate("/")
    }
  },[])

  // Add your login logic here
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React from 'react'
// const Login = () => {
//   return (
//     <div className='login'>
//        <input type='text' placeholder='enter email'/>
//        <input type='password' placeholder='enter password'/>
//        <button type='button'>Login</button>
//     </div>
//   )
// }
// export default Login
