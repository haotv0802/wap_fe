import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LogInForm from './LogInForm';
import * as loginActions from '../../actions/loginActions';

class LogInPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: Object.assign({}, this.props.login), errors: {}
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
  // loginValues: {email: '', password: '', otp: ''}
};


function mapStateToProps(state, ownProps) {
  // if (courseId && state.courses.length > 0) {
  //   course = getCourseById(state.courses, courseId);
  // }
  // const authorsFormattedForDropdown = state.authors.map(author => {
  //   return {
  //     value: author.id,
  //     text: author.firstName + ' ' + author.lastName
  //   };
  // });

  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
