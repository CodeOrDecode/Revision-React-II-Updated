import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import style from "../Css/Prodesc.module.css";
import { Button } from "@chakra-ui/react";
import { Authcontext } from "../Context/Authcontextprovider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Prodesc = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { newAddedProduct } = React.useContext(Authcontext);

  function toastHandle() {
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
      id: data.id,
      title: data.title,
      category: data.category,
      price: data.price,
      image: data.image,
    };
    newAddedProduct(newObj);

    toastHandle();
  }

  function addTocartandbuy() {
    let newObj = {
      id: data.id,
      title: data.title,
      category: data.category,
      price: data.price,
      image: data.image,
    };
    newAddedProduct(newObj);
    navigate("/cart");
  }

  async function getSingleData() {
    try {
      let { data } = await axios({
        method: "get",
        url: `http://localhost:3000/products/${id}`,
      });
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className={style.perdescdiv}>
      {data && <img className={style.perdescdivimg} src={data.image} alt="" />}
      {data && <h2 className={style.perdescdivtitle}>{data.title}</h2>}
      {data && <h3 className={style.perdescdivdesc}>{data.description}</h3>}
      {data && <h3 style={{marginTop:"15px",fontWeight:"bold"}}>Rating - {data.rating.rate}</h3>}
      {data && <h4 className={style.perdescdivprice}>₹ {data.price}</h4>}
      <Button
        colorScheme="blue"
        onClick={addTocart}
        style={{ marginTop: "18px" }}
      >
        Add to Cart
      </Button>
      <Button
        colorScheme="blue"
        style={{ marginTop: "18px", marginLeft: "16px" }}
        onClick={addTocartandbuy}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default Prodesc;
