import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';


const SignInForm = ({onChange, onSubmit}) => {
  return (
    <form>
      <h1>Sign-in</h1>
      <TextInput
        name="email"
        placeholder="Email"
        onChange={onChange}
      />
      <TextInput
        name="password"
        placeholder="Password"
        onChange={onChange}
      />
      <input
        type="submit"
        value="Sign-in"
        className="btn btn-primary"
        onClick={onSubmit}
      />
    </form>
  );
};

SignInForm.propTypes = {
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default SignInForm;
