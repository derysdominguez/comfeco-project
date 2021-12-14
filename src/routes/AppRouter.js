import React, { useReducer, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../views/Home";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import AuthContext from "../auth/AuthContext";
import RecoveryPass from "../views/Auth/RecoveryPass";
import NewPassword from "../views/Auth/NewPassword";
import RutaPrivada from "./PrivateRoute";
import RutaPublica from "./PublicRoute";
import Perfil from "../views/Perfil";
import Workshop from "../views/Workshop/Workshop";
import Comunities from "../views/Comunities/Comunities";
import Creators from "../views/Creators/Creators";
import TerminosYcondiciones from "../views/TerminosYCondiciones/TerminosYcondiciones";
import PoliticasPrivacidad from "../views/PoliticasPrivacidad/PoliticasPrivacidad";

// import CarouselContainer from '../views/Home/CarouselContainer';

const AppRouter = () => {
  const { autenticado, usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Header />
      <Switch>
        <RutaPrivada exact path="/" component={Home} />
        <RutaPublica exact path="/login" component={Login} />
        <RutaPublica exact path="/signup" component={Register} />
        <RutaPublica exact path="/recovery-pass" component={RecoveryPass} />
        <RutaPublica exact path="/new-pass" component={NewPassword} />
        <RutaPrivada exact path="/perfil" component={Perfil} />
        <RutaPrivada exact path="/comunidades" component={Comunities} />
        <RutaPrivada exact path="/talleres" component={Workshop} />
        <RutaPrivada
          exact
          path="/creadores-de-contenido"
          component={Creators}
        />
         <RutaPublica exact path="/terminos-y-condiciones" component={TerminosYcondiciones} />
         <RutaPublica exact path="/politicas-de-privacidad" component={PoliticasPrivacidad} />

        {/* <Route exact path="/caru" component={CarouselContainer} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
