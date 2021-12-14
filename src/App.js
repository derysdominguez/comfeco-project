import React, { useReducer, useEffect, useContext } from 'react';
import AppRouter from './routes/AppRouter';
import AuthState from './auth/AuthState';

const App = () => {

  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
};

export default App;
