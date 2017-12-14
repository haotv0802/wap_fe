import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const SignupForm = ({signupUser, onChange, onSubmit, onReset}) => {
  return (
    <form>
      <TextInput
        name="username"
        placeholder="User name"
        label=""
        onChange={onChange}
        value={signupUser.username}
        width="200px"
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={signupUser.password}
        onChange={onChange}
        width="200px"
      />
      <br/>
      <input
        type="submit"
        value="Sign-up"
        className="btn btn-primary"
        onClick={onSubmit}
      />
      &nbsp;&nbsp;&nbsp;
      <input
        type="reset"
        value="Reset"
        className="btn btn-primary"
        onClick={onReset}
      />
    </form>
  );
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  signupUser: PropTypes.object.isRequired
};

export default SignupForm;
