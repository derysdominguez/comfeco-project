import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../auth/AuthContext";
import Avatar from "../../components/Avatar";
import UpdateProfile from "../../components/perfil/UpdateProfile";
import EventsProfile from "../../components/perfil/EventsProfile";
import { getBadgeSpecific } from "../../firebase/client";
import Activity from "../../components/perfil/Activity";

const Perfil = () => {
  const { usuario, updateProfile, showUpdateProfile } = useContext(AuthContext);
  const [listBadge, setListBadge] = useState([]);

  useEffect(() => {
    if (usuario.badge.indexOf("insignia_1") >= 0) {
      getBadgeSpecific("insignia_1")
        .then((res) => {
          setListBadge(res);
        })
        .catch((error) => {
          console.log(error, "error al mostrar insignias");
        });
    }
  }, []);

  return (
    <div className=" fade-in animated container-comfeco">
      <div className="box-perfil">
        {updateProfile === false ? (
          <>
            <div className="box-user bg-user">
              <div className="box-info-user">
                <a
                  className="link-editar link-ancor"
                  onClick={showUpdateProfile}
                >
                  Editar Perfil
                </a>
                <div className="circle-user">
                  {usuario.photoUrl === "" ? (
                    <Avatar size="large" />
                  ) : (
                    <img src={usuario.photoUrl} className="user-img" />
                  )}
                </div>
                <h2 className="user-name">{usuario.name}</h2>
                <h4 className="user-area">{usuario.area}</h4>
                <span />
                <p>{usuario.bibliography}</p>
                {usuario.facebook !== "" ||
                usuario.github !== "" ||
                usuario.linkedin !== "" ||
                usuario.twitter !== "" ? (
                  <div className="box-redes-user">
                    {usuario.facebook !== "" && (
                      <a
                        href={`https://www.facebook.com/${usuario.facebook}`}
                        className="redes-user"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    )}
                    {usuario.github !== "" && (
                      <a
                        href={`https://github.com/${usuario.github}`}
                        className="redes-user"
                        target="_blank"
                      >
                        <i className="fab fa-github" />
                      </a>
                    )}
                    {usuario.linkedin !== "" && (
                      <a
                        href={`https://www.linkedin.com/in/${usuario.linkedin}`}
                        className="redes-user"
                        target="_blank"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    )}
                    {usuario.twitter !== "" && (
                      <a
                        href={`https://twitter.com/${usuario.twitter}`}
                        className="redes-user"
                        target="_blank"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="box-centro">
              <div className="box-centro-insignia">
                <h4 className="user-name"> Mis insignias</h4>
                {usuario.badge.length === 0 ? (
                  <p>Actualmente no cuentas con ninguna insignia</p>
                ) : (
                  <div className="box-all-insignias">
                    {listBadge.map((badge, key) => (
                      <div className="box-insignia" key={key}>
                        <img src={badge.image} className="insignia-img" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="box-centro-actividad">
                <h4 className="user-name"> Actividad reciente</h4>
                <div className="box-all-activity">
                  {usuario.activity.length > 0 ? (
                    usuario.activity.map((item, key) => {
                      return (
                        <Activity
                          key={key}
                          type={item.type}
                          title={item.title}
                          message={item.message}
                          color={item.color}
                          time={item.time}
                        />
                      );
                    })
                  ) : (
                    <div className="no-activites">
                      <div className="box-activities">
                        {" "}
                        <span className="emoticon">
                          {" "}
                          <i className="far fa-frown-open fa-5x" />
                        </span>
                        <p>
                          Lastimosamente aún no tienes actividad, ¿qué tal si
                          navegas un poco?
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="box-user bg-user">
              <EventsProfile />
            </div>
          </>
        ) : (
          <UpdateProfile />
        )}
      </div>
    </div>
  );
};

export default Perfil;
