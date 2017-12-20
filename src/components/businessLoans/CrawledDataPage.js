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
                <th className="col-sm-3">Name</th>
                <th className="col-sm-3">Category</th>
                <th className="col-sm-2">Vendor Name</th>
                <th className="col-sm-1">Location</th>
                <th className="col-sm-1">Ship on time</th>
                <th className="col-sm-1">Positive</th>
                <th className="col-sm-1">Neutral</th>
                <th className="col-sm-1">Negative</th>
                <th className="col-sm-1">Link</th>
                <th className="col-sm-1">Time on lazada</th>
                <th className="col-sm-1">Rating</th>
                <th className="col-sm-1">Size</th>
              </tr>
              </thead>
              <tbody>
              {crawledData.map((data, key) =>
                <tr key={key}>
                  <td>{data.name}</td>
                  <td>{data.category}</td>
                  <td>{data.vendorName}</td>
                  <td>{data.vendorLocation}</td>
                  <td>{data.vendorShipOnTime}</td>
                  <td>{data.vendorPositive}</td>
                  <td>{data.vendorNeutral}</td>
                  <td>{data.vendorNegative}</td>
                  <td>{data.vendorLink}</td>
                  <td>{data.vendorTimeOnLazada}</td>
                  <td>{data.vendorRating}</td>
                  <td>{data.vendorSize}</td>
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
