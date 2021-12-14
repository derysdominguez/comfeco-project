import React, { useState } from "react";

import Nav from "react-bootstrap/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Perfil from "./Perfil";
import Insignias from "./Insignias";
import Grupos from "./Grupos";
import Eventos from "./Eventos";
import "../../assets/styles/views/Perfil.css";

const index = () => {
  const [key, setKey] = useState("perfil");
  return (
    <div className="fade-in animated container-comfeco">
      <div className="submenu">
        <Tabs
          justify
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="perfil"
            title={
              <i className="far fa-user">
                {" "}
                <span className="title">Mi Perfil</span>
              </i>
            }
          >
            <Perfil />
          </Tab>
          <Tab
            eventKey="insignia"
            title={
              <i className="fas fa-award">
                {" "}
                <span className="title">Insignias</span>
              </i>
            }
          >
            <Insignias />
          </Tab>
          <Tab
            eventKey="grupos"
            title={
              <i className="fas fa-users">
                {" "}
                <span className="title">Grupos</span>
              </i>
            }
          >
            <Grupos />
          </Tab>
          <Tab
            eventKey="eventos"
            title={
              <i className="fas fa-calendar-week">
                {" "}
                <span className="title">Eventos</span>
              </i>
            }
          >
            <Eventos />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default index;
