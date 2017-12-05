import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LogInForm = ({credentials, onChange, onSubmit}) => {
  return (
    <form>
      <TextInput
        name="email"
        placeholder="Email"
        label=""
        onChange={onChange}
        value={credentials.email}
        width="200px"
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={credentials.password}
        onChange={onChange}
        width="200px"
      />
      <TextInput
        name="otp"
        placeholder="Insert Phone OTP"
        label=""
        value={credentials.otp}
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
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  credentials: PropTypes.object.isRequired
};

export default LogInForm;
