import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './homepage/Home';
import '../public/style.scss';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
