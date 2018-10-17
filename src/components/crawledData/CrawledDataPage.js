//React
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as crawledDataActions from '../../actions/crawledDataActions';
import moment from "moment";

//Material UI Dependency for touch / tap / click events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Material UI Components
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

//Import the pagination component
import Pagination from 'materialui-pagination';

//Demo API to simulate async actions
import RowApi from './../../api/rows';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from "material-ui/TextField";

class CrawledDataPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      districts: Object.assign([], this.props.districts),
      city: Object.assign(this.props.city),
      district: "",
      rowsPerPage: [5,10,15],
      rows: [],
      numberOfRows: 100,
      page: 1,
      total: undefined,
      titleFilter: this.props.titleFilter,
      addressFilter: this.props.addressFilter,
      nameFilter: this.props.nameFilter,
      phoneFilter: this.props.phoneFilter,
      emailFilter: this.props.emailFilter,
      acreageFilter: this.props.acreageFilter,
      priceFilter: this.props.priceFilter
    };
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.updateRows = this.updateRows.bind(this);
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
    // this.props.actions.getCrawledData(this.state.page, this.state.numberOfRows);
    this.props.actions.getCitiesAndDistrict();
    this.setState({
      districts: Object.assign([], this.props.districts),
      city: Object.assign(this.props.city)
    });

    RowApi.getRows(this.state)
      .then((updatedState) => {
        this.setState(updatedState);
        this.props.actions.getCrawledData(this.state.page, this.state.numberOfRows);
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

  updateRows(state){
    RowApi.getRows(state)
      .then((updatedState) => {
        this.setState(updatedState);
        this.props.actions.getCrawledData(this.state.page, this.state.numberOfRows);
      });
  }

  render() {
    const {posts, citiesAndDistricts} = this.props;
    const {city, districts, district} = this.state;
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
          <RaisedButton label={this.state.editMode ? "Save" : "Edit"} primary={true} onClick={this.handleEditContact} />
          <Table
            selectable={false}
            fixedHeader={true}
            height="800px"
            bodyStyle={{overflow:'visible'}}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={titleStyles}>Title</TableHeaderColumn>
                <TableHeaderColumn style={addressStyles}>Address</TableHeaderColumn>
                <TableHeaderColumn style={nameStyles}>Name</TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>Number</TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>Email</TableHeaderColumn>
                <TableHeaderColumn style={acreageStyles}>Acreage</TableHeaderColumn>
                <TableHeaderColumn style={priceStyles}>Price</TableHeaderColumn>
                <TableHeaderColumn style={cityStyles}>City</TableHeaderColumn>
                <TableHeaderColumn style={districtStyles}>District</TableHeaderColumn>
                <TableHeaderColumn style={publishDateStyles}>Publish date</TableHeaderColumn>
                <TableHeaderColumn style={endDateStyles}>End date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
              <TableRow>
                <TableRowColumn style={titleStyles}>
                  <TextField
                    id="title"
                    label="Title"
                    name="titleFilter"
                    value={this.state.titleFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={addressStyles}>
                  <TextField
                    id="address"
                    label="Address"
                    name="addressFilter"
                    value={this.state.addressFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={nameStyles}>
                  <TextField
                    id="name"
                    label="Name"
                    name="nameFilter"
                    value={this.state.nameFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={phoneStyles}>
                  <TextField
                    id="phone"
                    label="Phone"
                    name="phoneFilter"
                    value={this.state.phoneFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={emailStyles}>
                  <TextField
                    id="email"
                    label="Email"
                    name="emailFilter"
                    value={this.state.emailFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={acreageStyles}>
                  <TextField
                    id="acreage"
                    label="Acreage"
                    name="acreageFilter"
                    value={this.state.acreageFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={priceStyles}>
                  <TextField
                    id="price"
                    label="Price"
                    name="priceFilter"
                    value={this.state.priceFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableRowColumn>
                <TableRowColumn style={cityStyles}>
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
                <TableRowColumn style={districtStyles}>
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
                <TableRowColumn style={publishDateStyles}></TableRowColumn>
                <TableRowColumn style={endDateStyles}></TableRowColumn>
              </TableRow>
              {posts.map((data, key) => {
                  let endDate = moment(data.endDate).format("DD-MM-YYYY");
                  let publishDate = moment(data.publishDate).format("DD-MM-YYYY");
                  return <TableRow key={key}>
                    <TableRowColumn style={titleStyles}><a href={data.url}>{data.title}</a></TableRowColumn>
                    <TableRowColumn style={addressStyles}>{data.address}</TableRowColumn>
                    <TableRowColumn style={nameStyles}>{data.contactName}</TableRowColumn>
                    <TableRowColumn style={phoneStyles}>{data.contactNumber}</TableRowColumn>
                    <TableRowColumn style={emailStyles}>{data.contactEmail}</TableRowColumn>
                    <TableRowColumn style={acreageStyles}>{data.acreage}</TableRowColumn>
                    <TableRowColumn style={priceStyles}>{data.price}</TableRowColumn>
                    <TableRowColumn style={cityStyles}>{data.city}</TableRowColumn>
                    <TableRowColumn style={districtStyles}>{data.district}</TableRowColumn>
                    <TableRowColumn style={publishDateStyles}>{publishDate}</TableRowColumn>
                    <TableRowColumn style={endDateStyles}>{endDate}</TableRowColumn>
                  </TableRow>
                    ;
                }
              )}
            </TableBody>
          </Table>
          <Divider />
          <Pagination
            total={this.state.total}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            numberOfRows={this.state.numberOfRows}
            updateRows={this.updateRows}
          />
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
  actions: PropTypes.object.isRequired,
  titleFilter: PropTypes.string,
  addressFilter: PropTypes.string,
  nameFilter: PropTypes.string,
  phoneFilter: PropTypes.string,
  emailFilter: PropTypes.string,
  acreageFilter: PropTypes.string,
  priceFilter: PropTypes.string
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
