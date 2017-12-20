import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const SignupForm = ({signupUser, onChange, onSubmit, onReset, errors}) => {
  return (
    <form>
      <TextInput
        name="username"
        placeholder="User name"
        label=""
        onChange={onChange}
        value={signupUser.username}
        width="250px"
        error={errors.username}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={signupUser.password}
        onChange={onChange}
        width="250px"
        error={errors.password}
      />
      <br/>
      <input
        type="submit"
        value="Sign-up"
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={!errors.formValid}
      />
      &nbsp;&nbsp;&nbsp;
      <input
        type="reset"
        value="Reset"
        className="btn btn-primary"
        onClick={onReset}
        disabled={!signupUser.username && !signupUser.password}
      />
    </form>
  );
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  signupUser: PropTypes.object.isRequired,
  errors: React.PropTypes.object
};

export default SignupForm;
