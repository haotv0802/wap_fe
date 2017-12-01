import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class HowItWorksPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body"  >
          <h1>How It Works</h1>
        </div>
      </div>
    );
  }
}

HowItWorksPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

HowItWorksPage.defaultProps = {
  pageTitle: "How It Works"
};

export default HowItWorksPage;
