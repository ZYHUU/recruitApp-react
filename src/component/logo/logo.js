import React, { Component } from "react";
import "./logo.css";
import logoImg from "./job.png";

class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt="" />
      </div>
    );
  }
}

export default Logo;
