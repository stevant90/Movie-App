import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from './Common/header';
import MoviesPage from './Movies/moviesPage';
import SingleMoviePage from './Movies/singleMoviePage';
import { FooterComponent } from './Common/footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={MoviesPage} />
          <Route exact path='/shows/:id' component={SingleMoviePage} />
        </Switch>

        <FooterComponent />
      </div>
    );
  }
}

export default App;
