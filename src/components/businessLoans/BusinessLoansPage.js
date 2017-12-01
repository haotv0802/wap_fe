import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class BusinessLoansPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body"  >
          <h1>Business Loans</h1>
        </div>
      </div>
    );
  }
}

BusinessLoansPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

BusinessLoansPage.defaultProps = {
  pageTitle: "Business Loans"
};

export default BusinessLoansPage;
