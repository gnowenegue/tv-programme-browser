import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, TvShowDetail } from '.';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tv/:id" component={TvShowDetail} />
      <Redirect to="/" />
    </Switch>
  </main>
);

export default App;
