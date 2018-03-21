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

            <Table
              selectable={false}
              fixedHeader={true}
              height="800px"
            >
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Address</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn style={phoneStyles}>Number</TableHeaderColumn>
                  <TableHeaderColumn style={emailStyles}>Email</TableHeaderColumn>
                  <TableHeaderColumn style={acreageStyles}>Acreage</TableHeaderColumn>
                  <TableHeaderColumn style={priceStyles}>Price</TableHeaderColumn>
                  <TableHeaderColumn>City</TableHeaderColumn>
                  <TableHeaderColumn>District</TableHeaderColumn>
                  <TableHeaderColumn>Publish date</TableHeaderColumn>
                  <TableHeaderColumn>End date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                <TableRow>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn style={phoneStyles}></TableRowColumn>
                  <TableRowColumn style={emailStyles}></TableRowColumn>
                  <TableRowColumn style={acreageStyles}></TableRowColumn>
                  <TableRowColumn style={priceStyles}></TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      value={city}
                      onChange={this.onChangeCity}
                      maxHeight={200}
                      autoWidth={false}
                      style={{width: "180px"}}
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
                      style={{width: "180px"}}
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
                      <TableRowColumn style={phoneStyles}>{data.contactNumber}</TableRowColumn>
                      <TableRowColumn style={emailStyles}>{data.contactEmail}</TableRowColumn>
                      <TableRowColumn style={acreageStyles}>{data.acreage}</TableRowColumn>
                      <TableRowColumn style={priceStyles}>{data.price}</TableRowColumn>
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

const priceStyles = {
  width: "100px"
};

const acreageStyles = {
  width: "100px"
};

const emailStyles = {
  width: "130px"
}

const phoneStyles = {
  width: "130px"
};
export default connect(mapStateToProps, mapDispatchToProps)(CrawledDataPage);
