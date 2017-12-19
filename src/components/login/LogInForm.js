import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LogInForm = ({credentials, onChange, onSubmit, errors}) => {
  return (
    <form>
      <TextInput
        name="username"
        placeholder="User name"
        label=""
        onChange={onChange}
        value={credentials.username}
        width="300px"
        error={errors.username}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={credentials.password}
        onChange={onChange}
        width="300px"
        error={errors.password}
      />
      <br/>
      <input
        type="submit"
        value="Log-in"
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={!errors.formValid}
      />
    </form>
  );
};

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  credentials: PropTypes.object.isRequired,
  errors: React.PropTypes.object,
  serverError: React.PropTypes.object
};

export default LogInForm;
