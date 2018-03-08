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
    this.props.actions.getCitiesAndDistrict();
  }

  render() {
    const {posts} = this.props;
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">

            {/*<div class="container-fluid">*/}
              {/*{crawledData.map((data, key) =>*/}
              {/*<div className="row">*/}
                {/*<div className="col-md-2"><a href={data.url}>{data.title}</a></div>*/}
                {/*<div className="col-md-3">{data.address}</div>*/}
              {/*</div>*/}
              {/*)}*/}
            {/*</div>*/}

            <table className="table table-bordered table-hover" style={{width: "1600px"}}>
              <thead style={{color: "#337AB7"}}>
              <tr>
                <th className="col-md-1">Title</th>
                <th className="col-md-1">Address</th>
                <th className="col-md-1">Name</th>
                <th className="col-md-1">Number</th>
                <th className="col-md-1">Email</th>
                <th className="col-md-1">Acreage</th>
                <th className="col-md-1">Price</th>
                <th className="col-md-1">City</th>
                <th className="col-md-1">District</th>
                <th className="col-md-1">Publish date</th>
                <th className="col-md-1">End date</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </td>
                <td></td>
                <td></td>
              </tr>
              {posts.map((data, key) =>
                <tr key={key}>
                  <td><a href={data.url}>{data.title}</a></td>
                  <td>{data.address}</td>
                  <td>{data.contactName}</td>
                  <td>{data.contactNumber}</td>
                  <td>{data.contactEmail}</td>
                  <td>{data.acreage}</td>
                  <td>{data.price}</td>
                  <td>{data.city}</td>
                  <td>{data.district}</td>
                  <td>{data.publishDate}</td>
                  <td>{data.endDate}</td>
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
  posts: PropTypes.array.isRequired,
  citiesAndDistricts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

CrawledDataPage.defaultProps = {
  pageTitle: "Business Loans"
};

function mapStateToProps(state, ownProps) {
  console.log("state: ");
  console.log(state);
  return {
    posts: state.crawledData.posts,
    citiesAndDistricts: state.crawledData.citiesAndDistricts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crawledDataActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawledDataPage);
