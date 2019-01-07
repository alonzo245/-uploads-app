import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Uploads from './containers/Uploads/Uploads';
import Signup from './containers/Signup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import HomePage from './containers/HomePage/HomePage';
import './App.scss';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route exact path='/' component={Uploads} />
        </Switch>
      );
    }
    return (
      <BrowserRouter >
        <Layout isAuth={this.props.isAuthenticated}>
          {routes}
          {this.props.children}
        </Layout>
      </BrowserRouter >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

