import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class CollectionDataPage extends React.Component {

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

CollectionDataPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

CollectionDataPage.defaultProps = {
  pageTitle: "Business Loans"
};

export default CollectionDataPage;
