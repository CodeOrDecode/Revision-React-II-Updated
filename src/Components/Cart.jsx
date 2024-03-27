import React, { useEffect, useState } from "react";
import Navbar from "../Extracomponents/Navbar";
import style from "../Css/Cart.module.css";
import { Authcontext } from "../Context/Authcontextprovider";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const { added } = React.useContext(Authcontext);
  const [paycount, setPaycount] = useState(0);

  function handleCountpay() {
    let total = 0;
    added.forEach((ele) => {
      total = total + ele.price;
    });
    setPaycount(total);
  }

  function handlecartto(){
    navigate("/processing");
  }

  useEffect(() => {
    handleCountpay();
  }, []);

  return (
    <div>
      <Navbar />

      <div className={style.cartdiv}>
        <h3 className={style.cartshow}>Cart : </h3>
        {added.length <= 0 && (
          <div className={style.empty}>Your Cart is empty.......</div>
        )}

        {added.map((ele) => {
          return (
            <div key={ele.id} className={style.smalldivpro}>
              <img src={ele.image} className={style.imagepro} alt="" />
              <div className={style.content}>
                <h3 className={style.conh1}>{ele.title}</h3>
                <h4 className={style.conh4}>{ele.category}</h4>
                <p className={style.priceoo}>₹ {ele.price}</p>
              </div>
            </div>
          );
        })}

        {added.length > 0 && (
          <Button colorScheme="blue" style={{ marginTop: "30px" }} onClick={handlecartto}>
            Pay ₹ {paycount}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
