import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class UseCasesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body"  >
          <h1>Use Cases</h1>
        </div>
      </div>
    );
  }
}

UseCasesPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

UseCasesPage.defaultProps = {
  pageTitle: "Use Cases"
};

export default UseCasesPage;
