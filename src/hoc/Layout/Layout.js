import React, { Component } from 'react';
import './Layout.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import LoginForm from '../../containers/Auth/LoginForm/LoginForm';

class Layout extends Component {
  state = {
    themeToggler: false,
    showSideDrawer: false,
    loginIn: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  toggleThemeHandler = () => {
    let toggle = !this.state.themeToggler;

    if (toggle) {
      document.body.classList.add('Dark');
      this.setState({
        themeToggler: toggle
      });
    } else {
      document.body.classList.remove('Dark');
      this.setState({
        themeToggler: toggle
      });
    }
  }

  loginInCancelHandler = () => {
    this.setState({ loginIn: false });
  }

  loginHandler = () => {
    this.setState({ loginIn: true });
  }

  render() {
    return (
      <div className="Layout">
        <Modal
          show={this.state.loginIn}
          modalClosed={this.loginInCancelHandler}
        >
          <LoginForm modalClosed={this.loginInCancelHandler} />
        </Modal>

        <SideDrawer
          login={this.loginHandler}
          toggleTheme={this.toggleThemeHandler}
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />

        <Header
          isAuth={this.props.isAuth}
          login={this.loginHandler}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        // {...this.props}
        />
        {this.props.children}
        <Footer />
      </div>
    )
  }

}

export default Layout;

