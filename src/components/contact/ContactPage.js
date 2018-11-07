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
import RaisedButton from 'material-ui/RaisedButton';

class ContactPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: JSON.parse(JSON.stringify(this.props.contacts)),
      pageNumber: this.props.pageNumber,
      total: this.props.total,
      size: this.props.size,
      nameFilter: this.props.nameFilter,
      phoneFilter: this.props.phoneFilter,
      emailFilter: this.props.emailFilter,
      typeFilter: this.props.typeFilter,
      manualCheckFilter: this.props.manualCheckFilter,
      emailExistingFilter: this.props.emailExistingFilter,
      activePage: 1,
      editMode: false,
      hasChanges: false,
      types: this.props.types,
      isExisting: this.props.isExisting
    };
    this.onLoadContacts = this.onLoadContacts.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCheckedTypeChange = this.handleCheckedTypeChange.bind(this);
    this.handleEmailExistingChange = this.handleEmailExistingChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.contacts !== nextProps.contacts) {
      this.setState({
        contacts: JSON.parse(JSON.stringify(nextProps.contacts))
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
    this.onLoadContacts(pageNumber);
  }

  componentWillMount() {
    this.props.actions.getContacts(
      this.state.nameFilter,
      this.state.phoneFilter,
      this.state.emailFilter,
      this.state.typeFilter,
      this.state.manualCheckFilter,
      this.state.emailExistingFilter,
      this.state.pageNumber, this.state.size);
  }

  onLoadContacts(pageNumber) {
    this.setState({
      pageNumber: pageNumber,
      activePage: pageNumber
    }, () => {
      this.props.actions.getContacts(
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.typeFilter,
        this.state.manualCheckFilter,
        this.state.emailExistingFilter,
        this.state.pageNumber, this.state.size);
    });
  }

  handleFiltersChange (event) {
    this.setState({ [event.target.name]: event.target.value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size);
      }
    );
  }

  handleTypeChange (event, key, value) {
    this.setState({ typeFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size);
      }
    );
  }

  handleEmailExistingChange (event, key, value) {
    this.setState({ emailExistingFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size);
      }
    );
  }

  handleCheckedTypeChange (event, key, value) {
    this.setState({ manualCheckFilter: value},
      () => {
        this.props.actions.getContacts(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.typeFilter,
          this.state.manualCheckFilter,
          this.state.emailExistingFilter,
          this.state.pageNumber, this.state.size);
      }
    );
  }

  handleEditContact() {
    this.setState({
      editMode: !this.state.editMode
    },() => {
      if (this.state.hasChanges) {
        this.props.actions.updateContacts(this.state.contacts);
      }

      if (!this.state.editMode) {
        this.setState({
          hasChanges: false
        });
      }
    });
  }

  handleInputChange(event) {
    let array = event.target.id;
    array = array.split("_");
    let id = array[0];
    let name = array[1];
    let contactsList = Object.assign([], this.state.contacts);
    let data = contactsList.find(contact => {
      if (contact.id == id) {
        contact[name] = event.target.value;
        contact.updated = true;
        return contact;
      }
    });
    this.setState({
      hasChanges : true,
      contacts: contactsList
    });
  }

  handleCancel() {
    this.setState({
      editMode: false,
      hasChanges : false
    });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
          {this.state.editMode === true ?
            <span>
              <RaisedButton backgroundColor="#f49842" label="Cancel" onClick={this.handleCancel}/>&nbsp;
            </span> : ""
          }
          <RaisedButton label={this.state.editMode ? "Save" : "Edit"} primary={true} onClick={this.handleEditContact} />
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
                <TableHeaderColumn style={descriptionStyles}>Description</TableHeaderColumn>
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
                    name="phoneFilter"
                    value={this.state.phoneFilter}
                    style={{width: '100px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>
                  <TextField
                    id="email"
                    label="Email"
                    name="emailFilter"
                    value={this.state.emailFilter}
                    style={{width: '250px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={typeStyles}>
                  <Select
                    name="typeFilter"
                    value={this.state.typeFilter}
                    style={{width: '118px'}}
                    onChange={this.handleTypeChange}
                  >
                    {this.state.types.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={manualStyles}>
                  <Select
                    name="manualCheckFilter"
                    value={this.state.manualCheckFilter}
                    style={{width: '118px'}}
                    onChange={this.handleCheckedTypeChange}
                  >
                    {this.state.types.map((data, key) =>
                      <MenuItem key={key} value={data} primaryText={data} />
                    )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={emailExistsStyles}>
                  <Select
                    name="emailExistingFilter"
                    value={this.state.emailExistingFilter}
                    style={{width: '100px'}}
                    onChange={this.handleEmailExistingChange}
                  >
                    {this.state.isExisting.map((data, key) =>
                    <MenuItem key={key} value={data} primaryText={data} />
                  )}
                  </Select>
                </TableHeaderColumn>
                <TableHeaderColumn style={descriptionStyles}>
                  <TextField
                    id="description"
                    label="Description"
                    style={{width: '180px'}}
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
              {!this.state.editMode && this.state.contacts.map((data, key) => {
                  return <TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>{data.name}</span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>{data.phone}</span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>{data.email}</span></TableRowColumn>
                    <TableRowColumn style={typeStyles}><span>{data.type}</span></TableRowColumn>
                    <TableRowColumn style={manualStyles}><span>{data.manualCheck}</span></TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}><span>{data.emailExisting ? "YES" : "NO"}</span></TableRowColumn>
                    <TableRowColumn style={descriptionStyles}><span>{data.description}</span></TableRowColumn>
                  </TableRow>
                    ;
                }
              )}

              {this.state.editMode && this.state.contacts.map((data, key) => {
                  return <TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>
                      <TextField
                        id={data.id + "_name"}
                        hintText="Input name"
                        value={data.name}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>
                      <TextField
                        id={data.id + "_phone"}
                        hintText="Input phone"
                        value={data.phone === null ? "" : data.phone}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>
                      <TextField
                        id={data.id + "_email"}
                        hintText="Input email"
                        value={data.email === null ? "" : data.email}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
                    <TableRowColumn style={typeStyles}><span>{data.type}</span></TableRowColumn>
                    <TableRowColumn style={manualStyles}><span>{data.manualCheck}</span></TableRowColumn>
                    <TableRowColumn style={emailExistsStyles}><span>{data.emailExisting ? "YES" : "NO"}</span></TableRowColumn>
                    <TableRowColumn style={descriptionStyles}><span>
                      <TextField
                        id={data.id + "_description"}
                        hintText="Input description"
                        value={data.description === null ? "" : data.description}
                        onChange={this.handleInputChange}
                      />
                    </span></TableRowColumn>
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
  nameFilter: '',
  phoneFilter: '',
  emailFilter: '',
  typeFilter: '',
  manualCheckFilter: '',
  emailExistingFilter: '',
  types: ["", "OWNER", "SALE"],
  isExisting: ["", "YES", "NO"]
};

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  total: PropTypes.number,
  size: PropTypes.number.isRequired,
  nameFilter: PropTypes.string,
  phoneFilter: PropTypes.string,
  emailFilter: PropTypes.string,
  typeFilter: PropTypes.string,
  manualCheckFilter: PropTypes.string,
  emailExistingFilter: PropTypes.string,
  types: PropTypes.array,
  isExisting: PropTypes.array
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
  width: "200px"
};

const typeStyles = {
  width: "100px"
};

const manualStyles = {
  width: "80px"
};

const emailExistsStyles = {
  width: "80px"
};

const descriptionStyles = {
  width: "200px"
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
