import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/components/communities.css";
import { getCommunities } from "../../firebase/client";

const Communities = () => {
  const [listCommunities, setListCommunities] = useState([]);

  useEffect(() => {
    getCommunities()
      .then((res) => {
        console.log(res, "comunidades");
        setListCommunities(res);
      })
      .catch((error) => {
        console.log(error, "error -- ");
      });
  }, []);

  return (
    <aside className="communities">
      <div className="communities__header">
        <h5>Comunidades</h5>
        <Link to="/comunidades">Ver más</Link>
      </div>
      <div className="list__body">
        {listCommunities.map((community) => (
          <div className="list__body--group">
            <div className="box-name">
              <img src={community.imagen} alt={community.nombre} />
              <h5>{community.nombre}</h5>
            </div>
            <a href={community.unirme} className="link-unirme">Unirme</a>
            {/*                         <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(this.makeHref("route"));}} />
             */}{" "}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Communities;
