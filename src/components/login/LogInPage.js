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
    this.resetValues = this.resetValues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.credentials.serverError && nextProps.credentials.serverError.status === 401) {
      let credentials = this.state.credentials;
      credentials.username = "";
      credentials.password = "";
      this.setState({
        credentials: credentials,
        errors: {}
      });
    }
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

  resetValues() {
    this.setState({
      credentials: {username: '', password: ''},
      errors: {formValid: false}
    });
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

  validateLoginFormControls(credentials, field) {
    let value = credentials[field];
    let errorsChanged = this.state.errors;
    errorsChanged.formValid = true;
    if (!credentials.username) {
      errorsChanged.formValid = false;
      if (field === 'username') {
        errorsChanged.username = "Username must be not null.";
        return errorsChanged;
      }
    } else if (credentials.username.length > 5) {
      errorsChanged.formValid = false;
      if (field === 'username') {
        errorsChanged.username = "Username is too long";
        return errorsChanged;
      }
    } else {
      errorsChanged.username = "";
    }

    if (!credentials.password) {
      errorsChanged.formValid = false;
      if (field === 'password') {
        errorsChanged.password = "Password must be not null.";
        return errorsChanged;
      }
    } else if (credentials.password.length > 5) {
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

  render() {
    return (
      <div className="panel panel-info" style={{textAlign: "center"}}>
        <div className="panel-body" style={{width: "340px", textAlign: "center", display: "inline-block"}}>
          <LogInForm
            onChange={this.updateLoginFormState}
            onSubmit={this.login}
            credentials={this.state.credentials}
            errors={this.state.errors}
            onReset={this.resetValues}
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
  // console.log("state: ");
  // console.log(state);
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
