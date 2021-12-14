import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './authReducer';
import {
  loginWithGoogle,
  logOut,
  onAuthStateChanged,
  loginWithFacebook,
  createUserWithEmail,
  userActive,
  createUserProfile,
  getUserProfile,
  signInWithEmail,
  auth,
  dateCreateUserProfile,
  updatePasword,
  db,
  storage,
  updateStatusprofile,
} from '../firebase/client';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  VALIDATE_PASSWORD_ERROR,
  VALIDATE_PASSWORD_EXITOSO,
  UPDATE_PASSWORD_EXITOSO,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PROFILE_EXITOSO,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SHOW,
  UPDATE_PROFILE_HIDE,

} from '../types/types';

const AuthState = ({ children }) => {
  const initialState = {
    // token: localStorage.getItem('token'),
    authReady: false,
    autenticado: false,
    usuario: null,
    mensaje: null,
    updateProfile: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Crear coleccion de perfil de usuario
  const addUserCollection = async (datos) => {
    const user = await userActive();
    const { email, uid, displayName, photoURL } = user;
    if (user) {
      await createUserProfile(user.uid, {
        name: !displayName ? datos.name : displayName,
        email,
        uid,
        photoUrl: !photoURL ? '' : photoURL,
        gender: '',
        birth: '',
        country: '',
        area: '',
        facebook: '',
        github: '',
        linkedin: '',
        twitter: '',
        bibliography: '',
        group: '',
        badge: [],
        createdAt: dateCreateUserProfile(),
        state: 'Conectado',
        activity: [],
      })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: 'no estas autentificado',
      });
    }
  };

  // Usuario activo

  const usuarioAutenticado = async () => {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        return db.collection('usuarios').doc(user.uid)
          .onSnapshot((snapshot) => {
            // Add the new post to the posts list
            const dbUser = snapshot.data();
            dispatch({
              type: OBTENER_USUARIO,
              payload: {
                uid: dbUser.uid,
                name: dbUser.name,
                email: dbUser.email,
                photoUrl: dbUser.photoUrl,
                gender: dbUser.gender,
                birth: dbUser.birth,
                country: dbUser.country,
                area: dbUser.area,
                facebook: dbUser.facebook,
                github: dbUser.github,
                linkedin: dbUser.linkedin,
                twitter: dbUser.twitter,
                bibliography: dbUser.bibliography,
                group: dbUser.group,
                badge: dbUser.badge,
                createdAt: dbUser.createdAt,
                state: dbUser.state,
                activity: dbUser.activity,
              },
            });
            dispatch({
              type: REGISTRO_EXITOSO,
            });

          }
          , (error) => {
            console.error('Error writing document: ', error);
          });
        // .then((snapshot) => {
        //   const dbUser = snapshot.data();
        //   dispatch({
        //     type: OBTENER_USUARIO,
        //     payload: {
        //       uid: dbUser.uid,
        //       name: dbUser.name,
        //       email: dbUser.email,
        //       photoUrl: dbUser.photoUrl,
        //       gender: dbUser.gender,
        //       birth: dbUser.birth,
        //       country: dbUser.country,
        //       area: dbUser.area,
        //       facebook: dbUser.facebook,
        //       github: dbUser.github,
        //       linkedin: dbUser.linkedin,
        //       twitter: dbUser.twitter,
        //       bibliography: dbUser.bibliography,
        //       createdAt: dbUser.createdAt,
        //     },
        //   });
        //   dispatch({
        //     type: REGISTRO_EXITOSO,
        //   });
        // })
        // .catch((error) => {
        //   console.error('Error writing document: ', error);
        // });
      }
      if (!user) {
        return dispatch({
          type: LOGIN_ERROR,
          payload: null,
        });
      }
    });
  };

  const registrarUsuario = async (datos) => {
    try {
      await createUserWithEmail(datos.email, datos.password);
      //Crear la colección de usuarios
      addUserCollection(datos);
      //Obtener el usuario
      usuarioAutenticado();
      dispatch({
        type: REGISTRO_EXITOSO,
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'Password should be at least 6 characters') {
        dispatch({
          type: REGISTRO_ERROR,
          payload: 'La contraseña debe tener al menos 6 caracteres',
        });
      } else {
        dispatch({
          type: REGISTRO_ERROR,
          payload: error.message,
        });
      }

    }
  };

  //Cuando el usuario inicia sesión
  const iniciarSesion = async (datos) => {
    try {
      await signInWithEmail(datos.email, datos.password);
      //Obtener el usuario
      usuarioAutenticado();
      dispatch({
        type: LOGIN_EXITOSO,
      });
    } catch (error) {
      if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        dispatch({
          type: LOGIN_ERROR,
          payload: 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.',
        });
      } else if (error.message === 'The password is invalid or the user does not have a password.') {
        dispatch({
          type: LOGIN_ERROR,
          payload: 'La contraseña no es válida o el usuario no tiene contraseña.',
        });
      } else if (error.message === 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
        dispatch({
          type: LOGIN_ERROR,
          payload: 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde.',
        });
      } else {
        console.log(error.message);
      }
    }

  };

  const validateCurrentPassword = async (email, password) => {
    try {
      await signInWithEmail(email, password);
      dispatch({
        type: VALIDATE_PASSWORD_EXITOSO,
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        dispatch({
          type: VALIDATE_PASSWORD_ERROR,
          payload: 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.',
        });
      } else if (error.message === 'The password is invalid or the user does not have a password.') {
        dispatch({
          type: VALIDATE_PASSWORD_ERROR,
          payload: 'La contraseña no es válida o el usuario no tiene contraseña.',
        });
      } else if (error.message === 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
        dispatch({
          type: VALIDATE_PASSWORD_ERROR,
          payload: 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde.',
        });
      } else {
        dispatch({
          type: VALIDATE_PASSWORD_ERROR,
          payload: error.message,
        });

      }
    }

  };
  //Cuando el usuario registra i inicia sesion con google
  const loginGoogle = async () => {
    await loginWithGoogle()
      .then((user) => {
        if (user.additionalUserInfo.isNewUser === true) {
          //Crear la colección de usuarios;
          addUserCollection();
        }
        //Obtener el usuario
        usuarioAutenticado();
        dispatch({
          type: REGISTRO_EXITOSO,
        });

      })
      .catch((error) => {
        dispatch({
          type: REGISTRO_ERROR,
          payload: error.message,
        });
      });
  };

  //Cuando el usuario registra i inicia sesion con google
  const loginFacebook = async () => {
    await loginWithFacebook()
      .then((user) => {
        dispatch({
          type: REGISTRO_EXITOSO,
        });
        if (user.additionalUserInfo.isNewUser === true) {
          //Crear la colección de usuarios
          addUserCollection();
        }
        //Obtener el usuario
        usuarioAutenticado();
      })
      .catch((error) => {
        dispatch({
          type: REGISTRO_ERROR,
          payload: error.message,
        });
      });
  };

  const updatePasswordFirebase = async (newPassword) => {
    await updatePasword(newPassword)
      .then((user) => {
        dispatch({
          type: UPDATE_PASSWORD_EXITOSO,
        });
        alert('Tu contraseña se ha editado correctamente');
      })
      .catch((error) => {
        if (error.message === 'Password should be at least 6 characters') {
          dispatch({
            type: UPDATE_PASSWORD_ERROR,
            payload: 'La contraseña debe tener al menos 6 caracteres',
          });
        } else if (error.message === 'This operation is sensitive and requires recent authentication. Log in again before retrying this request.') {
          dispatch({
            type: UPDATE_PASSWORD_ERROR,
            payload: 'Esta operación es sensible y requiere autenticación reciente. Vuelva a iniciar sesión antes de volver a intentar esta solicitud.',
          });
        } else {
          dispatch({
            type: UPDATE_PASSWORD_ERROR,
            payload: error.message,
          });
        }
      });
  };

  const showUpdateProfile = () => {
    dispatch({
      type: UPDATE_PROFILE_SHOW,
    });
  };
  const hideUpdateProfile = () => {
    dispatch({
      type: UPDATE_PROFILE_HIDE,
    });
  };
  //Cierra la sesión del usuario
  const cerrarSesion = () => {
    logOut().then(() => {
      dispatch({
        type: CERRAR_SESION,
      });
    });

  };
  return (
    <AuthContext.Provider
      value={{
        // token: state.token,
        authReady: state.authReady,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        updateProfile: state.updateProfile,
        registrarUsuario,
        iniciarSesion,
        validateCurrentPassword,
        usuarioAutenticado,
        cerrarSesion,
        loginGoogle,
        loginFacebook,
        updatePasswordFirebase,
        showUpdateProfile,
        hideUpdateProfile,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
