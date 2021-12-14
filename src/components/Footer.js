import React from 'react';
import '../assets/styles/components/Footer.css';
import logo from '../assets/img/Logo2.png';

const Footer = () => {
  return (
    <div className='container-comfeco'>
      <div className='footer '>
        <div>texto texto texto texto texto texto texto texto texto</div>
        <div>
          <img src={logo} className='logo-footer' alt='logo' />
        </div>
        <div className='box-redes'>
          <div>
            <i className='fab fa-facebook-f' />
          </div>
          <div>
            <i className='fab fa-youtube' />
          </div>
          <div>
            <i className='fab fa-github' />
          </div>
          <div>
            <i className='fab fa-instagram' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
