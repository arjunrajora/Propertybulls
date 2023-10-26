
import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return loggedInUser !== null;
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);

      if (response.success) {
        setLoggedInUser(response.data);
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await registerUser(username, email, password);

      if (response.success) {
        setLoggedInUser(response.data);
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  // Check local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, isLoggedIn, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
