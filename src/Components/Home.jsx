import React from "react";
import style from "../Css/Home.module.css";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/product");
  }

  return (
    <div  className={style.disfrotop}>
      <p className={style.fontstyle}>Welcome to the Home Page</p>
      <div className={style.homediv1}>
        <Button onClick={handleClick} colorScheme="blue">
          Go to Product Page using useNavigate
        </Button>
        <Link to="/product">
          <Button onClick={handleClick} style={{marginLeft:"20px"}} colorScheme="blue">
            Go to Product Page using Link
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
