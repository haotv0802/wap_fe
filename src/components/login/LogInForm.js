import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';


const LogInForm = ({onChange, onSubmit}) => {
  return (
    <form>
      <TextInput
        name="email"
        placeholder="Email"
        onChange={onChange}
        width="200px"
      />
      <TextInput
        name="password"
        placeholder="Password"
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
  onChange: React.PropTypes.func
};

export default LogInForm;
