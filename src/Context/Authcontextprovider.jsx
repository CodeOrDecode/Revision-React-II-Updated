import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = React.createContext();

const Authcontextprovider = ({ children }) => {
  const navigate = useNavigate();

  const [cartcount, setCartcount] = useState(0);
  const [added, setAdded] = useState([]);


  function login(value) {
    localStorage.setItem("user", JSON.stringify(true));
    localStorage.setItem("usertoken", JSON.stringify(value));
    navigate("/");
  }


  function logout() {
    localStorage.setItem("user", JSON.stringify(false));
    localStorage.setItem("usertoken", JSON.stringify(null));
    navigate("/login");
  }

  function newAddedProduct(val) {
    setCartcount(cartcount + 1);
    setAdded([...added, val]);
  }

  function handleReset() {
    setCartcount(0);
    setAdded([]);
  }


  return (
    <Authcontext.Provider
      value={{
        login,
        logout,
        cartcount,
        newAddedProduct,
        added,
        handleReset,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontextprovider;
