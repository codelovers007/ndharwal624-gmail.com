import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import {Layout} from './components/common/Layout.js';
// import {HomePage} from './home';
import {Movies} from './movies/index.js';
import {Peoples} from './people/index.js';
import {Movie} from './movies/detail.js';
import { Container } from 'semantic-ui-react'

export default class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <Layout>
          <Route exact path="/" component={Movies} />
          <Route path="/people" component={Peoples} />
          <Route path="/movies/:movieId" component={Movie} />
        </Layout>
      </Container>
    );
  }
}
