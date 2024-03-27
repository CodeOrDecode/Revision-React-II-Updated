import React from "react";
import style from "../Css/Singleproduct.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Authcontext } from "../Context/Authcontextprovider";

import { useToast } from "@chakra-ui/react";

const Singleproduct = ({ id, title, category, price, image,rating }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { newAddedProduct } = React.useContext(Authcontext);

  function handleNavigate(value) {
    navigate(`/prodesc/${value}`);
  }

  function toastShow() {
    toast({
      title: "Item added to the cart.",
      description: "Go To the cart to see it.",
      status: "success",
      duration: 700,
      isClosable: true,
    });
  }

  function addTocart() {
    let newObj = {
      id: id,
      title: title,
      category: category,
      price: price,
      image: image,
    };
    newAddedProduct(newObj);
    toastShow();
  }

  return (
    <div className={style.smalldiv}>
      <img className={style.image} src={image} alt="" />
      <h3>{title}</h3>
      <p style={{marginTop:"15px",fontWeight:"bold"}}>Rating - {rating.rate}</p>
      <h4 className={style.price}>₹ {price}</h4>
      <Button colorScheme="blue" onClick={addTocart}>
        Add to Cart
      </Button>
      <Button
        colorScheme="blue"
        style={{ marginLeft: "20px" }}
        onClick={() => {
          handleNavigate(id);
        }}
      >
        View details
      </Button>
    </div>
  );
};

export default Singleproduct;
