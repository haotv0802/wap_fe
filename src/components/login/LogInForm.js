import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LogInForm = ({credentials, onChange, onSubmit, onReset, errors}) => {
  return (
    <form>
      <TextInput
        name="username"
        placeholder="User name"
        label=""
        onChange={onChange}
        value={credentials.username}
        width="250px"
        error={errors.username}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        label=""
        value={credentials.password}
        onChange={onChange}
        width="250px"
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
      &nbsp;&nbsp;&nbsp;
      <input
        type="reset"
        value="Reset"
        className="btn btn-primary"
        onClick={onReset}
        disabled={!credentials.username && !credentials.password}
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
