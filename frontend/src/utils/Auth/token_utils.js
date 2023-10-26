// import { useState } from "react";

const setToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  return true;
};

const getToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return token;
  }
  return false;
};
const setId = (userId) => {
  localStorage.setItem("userId", userId);
  // return true;
}
const setrole_id = (roleId) => {
  localStorage.setItem("roleId", roleId);
  // return true;
}

const getrole_id = () => {
  const roleId = localStorage.getItem('roleId');
  if (roleId) {
    return roleId;
  }
  return false;
}


const getId = () => {
  const userId = localStorage.getId('userId');
  if (userId) {
    return userId;
  }
  return false;
}
const setUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};
const getUserData = async () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }
  return false;
};
const setUserName = (userName) => {
  localStorage.setItem('userName', JSON.stringify(userName));
};
const clearUserData = () => {
  localStorage.clear();
  return true;
};
const getUserName = async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    return JSON.parse(userName);
  }
  return false;
};

/*
add to short list
*/


const setshort = (newUsername) => {
  const storedData = localStorage.getItem('username');
  let newDataArray = [];

  if (storedData) {
    newDataArray = JSON.parse(storedData);
    if (newDataArray.includes(newUsername)) {
      localStorage.setItem('username', JSON.stringify(newDataArray));
      return;
    }
  }
  newDataArray.push(newUsername);
  // console.log(newDataArray);
  localStorage.setItem('username', JSON.stringify(newDataArray));
  
  const dataCount = newDataArray.length;
  localStorage.setItem('username', JSON.stringify(newDataArray));
  localStorage.setItem(`${"username"}_count`, dataCount.toString());
  return true;
}



const getshort = () => {
  const username = localStorage.getItem('username');
  if (username) {
    localStorage.setItem("userData", JSON.stringify(username));
  }
  return false;
};
const clearCart = (i) => {
  const username = localStorage.getItem('username');

  try {
    localStorage.removeItem('username');
    localStorage.removeItem(`${"username"}_count`);
  } catch (error) {

    console.error(`Error removing cart for user ${username}: ${error.message}`);
  }
  return false;
};


module.exports = {
  clearUserData,
  setToken,
  getToken,
  setUserData,
  getUserData,
  getId,
   setId,
  setUserName,
  getUserName,
  setshort , 
  getshort,
  clearCart,
  setrole_id,
  getrole_id
};
