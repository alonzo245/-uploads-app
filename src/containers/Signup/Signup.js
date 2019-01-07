import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import './Signup.scss';

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        class: 'form-control',
        elementConfig: {
          type: 'email',
          placeholder: 'What\'s youe Email'
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
        class: 'form-control',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter a password'
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
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      true
    );
  }

  componentDidMount() {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {

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
        elementClass={formElement.config.class}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className="Signup">
        <div className="signup__container">
          <div className="container__child signup__form">
            <h4 className="title">Signup</h4>
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                {authRedirect}
                {errorMessage}
                {form}
              </div>
              <div className="m-t-lg">
                <ul className="list-inline">
                  <li>
                    <input className="btn btn--form" type="submit" value="Register" />
                  </li>
                  <li>
                    <Link className="signup__link" to="/">I'm already a member</Link>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
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
    onAuth: (email, password, isSignup) => dispatch(
      actions.auth(email, password, isSignup
      )),
    onSetAuthRedirectPath: () => dispatch(
      actions.setAuthRedirectPath('/')
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);