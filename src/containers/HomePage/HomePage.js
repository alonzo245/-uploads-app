import React, { Component } from 'react';
import './HomePage.scss';
import Modal from '../../components/UI/Modal/Modal';
import LoginForm from '../../containers/Auth/LoginForm/LoginForm';

class HomePage extends Component {

  render() {
    return (
      <React.Fragment>
        <Modal show={true}>
          <LoginForm modalClosed={this.loginInCancelHandler} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default HomePage;