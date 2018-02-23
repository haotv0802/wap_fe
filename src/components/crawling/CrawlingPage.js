import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as crawlingActions from "../../actions/crawlingActions";

class CrawlingPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    console.log("crawling info");
    this.props.actions.getURLList();
    console.log(this.props.crawlingInfo);
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
  pageTitle: PropTypes.string.isRequired,
  crawlingInfo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

CrawlingPage.defaultProps = {
  pageTitle: "Crawling data"
};

function mapStateToProps(state, ownProps) {
  return {
    crawlingInfo: state.crawlingInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crawlingActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawlingPage);
