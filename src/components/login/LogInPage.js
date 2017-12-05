import React, {PropTypes} from 'react';
import LogInForm from './LogInForm';

class LogInPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: Object.assign({}, this.props.loginValues), errors: {}
    };
    this.updateSignInFormState = this.updateSignInFormState.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  updateSignInFormState(event) {
    const field = event.target.name;
    let login = this.state.login;
    login[field] = event.target.value;
    console.log(login);
    return this.setState({login: login});
  }

  signIn(event) {
    event.preventDefault();
    console.log("On Sign In");
    // this.props.actions.signIn(this.state.course);
    // this.context.router.push('/homepage');
  }

  render() {
    return (
      <div className="panel panel-info" style={{textAlign: "center"}}>
        <div className="panel-body" style={{width: "340px", textAlign: "center", display: "inline-block"}}>
          <LogInForm
            onChange={this.updateSignInFormState}
            onSubmit={this.signIn}
            login={this.state.login}
          />
        </div>
      </div>
    );
  }
}


LogInPage.propTypes = {
  login: PropTypes.object
};

LogInPage.defaultProps = {
  loginValues: {email: '', password: '', otp: ''}
};


export default LogInPage;
