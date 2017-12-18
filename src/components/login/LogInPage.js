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
      errors: {submitEnabled: true}
    };
    this.updateLoginFormState = this.updateLoginFormState.bind(this);
    this.login = this.login.bind(this);
  }

  updateLoginFormState(event) {
    const field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    // console.log(credentials);
    this.validateLoginForm();
    return this.setState({credentials: credentials});
  }

  login(event) {
    event.preventDefault();

    if (!this.validateLoginForm()) {
      return;
    }
    // this.props.actions.login(crd);
    // this.context.router.push('/');
  }

  validateLoginForm() {
    let success = true;
    let crd = this.state.credentials;
    let errorsChanged = this.state.errors;
    if (!crd.username) {
      errorsChanged.username = "Username must be not null.";
      success = false;
    } else {
      errorsChanged.username = "";
    }

    if (!crd.password) {
      errorsChanged.password = "Password must be not null.";
      success = false;
    } else {
      errorsChanged.password = "";
    }
    if (success) {
      errorsChanged = {};
    }

    errorsChanged.submitEnabled = success;
    this.setState({
      errors : errorsChanged
    });

    return success;
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
