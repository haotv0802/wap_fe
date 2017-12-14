import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignUpForm from './SignupForm';
import * as signupActions from '../../actions/signupActions';

class SignupPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      signupUser: Object.assign({}, this.props.signupUser), errors: {}
    };
    this.updateSignupFormState = this.updateSignupFormState.bind(this);
    this.signup = this.signup.bind(this);
    this.resetValues = this.resetValues.bind(this);

  }

  updateSignupFormState(event) {
    const field = event.target.name;
    let signupUser = this.state.signupUser;
    signupUser[field] = event.target.value;
    return this.setState({signupUser: signupUser});
  }

  signup(event) {
    event.preventDefault();
    this.props.actions.signup(this.state.signupUser);
    // this.context.router.push('/homepage');
  }

  resetValues() {
    this.setState({
      signupUser: {username: '', password: ''}
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
