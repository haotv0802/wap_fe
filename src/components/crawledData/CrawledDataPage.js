import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as crawledDataActions from '../../actions/crawledDataActions';

class CrawledDataPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.getCrawledData();
  }

  render() {
    const {crawledData} = this.props;
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">
            <table className="table table-bordered table-hover" style={{width: "1200px"}}>
              <thead style={{color: "#337AB7"}}>
              <tr>
                <th className="col-sm-3">Title</th>
                <th className="col-sm-3">Address</th>
                <th className="col-sm-1">Name</th>
                <th className="col-sm-1">Number</th>
                <th className="col-sm-1">Email</th>
                <th className="col-sm-1">Publish date</th>
                <th className="col-sm-1">End date</th>
                <th className="col-sm-2">Category</th>
              </tr>
              </thead>
              <tbody>
              {crawledData.map((data, key) =>
                <tr key={key}>
                  <td><a href={data.url}>{data.title}</a></td>
                  <td>{data.address}</td>
                  <td>{data.contactName}</td>
                  <td>{data.contactNumber}</td>
                  <td>{data.contactEmail}</td>
                  <td>{data.publishDate}</td>
                  <td>{data.endDate}</td>
                  <td><a href={data.categoryUrl}>{data.categoryName}</a></td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

CrawledDataPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  crawledData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

CrawledDataPage.defaultProps = {
  pageTitle: "Business Loans"
};


function mapStateToProps(state, ownProps) {
  // console.log("state: ");
  // console.log(state);
  return {
    crawledData: state.crawledData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crawledDataActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawledDataPage);
