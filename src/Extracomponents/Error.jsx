import React from "react";
import style from "../Css/Error.module.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate()

  function handleNav(){
    navigate("/login");
  }

  
  return (
    <>
      <div className={style.para}>Some Error Occurred....</div>;
      <Button colorScheme="blue" onClick={handleNav} className={style.errorbutton}>
        Login Again
      </Button>
    </>
  );
};

export default Error;
