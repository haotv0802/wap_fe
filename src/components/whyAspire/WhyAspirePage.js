import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class WhyAspirePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body"  >
          <h1>Why Aspire</h1>
        </div>
      </div>
    );
  }
}

WhyAspirePage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

WhyAspirePage.defaultProps = {
  pageTitle: "Why Aspire"
};

export default WhyAspirePage;
