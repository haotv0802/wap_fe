import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class CrawlingPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">
            <h1>{this.props.pageTitle}</h1>
          </div>
      </div>
    );
  }
}

CrawlingPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

CrawlingPage.defaultProps = {
  pageTitle: "Crawling data"
};

function mapStateToProps(state, ownProps) {

}

function mapDispatchToProps(dispatch) {
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawlingPage);
