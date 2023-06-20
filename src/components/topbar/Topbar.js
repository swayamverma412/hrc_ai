import React from 'react';
import './Topbar.css';
import abcLogo from '../../assests/images/abclogo.svg';
import highradiusLogo from '../../assests/images/hrclogo.svg';

const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbar__logo_one">
          <img src={abcLogo} alt="ABC Product Logo" />
        </div>
        <div className="topbar__logo_two">
          <img src={highradiusLogo} alt="Highradius Logo" />
        </div>
        <div>
          <p>                                                                        </p>
        </div>
    </div>
  );
};

export default Topbar;
