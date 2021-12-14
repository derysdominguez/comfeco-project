import React, { useState, useCallback } from 'react';
import '../../assets/styles/views/RecoveryPass.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sendRecoverPassword } from '../../firebase/client';
import calm from '../../assets/img/calm.svg';

const RecoveryPass = () => {
  const [email, setEmail] = useState('');
  const MySwal = withReactContent(Swal);
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);
  const recoverPassword = (e) => {
    e.preventDefault();
    sendRecoverPassword(email)
      .then(() => {
        MySwal.fire({
          title:
            '¡Ya enviamos un correo para recuperar tu contraseña, revisa tu bandeja de entrada!',
          icon: 'success',
          showConfirmButton: false,
          timer: 3500,
        });
        setEmail('');
      })
      .catch((error) => {
        if (
          error.message ===
          'We have blocked all requests from this device due to unusual activity. Try again later.'
        ) {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text:
              'Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.',
          });
        } else if (
          error.message ===
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text:
              'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.',
          });
        } else if (error.message ===
          'The email address is badly formatted.') {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text:
              'La dirección de correo electrónico está mal formateada.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text: error.message,
          });
        }
        setEmail('');
      });
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className='fade-in animated Recovery container-comfeco'>
      <div className='box-middle'>
        <div className='Recovery__container'>

          <img src={calm} className='img-calm' />
          <h1 className='Recovery__title'>
            <span className=' title title_hola_rc'>
              <i className='far fa-smile-beam' />
              {' '}
              Calma,
            </span>
            <span className=' title title__message_rc'>
              {' '}
              recuperaremos tu clave!
            </span>
          </h1>
          <form className='Recovery__form' onSubmit={recoverPassword}>
            <div className='form__group_rc'>
              <label htmlFor='email' className='form__label_rc'>
                Ingresa tu correo:
              </label>
              <input
                name='email'
                value={email}
                type='email'
                className='form__input_rc'
                onChange={handleInputChange}
                ref={autoFocus}
                required
              />
            </div>

            <div className='form__group_rc'>
              <button
                type='submit'
                className='form__button_rc form__button'
              >
                Recuperar contraseña
              </button>
            </div>
          </form>
          <p className='form__relogin_rc'>
            si ya recordaste tu cuenta, ingresa
            <a href='/login'> aquí.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPass;
