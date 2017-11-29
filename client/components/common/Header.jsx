import React from 'react';

import Navbar from './Navbar';
import SideNav from './SideNav';

const Header = props => (
  <header>
    <Navbar {...props} />
    <SideNav />
  </header>
);

export default Header;
