import React, {PropTypes} from 'react';
import SignInForm from './LogInForm';

class LogInPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.updateSignInFormState = this.updateSignInFormState.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  updateSignInFormState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
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
          <SignInForm
            onChange={this.updateSignInFormState}
            onSubmit={this.signIn}
          />
        </div>
      </div>
    );
  }
}

export default LogInPage;
