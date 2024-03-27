import axios from "axios";
import React, { useContext } from "react";
import { useReducer } from "react";
import { Authcontext } from "../Context/Authcontextprovider";
import Loding from "../Extracomponents/Loding";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import style from "../Css/Login.module.css";
import { useToast } from "@chakra-ui/react";
import { Navigate, redirect } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
  loading: false,
  error: false,
};

function formreducer(state, { type, payload }) {
  switch (type) {
    case "EMAIL": {
      return {
        ...state,
        email: payload,
      };
    }

    case "PASSWORD": {
      return {
        ...state,
        password: payload,
      };
    }

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
        loading: false,
        error: false,
      };
    }

    case "RESET": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

const Login = () => {
  const toast = useToast();
  const { login } = React.useContext(Authcontext);
  const [formdata, dispatch] = useReducer(formreducer, initialState);

  const { email, password, loading, error } = formdata;

  function handleLogin() {
    toast({
      title: "Login Successfull",
      description: "Go to the product Section to purchase items .",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  function handleError(){
    toast({
      title: "Invalid Credentials.",
      description: "Go to Login page again.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  function handleLost(){
    toast({
      title: 'Email and Password can not be empty',
      description: "Fill out credentials properly.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if(email == "" || password == ""){
      handleLost();
      return;
    }
    let obj = { email: email, password: password };
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: obj,
      });
      // console.log(data);
      dispatch({ type: "SUCCESS" });
      login(data.token);
      dispatch({ type: "RESET" });
      handleLogin();
    } catch (error) {
      dispatch({ type: "ERROR" });
      handleError();
    }
  }

  if (loading) {
    return <Loding />;
  }

  if (error) {
    return <Navigate to ="/error" />;
  }

  return (
    <div className={style.logindiv}>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          style={{ marginTop: "40px" }}
          placeholder="email"
          value={formdata.email}
          onChange={(e) => {
            dispatch({ type: "EMAIL", payload: e.target.value });
          }}
        />
        <Input
          type="password"
          style={{ marginTop: "40px" }}
          placeholder="password"
          value={formdata.password}
          onChange={(e) => {
            dispatch({ type: "PASSWORD", payload: e.target.value });
          }}
        />
        <div>
          <Button
            style={{ marginTop: "20px" }}
            colorScheme="blue"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
