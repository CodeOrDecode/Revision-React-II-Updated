import React, { useState } from "react";
import Singleproduct from "./Singleproduct";
import { useEffect } from "react";
import Loding from "../Extracomponents/Loding";
import Error from "../Extracomponents/Error";
import { useReducer } from "react";
import axios from "axios";
import style from "../Css/Singleproduct.module.css";
import { useSearchParams } from "react-router-dom";

const initialdata = {
  loading: false,
  error: false,
  data: [],
};

function datareducer(state, { type, payload }) {
  switch (type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case "ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case "SUCCESS": {
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
}

const Products = () => {
  const [productdata, dispatch] = useReducer(datareducer, initialdata);

  const { data, loading, error } = productdata;
  const [search, setSearch] = useSearchParams();
  const [category, setCategory] = useState(search.get("category") || "all");
  const [pricesort, setPricesort] = useState("Price");
  const [ratingsort, setRatingsort] = useState("Rating");
  const [inputtext, setInputtext] = useState("");

  function handlechange(event) {
    setCategory(event.target.value);
  }
  function handlechangePrice(event) {
    setPricesort(event.target.value);
  }

  function handlechangerating(event) {
    setRatingsort(event.target.value);
  }

  async function handleSingleData(val) {
    try {
      let { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_URL}?title=${val}`,
      });
      console.log(data);
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  let id;
  function inputDataget(value) {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      handleSingleData(value);
    }, 2000);
  }

  function handleInput(event) {
    setInputtext(event.target.value);
    if (event.target.value != "") {
      inputDataget(event.target.value);
    }

    if (event.target.value == "") {
      showdata();
    }
  }

  async function showdata() {
    let getObj = {};
    if (category != "all") {
      getObj["category"] = category;
    }
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_URL,
        params: getObj,
      });
      let sorthightolow;
      if (pricesort == "high to low") {
        sorthightolow = data.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (pricesort == "low to high") {
        sorthightolow = data.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        sorthightolow = data;
      }

      let ratingshow;

      if (ratingsort == "4 and above") {
        ratingshow = sorthightolow.filter((ele) => {
          if (ele.rating.rate >= 4) {
            return ele;
          }
        });
      } else if (ratingsort == "3 and above") {
        ratingshow = sorthightolow.filter((ele) => {
          if (ele.rating.rate >= 3) {
            return ele;
          }
        });
      } else if (ratingsort == "2 and above") {
        ratingshow = sorthightolow.filter((ele) => {
          if (ele.rating.rate >= 2) {
            return ele;
          }
        });
      } else {
        ratingshow = sorthightolow;
      }
      // console.log(data);
      dispatch({ type: "SUCCESS", payload: ratingshow });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  }

  useEffect(() => {
    setSearch((prevSearch) => {
      const newSearch = new URLSearchParams(prevSearch);
      newSearch.set("category", category);
      return newSearch;
    });
    showdata();
  }, [category, pricesort, ratingsort]);

  if (loading) {
    return <Loding />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <select
        value={category}
        onChange={handlechange}
        className={style.productselect}
      >
        <option value="all">All</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
      </select>
      <select
        value={pricesort}
        onChange={handlechangePrice}
        className={style.productselect}
      >
        <option value="Price">Price</option>
        <option value="high to low">high to low</option>
        <option value="low to high">low to high</option>
      </select>
      <select
        value={ratingsort}
        onChange={handlechangerating}
        className={style.productselect}
      >
        <option value="Rating">Rating</option>
        <option value="4 and above">4 and above</option>
        <option value="3 and above">3 and above</option>
        <option value="2 and above">2 and above</option>
      </select>
      <input
        type="text"
        placeholder="enter title of the product"
        className={style.inputstyle}
        value={inputtext}
        onChange={handleInput}
      />
      <div className={style.stylediv}>
        {data.length > 0 &&
          data.map((ele) => {
            return <Singleproduct key={ele.id} {...ele} />;
          })}
      </div>
      ;
    </div>
  );
};

export default Products;
