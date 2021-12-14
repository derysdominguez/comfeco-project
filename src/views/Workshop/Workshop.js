import React from "react";
import logo from "../../assets/img/logo3.png";

const Workshop = () => {
  return (
    <div className="fade-in animated container-comfeco">
      <div className="box-building title">
        <figure className="logo-build">
          <img src={logo} className="w-100" />
        </figure>
        Estamos construyendo esta sección <br></br>
          "Talleres"
      </div>
    </div>
  );
};

export default Workshop;
