import React from "react";
import {connect} from "react-redux";
import * as contactActions from "../../actions/contactActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';
import Pagination from "react-js-pagination";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Select from 'material-ui/SelectField';

class ContactPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: Object.assign([], this.props.contacts),
      pageNumber: this.props.pageNumber,
      total: this.props.total,
      size: this.props.size,
      nameFilter: this.props.nameFilter,
      activePage: 1
    };
    this.onLoadContacts = this.onLoadContacts.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.contacts !== nextProps.contacts) {
      this.setState({
        contacts: Object.assign([], nextProps.contacts)
      });
    }
    if (this.props.pageNumber !== nextProps.pageNumber) {
      this.setState({
        pageNumber: nextProps.pageNumber
      });
    }

    if (this.props.total !== nextProps.total) {
      this.setState({
        total: nextProps.total
      });
    }
    if (this.props.size !== nextProps.size) {
      this.setState({
        size: nextProps.size
      });
    }
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.onLoadContacts(pageNumber);
  }

  componentWillMount() {
    this.props.actions.getContacts(this.state.nameFilter, this.state.pageNumber, this.state.size);
  }

  onLoadContacts(pageNumber) {
    this.setState({
      pageNumber: pageNumber,
      activePage: pageNumber
    }, () => {
      this.props.actions.getContacts(this.state.nameFilter, this.state.pageNumber, this.state.size);
    });
  }

  handleFiltersChange (event) {
    this.setState({ [event.target.name]: event.target.value },
      () => {
        this.props.actions.getContacts(this.state.nameFilter, this.state.pageNumber, this.state.size);
      }
    );
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
          <Table
            selectable={false}
            fixedHeader={true}
            bodyStyle={{overflow:'visible'}}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={nameStyles}>Name</TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>Phone</TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>Email</TableHeaderColumn>
                <TableHeaderColumn style={typeStyles}>Type</TableHeaderColumn>
                <TableHeaderColumn style={manualStyles}>Manual check</TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>Email existing?</TableHeaderColumn>
                <TableHeaderColumn style={latestItemStyles}>Latest item at</TableHeaderColumn>
                <TableHeaderColumn style={createdStyles}>Created at</TableHeaderColumn>
                <TableHeaderColumn style={updatedStyles}>Updated at</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn style={nameStyles}>
                  <TextField
                    id="name"
                    label="Name"
                    name="nameFilter"
                    value={this.state.nameFilter}
                    style={{width: '170px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>
                  <TextField
                    id="phone"
                    label="Phone"
                    style={{width: '100px'}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>
                  <TextField
                    id="email"
                    label="Email"
                    style={{width: '170px'}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={typeStyles}>
                  <Select
                    name="existing"
                    style={{width: '100px'}}
                  >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value={'OWNER'}>OWNER</MenuItem>
                    <MenuItem value={'SALE'}>SALE</MenuItem>
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={manualStyles}>
                  <TextField
                    id="check"
                    label="Check"
                    style={{width: '70px'}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>
                  <Select
                    name="existing"
                    style={{width: '100px'}}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>YES</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={latestItemStyles}>
                  <TextField
                    id="last"
                    label="Last"
                    style={{width: '70px'}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={createdStyles}>
                  <TextField
                    id="create"
                    label="Create"
                    style={{width: '70px'}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={updatedStyles}><TextField
                  id="update"
                  label="Update"
                  style={{width: '70px'}}
                /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
              {this.state.contacts.map((data, key) => {
                  return <TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>{data.name}</span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>{data.phone}</span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>{data.email}</span></TableRowColumn>
                    <TableRowColumn style={typeStyles}><span>{data.type}</span></TableRowColumn>
                    <TableRowColumn style={manualStyles}><span>{data.manualCheck}</span></TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}><span>{data.emailExisting}</span></TableRowColumn>
                    <TableRowColumn style={latestItemStyles}><span>{data.latestItemPostedAt}</span></TableRowColumn>
                    <TableRowColumn style={createdStyles}><span>{data.createdAt}</span></TableRowColumn>
                    <TableRowColumn style={updatedStyles}><span>{data.updatedAt}</span></TableRowColumn>
                  </TableRow>
                    ;
                }
              )}
            </TableBody>
          </Table>
          <Divider />
          <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.size}
              totalItemsCount={this.state.total}
              pageRangeDisplayed={10}
              onChange={this.handlePageChange}
            />
          </center>
        </div>
      </div>
    );
  }
}

ContactPage.defaultProps = {
  contacts: [],
  total: 0,
  size: 10,
  pageNumber: 1,
  nameFilter: ''
};

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  total: PropTypes.number,
  size: PropTypes.number,
  nameFilter: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    contacts: state.contact.data.content,
    pageNumber: state.contact.data.number,
    total: state.contact.data.total,
    size: state.contact.data.size
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

const nameStyles = {
  width: "150px"
};

const phoneStyles = {
  width: "100px"
};

const emailStyles = {
  width: "150px"
};

const typeStyles = {
  width: "80px"
};

const manualStyles = {
  width: "80px"
};

const emailExistsStyles = {
  width: "80px"
};

const latestItemStyles = {
  width: "80px"
};

const createdStyles = {
  width: "80px"
};

const updatedStyles = {
  width: "80px"
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
