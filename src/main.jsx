import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Authcontextprovider from "./Context/Authcontextprovider.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Authcontextprovider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Authcontextprovider>
  </BrowserRouter>
);
