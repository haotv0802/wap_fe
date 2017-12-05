import React, {PropTypes} from 'react';

const PasswordInput = ({name, label, width, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error !== undefined && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass} style={{display: "inline-block"}}>
      <label htmlFor={name}>{label}</label>
        <input
          type="password"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{width: width}}
        />
        {/*{error & <div className="alert alert-danger">{error}</div>}*/}
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.string
};

export default PasswordInput;
