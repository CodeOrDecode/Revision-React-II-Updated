import React from "react";
import style from "../Css/Conformation.module.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontextprovider";
import { useEffect } from "react";

const Conformation = () => {

  const { handleReset } = React.useContext(Authcontext)
  const navigate = useNavigate();


  function hanleHome() {
    navigate("/");
  }

  useEffect(() => {
    handleReset()
  }, [])
  


  return (
    <div className={style.conf}>
      <p className={style.confp1}>Thank You For Your Order! </p>
      <p className={style.confp2}>Order id : 7890987898</p>
      <Button
        onClick={hanleHome}
        colorScheme="whatsapp"
        style={{ marginTop: "25px" }}
      >
        Home
      </Button>
    </div>
  );
};

export default Conformation;
