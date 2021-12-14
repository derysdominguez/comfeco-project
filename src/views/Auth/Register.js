import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import '../../assets/styles/views/Login.css';
import fondo from '../../assets/img/fondo.png';

const Register = () => {
  //extraer los valores del context
  const authContext = useContext(AuthContext);
  const {
    mensaje,
    autenticado,
    registrarUsuario,
    loginGoogle,
    loginFacebook,
  } = authContext;
  const [errorMessage, setErrorMessage] = useState({
    message: '',
    type: '',
  });
  const history = useHistory();
  // Statepara iniciar sesión
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmar: '',
  });
  const { name, email, password, confirmar } = user;
  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    password: false,
    confirmar: false,
  });
  const initialErrorMessageState = {
    mesage: '',
    type: '',
  };
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);

  //En caso que el usuario se haya autenticado / registrado o sea un registro duplicado
  useEffect(() => {

    if (mensaje) {
      setErrorMessage({
        message: mensaje,
        type: 'usuario',
      });
    }
  }, [mensaje, autenticado, history]);

  const signIn = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage({
        message: 'ingrese tu nombre',
        type: 'name',
      });
      return;
    }

    if (!email.trim()) {
      console.log('ingrese email');
      setErrorMessage({
        message: 'ingrese tu  email',
        type: 'email',
      });
      return;
    }

    if (!password.trim()) {
      setErrorMessage({
        message: 'ingrese tu password',
        type: 'password',
      });
      return;
    }
    // if (password.length < 6) {
    //   console.log('Password de 6 carácteres a más');
    //   setError('Password mayor a 6 carácteres');
    //   return;
    // }
    if (password !== confirmar) {
      setErrorMessage({
        message: 'No coinciden las contraseñas',
        type: 'confirmar',
      });
      return;
    }

    if (password === confirmar) {
      registrarUsuario({
        name,
        email,
        password,
      });
    }
    setError(null);

  };
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickGoogle = () => {
    loginGoogle()
      .then((user) => {
        console.log(user);
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickFacebook = () => {
    loginFacebook()
      .then((user) => {
        console.log(user);
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='fade-in animated bg-img'>
      <div className='Recovery container-comfeco'>
        <div className='box-middle'>
          <div className='Recovery__container'>

            <div className='Login'>
              <h1 className='Login__title'>
                <span className='title__message title mt-4'>
                  ¡Aquí podrás registrarte!
                </span>
              </h1>
              <form className='Login__form' onSubmit={signIn}>
                {errorMessage.message ? (
                  <div className='error-msj'>{errorMessage.message}</div>
                ) : (
                  ''
                )}
                <div className='form__group'>
                  <label htmlFor='name' className='form__label'>
                    Nick:
                  </label>
                  <input
                    name='name'
                    type='name'
                    value={user.name}
                    className='form__input'
                    onChange={handleInputChange}
                    ref={autoFocus}
                    className={errorMessage.type === 'name' ? 'error' : ''}
                  />
                </div>
                <div className='form__group'>
                  <label htmlFor='email' className='form__label'>
                    Email:
                  </label>
                  <input
                    // style={{ opacity: 0, position: absolute }}
                    name='email'
                    type='email'
                    value={user.email}
                    className='form__input'
                    onChange={handleInputChange}
                    autoComplete='new-password'
                    className={errorMessage.type === 'email' ? 'error' : ''}
                  />
                </div>
                <div className='form__group'>
                  <label htmlFor='password' className='form__label'>
                    Contraseña:
                  </label>
                  <input
                    name='password'
                    type='password'
                    value={user.password}
                    className='form__input'
                    onChange={handleInputChange}
                    autoComplete='new-password'
                    className={errorMessage.type === 'password' ? 'error' : ''}
                  />
                </div>
                <div className='form__group'>
                  <label htmlFor='password' className='form__label'>
                    Confirmar Contraseña:
                  </label>
                  <input
                    name='confirmar'
                    type='password'
                    className='form__input'
                    onChange={handleInputChange}
                    className={errorMessage.type === 'confirmar' ? 'error' : ''}
                  />
                </div>
                <div className='form__group'>
                  <button
                    type='submit'
                    className='form__button'
                  >
                    Registrarse
                  </button>
                  <label className='form__register'>
                    Ya tienes cuenta? Inicia sesión
                    {' '}
                    <Link to='/login' type='button'>
                      aquí.
                    </Link>
                  </label>
                </div>
              </form>
              <div>
                <div className='social__group'>
                  <button
                    type='button'
                    className='form__button_other loginBtn--facebook'
                    onClick={handleClickFacebook}
                  >
                    Ingresar con Facebook
                  </button>
                  <button
                    type='button'
                    className='form__button_other loginBtn--google'
                    onClick={handleClickGoogle}
                  >
                    Ingresar con Google
                  </button>
                </div>
                <div className='form__check'>
                  <span className='form__check_s'>
                    Al registrarte estas aceptando los
                    <Link to='/terminos-y-condiciones'>Términos y Condiciones</Link>
                    y la
                    <Link to='/politicas-de-privacidad'>
                      {' '}
                      Política de privacidad y protección de datos
                    </Link>
                    de COMFECO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
