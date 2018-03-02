import React, {PropTypes} from 'react';

const TextInputWithLabel = ({name, label, width, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error !== undefined && error.length > 0) {
    wrapperClass += ' ' + 'has-error has-feedback';
  } else if (error !== undefined && error.length === 0) {
    wrapperClass += ' ' + 'has-success has-feedback';
  }

  return (
    <div className={wrapperClass} style={{display: "inline", width: width, textAlign: "center"}}>
      <div className="col-sm-1">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="col-sm-11" style={{height: "40px"}}>
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{width: width}}
        />
        {error && <span className="glyphicon glyphicon-remove form-control-feedback"/>}
        {error !== undefined && error.length === 0 && <span className="glyphicon glyphicon-ok form-control-feedback"/>}
        {error && <div className="alert alert-danger" style={{width: width}}>{error}</div>}
      </div>
    </div>
  );
};

TextInputWithLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.string
};

export default TextInputWithLabel;
