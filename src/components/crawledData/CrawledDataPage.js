import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as crawledDataActions from '../../actions/crawledDataActions';
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';

class CrawledDataPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      districts: Object.assign([], this.props.districts),
      city: Object.assign(this.props.city)
    };
    this.onChangeCity = this.onChangeCity.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.city !== nextProps.city) {
      this.setState({
        districts: Object.assign([], nextProps.districts),
        city: Object.assign(nextProps.city)
      });
    }
  }

  componentWillMount() {
    this.props.actions.getCrawledData();
    this.props.actions.getCitiesAndDistrict();
    this.setState({
      districts: Object.assign([], this.props.districts),
      city: Object.assign(this.props.city)
    });

    // this.props.citiesAndDistricts.map(data => {
    //     console.log("city: ");
    //     console.log(data.city);
    //     if (data.city === 'Ho Chi Minh') {
    //       console.log(data);
    //       this.setState({
    //         districts: data.districts
    //       });
    //     }
    //   });
    // console.log(this.state.districts);
  }

  onChangeCity(event) {
    let city = event.target.value;
    let data = this.props.citiesAndDistricts.find(data => {
      if (data.city === city) {
        return data.districts;
      }
    });
    this.setState({
      districts: Object.assign([], data.districts),
      city: Object.assign(data.city)
    });
  }

  render() {
    const {posts, citiesAndDistricts} = this.props;
    const {city, districts} = this.state;

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
            <RaisedButton label="Primary" primary={true}/>
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
                  <select value={city} onChange={this.onChangeCity}>
                    {citiesAndDistricts.map((data, key) =>
                      <option key={key} value={data.city}>{data.city}</option>
                    )}
                  </select>
                </td>
                <td>
                  <select>
                    {districts.map((data, key) =>
                      <option key={key} value={data.district}>{data.district}</option>
                    )}
                  </select>
                </td>
                <td></td>
                <td></td>
              </tr>
              {posts.map((data, key) => {
                let endDate = moment(data.endDate).format("DD-MM-YYYY");
                let publishDate = moment(data.publishDate).format("DD-MM-YYYY");
                return <tr key={key}>
                  <td><a href={data.url}>{data.title}</a></td>
                  <td>{data.address}</td>
                  <td>{data.contactName}</td>
                  <td>{data.contactNumber}</td>
                  <td>{data.contactEmail}</td>
                  <td>{data.acreage}</td>
                  <td>{data.price}</td>
                  <td>{data.city}</td>
                  <td>{data.district}</td>
                  <td>{publishDate}</td>
                  <td>{endDate}</td>
                </tr>;
              }

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
  districts: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

CrawledDataPage.defaultProps = {
  pageTitle: "Business Loans"
};

function mapStateToProps(state, ownProps) {
  let districts = [];
  let city = "";
  let location;
  if (state.crawledData.citiesAndDistricts.length > 0) {
    location = state.crawledData.citiesAndDistricts.find(data => {
      if (data.city === "Ho Chi Minh") {
        return data;
      }
    });
    districts = location.districts;
    city = location.city;
    // console.log("districts mapStateToProps: ");
    // console.log(districts);
    // console.log("city mapStateToProps: ");
    // console.log(city);
  }
  return {
    posts: state.crawledData.posts,
    citiesAndDistricts: state.crawledData.citiesAndDistricts,
    districts: districts,
    city: city
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crawledDataActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawledDataPage);
