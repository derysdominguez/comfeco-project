import React, { useState, useContext } from 'react';
import Login from './Login';
import Register from './Register';
import '../../assets/styles/views/Auth.css';
import AuthContext from '../../auth/AuthContext';

const Auth = () => {
  const { autenticado } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  console.log(autenticado);
  return (
    <>
      <div className='fade-in animated Auth'>
        <div className='Auth__container'>
          {showLogin && <Login changePage={setShowLogin} />}
          {!showLogin && <Register changePage={setShowLogin} />}
        </div>
      </div>
    </>
  );
};

export default Auth;
