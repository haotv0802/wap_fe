import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LogInForm = ({login, onChange, onSubmit}) => {
  return (
    <form>
      <TextInput
        name="email"
        placeholder="Email"
        label=""
        onChange={onChange}
        value={login.email}
        width="200px"
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={login.password}
        onChange={onChange}
        width="200px"
      />
      <TextInput
        name="otp"
        placeholder="Insert Phone OTP"
        label=""
        value={login.otp}
        onChange={onChange}
        width="200px"
      />
      <br/>
      <input
        type="submit"
        value="Log-in"
        className="btn btn-primary"
        onClick={onSubmit}
      />
    </form>
  );
};

LogInForm.propTypes = {
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  login: React.PropTypes.object.isRequired
};

export default LogInForm;
