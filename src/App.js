import React from 'react';
import { ToastContainer } from 'react-toastify';
import ThemeConfig from './theme/themeConfig';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const App = () => {
  return (
    <ThemeConfig>
      <ToastContainer
          autoClose={5000}
          position="top-right"
          theme="light"
          hideProgressBar={false}
          style={{ width: "auto" }}
        />
      <Router />
    </ThemeConfig>
  );
};

export default App;
