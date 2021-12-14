
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

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        authReady: true,
        autenticado: true,
        mensaje: null,
        updateProfile: false,
      };
    case LOGIN_EXITOSO:
    case VALIDATE_PASSWORD_EXITOSO:
      return {
        ...state,
        authReady: true,
        autenticado: true,
        mensaje: null,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        authReady: true,
        autenticado: true,
        usuario: action.payload,
        mensaje: null,
        updateProfile: false,
      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      return {
        ...state,
        // token:null,
        authReady: true,
        usuario: null,
        autenticado: false,
        mensaje: action.payload,
        updateProfile: false,
      };
    case UPDATE_PASSWORD_EXITOSO:
    case UPDATE_PROFILE_EXITOSO:
      return {
        ...state,
        authReady: true,
        autenticado: true,
        updateProfile: true,
        mensaje: null,
      };
    case VALIDATE_PASSWORD_ERROR:
    case UPDATE_PASSWORD_ERROR:
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        authReady: true,
        autenticado: true,
        updateProfile: true,
        mensaje: action.payload,
      };
    case UPDATE_PROFILE_SHOW:
      return {
        ...state,
        updateProfile: true,
      };
    case UPDATE_PROFILE_HIDE:
      return {
        ...state,
        updateProfile: false,
      };
    default:
      return state;
  }

};
