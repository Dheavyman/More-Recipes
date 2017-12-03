import React from 'react';

import Navbar from './Navbar';
import SideNav from './SideNav';

const Header = props => (
  <header>
    <div className="navbar-fixed">
      <nav className="deep-orange darken-4">
        <Navbar {...props} />
      </nav>
    </div>
    <SideNav />
  </header>
);

export default Header;
