import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignUpForm from './SignupForm';
import * as signupActions from '../../actions/signupActions';

class SignupPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      signupUser: Object.assign({}, this.props.signupUser), errors: {formValid: false}
    };
    this.updateSignupFormState = this.updateSignupFormState.bind(this);
    this.signup = this.signup.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  updateSignupFormState(event) {
    const field = event.target.name;
    let signupUser = this.state.signupUser;
    signupUser[field] = event.target.value;
    let errorsChanged = this.validateLoginFormControls(signupUser, field);
    return this.setState({
      signupUser: signupUser,
      errors: errorsChanged
    });
  }

  validateLoginFormControls(controls, field) {
    let errorsChanged = this.state.errors;
    errorsChanged.formValid = true;
    if (!controls.username) {
      errorsChanged.formValid = false;
      if (field === 'username') {
        errorsChanged.username = "Username must be not null.";
        return errorsChanged;
      }
    } else if (controls.username.length > 5) {
      errorsChanged.formValid = false;
      if (field === 'username') {
        errorsChanged.username = "Username is too long";
        return errorsChanged;
      }
    } else {
      errorsChanged.username = "";
    }

    if (!controls.password) {
      errorsChanged.formValid = false;
      if (field === 'password') {
        errorsChanged.password = "Password must be not null.";
        return errorsChanged;
      }
    } else if (controls.password.length > 5) {
      errorsChanged.formValid = false;
      if (field === 'password') {
        errorsChanged.password = "Password is too long";
        return errorsChanged;
      }
    }  else {
      errorsChanged.password = "";
    }

    return errorsChanged;
  }

  signup(event) {
    event.preventDefault();
    let errorsChanged = this.validateLoginFormControls(this.state.signupUser, null);
    if (!errorsChanged.formValid) {
      this.setState({
        errors : errorsChanged
      });
      return;
    }
    this.props.actions.signup(this.state.signupUser);
    // this.context.router.push('/homepage');
  }

  resetValues() {
    this.setState({
      signupUser: {username: '', password: ''},
      errors: {formValid: false}
    });
  }

  render() {
    return (
      <div className="panel panel-info" style={{textAlign: "center"}}>
        <div className="panel-body" style={{width: "340px", textAlign: "center", display: "inline-block"}}>
          <SignUpForm
            onChange={this.updateSignupFormState}
            onSubmit={this.signup}
            onReset={this.resetValues}
            signupUser={this.state.signupUser}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signupUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

SignupPage.defaultProps = {};


function mapStateToProps(state, ownProps) {
  return {
    signupUser: state.signupUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(signupActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
