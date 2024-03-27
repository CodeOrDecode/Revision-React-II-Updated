import React from "react";
import style from "../Css/Process.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const navigate = useNavigate();

  function handleProcess() {
    setTimeout(() => {
      navigate("/conformation");
    }, 3000);
  }

  useEffect(() => {
    handleProcess();
  }, []);

  return (
    <div className={style.processdiv}>
      <img
        className={style.imageprocess}
        src="https://aceyourpaper.com/essays/public/images/loader.gif"
        alt=""
      />
      <p className={style.processp}>Processing.......</p>
    </div>
  );
};

export default Processing;
