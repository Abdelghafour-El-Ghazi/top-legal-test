import React from "react";
import logo from "../../images/logo.png";
import "./AppBar.css";

const AppBar = () => {
  return (
    <div className='appbar'>
      <img src={logo} alt='appbar'></img>
    </div>
  );
};

export default AppBar;
