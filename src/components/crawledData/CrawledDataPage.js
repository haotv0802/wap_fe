import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as crawledDataActions from '../../actions/crawledDataActions';
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class CrawledDataPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      districts: Object.assign([], this.props.districts),
      city: Object.assign(this.props.city),
      district: ""
    };
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
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

  onChangeCity(event, index, value) {
    let city = value;
    let data = this.props.citiesAndDistricts.find(data => {
      if (data.city === city) {
        return data.districts;
      }
    });
    this.setState({
      districts: data.districts,
      city: data.city
    });
  }

  onChangeDistrict(event, index, value) {
    this.setState({
      district: value
    });
  }

  render() {
    const {posts, citiesAndDistricts} = this.props;
    const {city, districts, district} = this.state;
    return (
      <div className="panel panel-primary">
          <div className="table-responsive">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Address</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Number</TableHeaderColumn>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Acreage</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>City</TableHeaderColumn>
                  <TableHeaderColumn>District</TableHeaderColumn>
                  <TableHeaderColumn>Publish date</TableHeaderColumn>
                  <TableHeaderColumn>End date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      value={city}
                      onChange={this.onChangeCity}
                      maxHeight={200}
                      autoWidth={false}
                      style={{width: "200px"}}
                    >
                      {citiesAndDistricts.map((data, key) =>
                        <MenuItem key={key} value={data.city} primaryText={data.city} />
                      )}
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      value={district}
                      onChange={this.onChangeDistrict}
                      maxHeight={200}
                      autoWidth={false}
                      style={{width: "200px"}}
                    >
                      {districts.map((data, key) =>
                        <MenuItem key={key} value={data.district} primaryText={data.district} />
                      )}
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>

                </TableRow>
                {posts.map((data, key) => {
                    let endDate = moment(data.endDate).format("DD-MM-YYYY");
                    let publishDate = moment(data.publishDate).format("DD-MM-YYYY");
                    return <TableRow key={key}>
                      <TableRowColumn><a href={data.url}>{data.title}</a></TableRowColumn>
                      <TableRowColumn>{data.address}</TableRowColumn>
                      <TableRowColumn>{data.contactName}</TableRowColumn>
                      <TableRowColumn>{data.contactNumber}</TableRowColumn>
                      <TableRowColumn>{data.contactEmail}</TableRowColumn>
                      <TableRowColumn>{data.acreage}</TableRowColumn>
                      <TableRowColumn>{data.price}</TableRowColumn>
                      <TableRowColumn>{data.city}</TableRowColumn>
                      <TableRowColumn>{data.district}</TableRowColumn>
                      <TableRowColumn>{publishDate}</TableRowColumn>
                      <TableRowColumn>{endDate}</TableRowColumn>
                    </TableRow>
                    ;
                  }
                )}
              </TableBody>
            </Table>

            <table className="table table-bordered table-hover" style={{width: "1600px"}}>
              <thead style={{color: "#337AB7"}}>
              <tr>
                <th className="col-md-1">Title</th>
                <th className="col-md-1">Address</th>
                <th className="col-md-1">Name</th>
                <th className="col-md-1">Number</th>
                <th className="col-md-1">Email</th>
                <th className="col-md-1"></th>
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
                  <SelectField
                    value={city}
                    onChange={this.onChangeCity}
                    maxHeight={200}
                    autoWidth={false}
                    style={{width: "200px"}}
                  >
                    {citiesAndDistricts.map((data, key) =>
                      <MenuItem key={key} value={data.city} primaryText={data.city} />
                    )}
                  </SelectField>
                </td>
                <td>
                  <SelectField
                    value={district}
                    onChange={this.onChangeDistrict}
                    maxHeight={200}
                    autoWidth={false}
                    style={{width: "200px"}}
                  >
                    {districts.map((data, key) =>
                      <MenuItem key={key} value={data.district} primaryText={data.district} />
                    )}
                  </SelectField>
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
