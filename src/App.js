import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';
import Uploads from './containers/Uploads/Uploads';
import Signup from './containers/Signup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import './App.scss';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Route path="/signup" component={Signup} />
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/uploads" component={Uploads} />
        </Switch>
      );
    }
    return (
      <BrowserRouter >
        <Layout isAuth={this.props.isAuthenticated}>
          <Switch>
            <Route exact path='/' component={Uploads} />
            {routes}
            {this.props.children}
          </Switch>
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

