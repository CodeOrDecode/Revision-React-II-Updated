import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Product from "../Components/Products";
import Private from "../Private/Private";
import Prodesc from "../Components/Prodesc";
import Cart from "../Components/Cart";
import Processing from "../Extracomponents/Processing";
import Conformation from "../Extracomponents/Conformation";
import Loding from "../Extracomponents/Loding";
import Error from "../Extracomponents/Error";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/product"
          element={
            <Private>
              <Product />
            </Private>
          }
        />

        <Route
          path="/cart"
          element={
            <Private>
              <Cart />
            </Private>
          }
        />

        <Route
          path="/prodesc/:id"
          element={
            <Private>
              <Prodesc />
            </Private>
          }
        />

        <Route
          path="/processing"
          element={
            <Private>
              <Processing />
            </Private>
          }
        />

        <Route
          path="/conformation"
          element={
            <Private>
              <Conformation />
            </Private>
          }
        />

        <Route
          path="/Loding"
          element={
            <Private>
              <Loding />
            </Private>
          }
        />

        <Route path="/error" element={<Error/>}/>
      </Routes>


    </div>
  );
};

export default Allroutes;
