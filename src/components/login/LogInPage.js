import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LogInForm from './LogInForm';
import * as loginActions from '../../actions/loginActions';

class LogInPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: Object.assign({}, this.props.credentials),
      errors: {formValid: false}
    };
    this.updateLoginFormState = this.updateLoginFormState.bind(this);
    this.login = this.login.bind(this);
  }

  updateLoginFormState(event) {
    const field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    let errorsChanged = this.validateLoginFormControls(credentials, field);
    console.log("errorsChanged: ");
    console.log(errorsChanged);
    return this.setState({credentials: credentials, errors: errorsChanged});
  }

  login(event) {
    event.preventDefault();

    let errorsChanged = this.validateLoginFormControls(this.state.credentials, null);
    if (!errorsChanged.formValid) {
      this.setState({
        errors : errorsChanged
      });
      return;
    }
    this.props.actions.login(this.state.credentials);
    // this.context.router.push('/');
  }

  validateLoginFormControls(credentials, field) {
    let value = credentials[field];
    let errorsChanged = this.state.errors;

    if (!credentials.username) {
      errorsChanged.username = "Username must be not null.";
      errorsChanged.formValid = false;
    } else if (credentials.username.length > 20) {
      errorsChanged.username = "Username's length must be less than 20";
      errorsChanged.formValid = false;
    } else {
      errorsChanged.username = "";
      errorsChanged.formValid = true;
    }

    if (field === 'username') {
      return errorsChanged;
    }

    if (!credentials.password) {
      errorsChanged.password = "Password must be not null.";
      errorsChanged.formValid = false;
    } else if (credentials.password.length > 7) {
      errorsChanged.password = "Password is too long";
      errorsChanged.formValid = false;
    }  else {
      errorsChanged.password = "";
      errorsChanged.formValid = true;
    }

    if (field === 'password') {
      return errorsChanged;
    }
    // errorsChanged = {};
    // errorsChanged.formValid = true;

    // return errorsChanged;
  }

  render() {
    return (
      <div className="panel panel-info" style={{textAlign: "center"}}>
        <div className="panel-body" style={{width: "340px", textAlign: "center", display: "inline-block"}}>
          <LogInForm
            onChange={this.updateLoginFormState}
            onSubmit={this.login}
            credentials={this.state.credentials}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

LogInPage.propTypes = {
  credentials: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

LogInPage.defaultProps = {
  // loginValues: {username: '', password: '', otp: ''}
};

LogInPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  console.log("state: ");
  console.log(state);
  return {
    credentials: state.credentials
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
