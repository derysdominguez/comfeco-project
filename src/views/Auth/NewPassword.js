import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/styles/views/RecoveryPass.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { recoveryPass, verifyPasswordResetCode } from '../../firebase/client';

const NewPassword = () => {
  const [newPass, setNewPass] = useState('');
  const [verifyCode, setVerifyCode] = useState(null);
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const MySwal = withReactContent(Swal);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('oobCode');
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);

  const newPassword = (e) => {
    e.preventDefault();
    recoveryPass(code, newPass)
      .then(() => {
        MySwal.fire({
          title: 'Tu contraseña se actualizó correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3500,
        });
        setNewPass('');
      })
      .catch((error) => {
        if (error.message === 'Password should be at least 6 characters') {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text: 'La contraseña debe tener al menos un error de 6 caracteres.',
          });
        } else if (error.message === 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.') {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text: 'El código de acción no es válido. Esto puede suceder si el código está mal formado, caducado o ya se ha utilizado',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text: error.message,
          });
        }
        setNewPass('');
      });
  };
  useEffect(() => {
    verifyPasswordResetCode(code)
      .then((email) => {
        setVerifyCode(true);
      })
      .catch((e) => {
        setVerifyCode(false);
        if (e.message === 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.') {
          setCodeErrorMessage('El código de acción no es válido. Esto puede suceder si el código está mal formado, caducado o ya se ha utilizado');
        } else {
          setCodeErrorMessage(e.message);
          console.log(e.message);
        }
      });
  }, []);

  const handleInputChange = (e) => {
    setNewPass(e.target.value);
  };
  return (
    <div className='fade-in animated Recovery container-comfeco'>
      <div className='box-middle'>

        <div className='Recovery__container '>
          <h1 className='Recovery__title'>
            <span className='title_hola_rc'>Establecer nueva contraseña</span>
          </h1>
          {
            !verifyCode ?
              <p className='Recovery__error'>{codeErrorMessage}</p> : (
                <form className='Recovery__form' onSubmit={newPassword}>
                  <div className='form__group_rc'>
                    <label htmlFor='email' className='form__label_rc'>
                      Ingresa tu nueva contraseña:
                    </label>
                    <input
                      name='password'
                      value={newPass}
                      type='password'
                      className='form__input_rc'
                      onChange={handleInputChange}
                      ref={autoFocus}
                      required
                    />
                  </div>

                  <div className='form__group_rc'>
                    <button type='submit' className='form__button_rc'>
                      Establecer nueva contraseña
                    </button>
                  </div>
                </form>
              )
          }
          <p className='form__relogin_rc'>
            si ya recordaste tu cuenta, ingresa
            <a href='/login'> aquí.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
