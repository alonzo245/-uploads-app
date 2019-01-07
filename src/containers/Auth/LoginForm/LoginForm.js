import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
import './LoginForm.scss';

class LoginForm extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: 'bobo@bobo.com',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '1234567890',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }


  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, false);
  }

  componentDidMount() {
    if (this.props.authRedirectPath && this.props.isAuthenticated) {
      // this.props.modalClosed();
    }

    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  componentDidUpdate() {

  }

  render() {

    let authRedirect = null;

    if (this.props.authRedirectPath && this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    return (
      <div className="LoginForm">
        <h4 className="title">Login</h4>
        <form onSubmit={this.submitHandler} >
          {authRedirect}
          {form}
          <button className="LoginButton">Login</button>
        </form>
        <div>
          <div className="text">Not a member yet?</div>
          <Link to="/signup">Signup it free!</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, name, isSignup) => dispatch(actions.auth(email, password, name, isSignup)),
    onSetAuthRedirectPath: () => dispatch(
      actions.setAuthRedirectPath('/')
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);