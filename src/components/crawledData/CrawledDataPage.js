import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as crawledDataActions from '../../actions/crawledDataActions';
import moment from "moment";
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Tooltip from 'material-ui/Tooltip';

import {Table, TableBody, TableHead, TableRow, TableCell} from 'material-ui/Table';

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
              bodyStyle={{overflow:'visible'}}
            >
              <TableHead adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableCell style={titleStyles}>Title</TableCell>
                  <TableCell style={addressStyles}>Address</TableCell>
                  <TableCell style={nameStyles}>Name</TableCell>
                  <TableCell style={phoneStyles}>Number</TableCell>
                  <TableCell style={emailStyles}>Email</TableCell>
                  <TableCell style={acreageStyles}>Acreage</TableCell>
                  <TableCell style={priceStyles}>Price</TableCell>
                  <TableCell style={cityStyles}>City</TableCell>
                  <TableCell style={districtStyles}>District</TableCell>
                  <TableCell style={publishDateStyles}>Publish date</TableCell>
                  <TableCell style={endDateStyles}>End date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                <TableRow>
                  <TableCell style={titleStyles}></TableCell>
                  <TableCell style={addressStyles}></TableCell>
                  <TableCell style={nameStyles}></TableCell>
                  <TableCell style={phoneStyles}></TableCell>
                  <TableCell style={emailStyles}></TableCell>
                  <TableCell style={acreageStyles}></TableCell>
                  <TableCell style={priceStyles}></TableCell>
                  <TableCell style={cityStyles}>
                    <Select
                      value={city}
                      onChange={this.onChangeCity}
                      maxHeight={200}
                      autoWidth={false}
                      style={{width: "180px"}}
                    >
                      {citiesAndDistricts.map((data, key) =>
                        <MenuItem key={key} value={data.city} primaryText={data.city} />
                      )}
                    </Select>
                  </TableCell>
                  <TableRowColumn style={districtStyles}>
                    <Select
                      value={district}
                      onChange={this.onChangeDistrict}
                      maxHeight={200}
                      autoWidth={false}
                      style={{width: "180px"}}
                    >
                      {districts.map((data, key) =>
                        <MenuItem key={key} value={data.district} primaryText={data.district} />
                      )}
                    </Select>
                  </TableRowColumn>
                  <TableRowColumn style={publishDateStyles}></TableRowColumn>
                  <TableRowColumn style={endDateStyles}></TableRowColumn>
                </TableRow>
                {posts.map((data, key) => {
                    let endDate = moment(data.endDate).format("DD-MM-YYYY");
                    let publishDate = moment(data.publishDate).format("DD-MM-YYYY");
                    return <TableRow key={key}>
                      <TableCell style={titleStyles}>
                        <Tooltip id="tooltip-icon" title={data.title}>
                          <a href={data.url}>{data.title}</a>
                        </Tooltip>
                      </TableCell>
                      <TableCell style={addressStyles}>{data.address}</TableCell>
                      <TableCell style={nameStyles}>{data.contactName}</TableCell>
                      <TableCell style={phoneStyles}>{data.contactNumber}</TableCell>
                      <TableCell style={emailStyles}>{data.contactEmail}</TableCell>
                      <TableCell style={acreageStyles}>{data.acreage}</TableCell>
                      <TableCell style={priceStyles}>{data.price}</TableCell>
                      <TableCell style={cityStyles}>{data.city}</TableCell>
                      <TableCell style={districtStyles}>{data.district}</TableCell>
                      <TableCell style={publishDateStyles}>{publishDate}</TableCell>
                      <TableCell style={endDateStyles}>{endDate}</TableCell>
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

const titleStyles = {
  width: "200px"
};

const addressStyles = {
  width: "200px"
};

const nameStyles = {
  width: "150px"
};

const priceStyles = {
  width: "100px"
};

const acreageStyles = {
  width: "100px"
};

const emailStyles = {
  width: "230px"
};

const phoneStyles = {
  width: "130px"
};

const cityStyles = {
  width: "150px"
};

const districtStyles = {
  width: "150px"
};

const publishDateStyles = {
  width: "150px"
};

const endDateStyles = {
  width: "150px"
};
export default connect(mapStateToProps, mapDispatchToProps)(CrawledDataPage);
