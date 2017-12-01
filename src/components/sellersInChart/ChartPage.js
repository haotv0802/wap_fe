import React, {PropTypes} from 'react';

class ChartPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          {this.props.pageTitle}
        </div>
      </div>
    );
  }
}

ChartPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

ChartPage.defaultProps = {
  pageTitle: "Sellers In Chart"
};

export default ChartPage;
