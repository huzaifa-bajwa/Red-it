import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import userIcon from "./Assets/user.png";
import emailIcon from "./Assets/mail.png";
import lockIcon from "./Assets/padlock.png";
import Summary from './summary.jsx';

function LoginSignup() {
  // const [currentUrl, setCurrentUrl] = useState('');

  // function fetchCurrentTabUrl() {
  //   return new Promise((resolve, reject) => {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       if (chrome.runtime.lastError) {
  //         reject(new Error(chrome.runtime.lastError.message));
  //       } else if (tabs.length === 0) {
  //         reject(new Error('No active tab found'));
  //       } else {
  //         console.log(tabs[0].url);
  //         resolve(tabs[0].url);
  //       }
  //     });
  //   });
  // };

  // useEffect(() => {
  //   fetchCurrentTabUrl().then(url => {
  //     setCurrentUrl(url);
  //   });
  // }, []);

  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const username = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://127.0.0.1:8000/newuser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User creation successful: " + data);
        // Proceed with any post-user creation flow
      } else {
        const errorData = await response.json();
        alert("User creation error: " + errorData.detail);
        // Handle user creation error (e.g., show error message)
      }
    } catch (error) {
      alert("Network or fetch error:", error.message);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful:", data);
        setIsLoggedIn(true)
        // Proceed with user login flow
      } else {
        const errorData = await response.json();
        alert("Login error:", errorData.detail);
        // Handle login error (e.g., show error message)
      }
    } catch (error) {
      alert("Network or fetch error:", error.message);
    }
  };

  if (isLoggedIn) {
    return <Summary />;
  }

  return (
    <div className="container">
      <div className="toggle-buttons">
        <button
          onClick={() => setIsLoginActive(false)}
          className={!isLoginActive ? "active" : ""}
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsLoginActive(true)}
          className={isLoginActive ? "active" : ""}
        >
          Login
        </button>
      </div>
      {isLoginActive ? (
        <form className="form" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div className="form-control">
            <img src={emailIcon} alt="Email" className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-control">
            <img src={lockIcon} alt="Password" className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>
          <div className="form-control">
            <img src={userIcon} alt="User" className="input-icon" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-control">
            <img src={emailIcon} alt="Email" className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-control">
            <img src={lockIcon} alt="Password" className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">
            {isLoginActive ? "Login" : "Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginSignup;
