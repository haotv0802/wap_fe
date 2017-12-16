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
      errors: {username: "Username must be not null", password: "Password mus be not null"}
    };
    this.updateLoginFormState = this.updateLoginFormState.bind(this);
    this.login = this.login.bind(this);
  }

  updateLoginFormState(event) {
    const field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    // console.log(credentials);
    return this.setState({credentials: credentials});
  }

  login(event) {
    event.preventDefault();
    let crd = this.state.credentials;
    console.log("credentials: ");
    console.log(crd);
    if (!crd.username) {
      let errorsChanged = this.state.errors;
      errorsChanged.username = "Username must be not nullzzzzz.";
      this.setState({
        errors : errorsChanged
      });
      console.log("errors: ");
      console.log(this.state);
      return;
    }
    this.props.actions.login(crd);
    this.context.router.push('/');
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
