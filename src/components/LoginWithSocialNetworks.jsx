import React from 'react';
import {
  loginWithGoogle,
  logOut,
  onAuthStateChanged,
  loginWithFacebook,
  } from '../firebase/client';
import '../assets/styles/views/Login.css';

const LoginWithSocialNetworks = () => {

  const handleClickGoogle = () => {
    loginWithGoogle()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickFacebook = () => {
    loginWithFacebook()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        type='button'
        className='form__button_other'
        onClick={handleClickFacebook}
      >
        Ingresar con Facebook
      </button>
      <button
        type='button'
        className='form__button_other'
        onClick={handleClickGoogle}
      >
        Ingresar con Google
      </button>
    </div>
  );
};

export default LoginWithSocialNetworks;
