import React from "react";
import {connect} from "react-redux";
import * as customerActions from "../../actions/customerActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';
import Pagination from "react-js-pagination";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";
import {Customer} from "./Cust";

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

class CustomerPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      customers: JSON.parse(JSON.stringify(this.props.customers)),
      deletedCustomers: this.props.deletedCustomers,
      pageNumber: this.props.pageNumber,
      total: this.props.total,
      size: this.props.size,
      nameFilter: this.props.nameFilter,
      phoneFilter: this.props.phoneFilter,
      emailFilter: this.props.emailFilter,
      newName: this.props.newName,
      newPhone: this.props.newPhone,
      newEmail: this.props.newEmail,
      activePage: 1,
      editMode: false,
      addMode: false,
      hasChanges: false,
      hasAdded: false,
      inProgress: false
    };
    this.onLoadCustomers = this.onLoadCustomers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditCustomer = this.handleEditCustomer.bind(this);
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleNewChanges = this.handleNewChanges.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onCheckForDelete = this.onCheckForDelete.bind(this);
  }

  componentWillMount() {
    this.props.actions.getCustomers(
      this.state.nameFilter,
      this.state.phoneFilter,
      this.state.emailFilter,
      this.state.pageNumber, this.state.size);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.customers !== nextProps.customers) {
      this.setState({
        customers: JSON.parse(JSON.stringify(nextProps.customers))
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
    this.onLoadCustomers(pageNumber);
  }

  onLoadCustomers(pageNumber) {
    this.setState({
      pageNumber: pageNumber,
      activePage: pageNumber
    }, () => {
      this.props.actions.getCustomers(
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.pageNumber, this.state.size);
    });
  }

  handleFiltersChange (event) {
    this.setState({ [event.target.name]: event.target.value},
      () => {
        this.props.actions.getCustomers(
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.pageNumber, this.state.size);
      }
    );
  }

  handleNewChanges (event) {
    this.setState({ [event.target.name]: event.target.value, hasAdded: true});
  }

  handleInputChange(event) {
    let array = event.target.id;
    array = array.split("_");
    let id = array[0];
    let name = array[1];
    let customersList = Object.assign([], this.state.customers);
    let data = customersList.find(customer => {
      if (customer.id == id) {
        customer[name] = event.target.value;
        customer.updated = true;
        return customer;
      }
    });
    this.setState({
      hasChanges : true,
      customers: customersList
    });
  }

  handleEditCustomer() {
    this.setState({
      editMode: !this.state.editMode,
      inProgress: true
    },() => {
      if (this.state.hasChanges) {
        this.props.actions.updateCustomers(this.state.customers);
      }

      if (!this.state.editMode) {
        this.setState({
          hasChanges: false,
          inProgress: false
        });
      }
    });
  }

  handleDelete() {
    let ids = [];
    this.state.deletedCustomers.map(item => {
      ids.push(item.id);
    });
    this.setState({
      deletedCustomers: []
    }, () => {
      this.props.actions.deleteCustomers(ids,
        this.state.nameFilter,
        this.state.phoneFilter,
        this.state.emailFilter,
        this.state.pageNumber,
        this.state.size);
    });
  }

  handleCancel() {
    this.setState({
      hasAdded: false,
      hasChanges: false,
      newName: '',
      newPhone: '',
      newEmail: '',
      inProgress: false,
      addMode: false,
      editMode: false
    });
  }

  handleAddCustomer() {
    this.setState({
      addMode: !this.state.addMode,
      inProgress: true
    },() => {
      if (this.state.hasAdded) {
        let customer = new Customer();
        customer.name = this.state.newName;
        customer.phone = this.state.newPhone;
        customer.email = this.state.newEmail;
        let data = JSON.stringify({
          name: this.state.newName,
          phone: this.state.newPhone,
          email: this.state.newEmail
        });
        this.props.actions.addCustomer(customer,
          this.state.nameFilter,
          this.state.phoneFilter,
          this.state.emailFilter,
          this.state.pageNumber,
          this.state.size);
      }

      if (!this.state.addMode) {
        this.setState({
          hasAdded: false,
          newName: '',
          newPhone: '',
          newEmail: '',
          inProgress: false
        });
      }
    });
  }

  onCheckForDelete(event) {
    let customersList = Object.assign([], this.state.customers);
    let id = customersList.find((item) => {
    if (item.id == event.target.value) {
        item.deleted = !item.deleted;
        return item.id;
      }
    });

    this.setState({
      customers: customersList
    });

    if (event.target.checked) {
      this.state.deletedCustomers.push(id);
    } else {
      let array = this.state.deletedCustomers.filter((item) => (item.id != event.target.value));
      this.state.deletedCustomers = array;
    }
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
          {this.state.inProgress === false ?
          <span>
            <RaisedButton label="Edit" primary={true} onClick={this.handleEditCustomer} />
            &nbsp;
            <RaisedButton label="Add" primary={true} onClick={this.handleAddCustomer} />
          </span> :
            <span>
              <RaisedButton backgroundColor="#f49842" label="Cancel" onClick={this.handleCancel}/>&nbsp;
              {this.state.addMode ?
                <RaisedButton label="Save" primary={true} onClick={this.handleAddCustomer}/>
                :
                <RaisedButton label="Save" primary={true} onClick={this.handleEditCustomer}/>
              }
            </span>

          }
          <Table
            selectable={false}
            fixedHeader
            bodyStyle={{overflow:'visible'}}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={nameStyles}>Name</TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>Phone</TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>Email</TableHeaderColumn>
                <TableHeaderColumn style={deleteStyles}>
                  <RaisedButton backgroundColor="#f44b42" label="Delete" onClick={this.handleDelete}/>
                </TableHeaderColumn>
              </TableRow>
              {this.state.addMode ?
              <TableRow>
                <TableHeaderColumn style={nameStyles}>
                  <TextField
                    id="name"
                    label="Name"
                    name="newName"
                    hintText="New name"
                    value={this.state.newName}
                    style={{width: '170px'}}
                    onChange={this.handleNewChanges}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={phoneStyles}>
                  <TextField
                    id="phone"
                    label="Phone"
                    name="newPhone"
                    hintText="New phone"
                    value={this.state.newPhone}
                    style={{width: '100px'}}
                    onChange={this.handleNewChanges}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={emailStyles}>
                  <TextField
                    id="email"
                    label="Email"
                    name="newEmail"
                    hintText="New email"
                    value={this.state.newEmail}
                    style={{width: '200px'}}
                    onChange={this.handleNewChanges}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={deleteStyles}></TableHeaderColumn>
              </TableRow> : ''}

              <TableRow>
                <TableHeaderColumn style={nameStyles}>
                  <TextField
                    id="name"
                    label="Name"
                    name="nameFilter"
                    hintText="Filter by name"
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
                    hintText="Filter by phone"
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
                    hintText="Filter by email"
                    value={this.state.emailFilter}
                    style={{width: '200px'}}
                    onChange={this.handleFiltersChange}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn style={deleteStyles}></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows={false}>
              {!this.state.editMode && this.state.customers.map((data, key) => {
                  return (<TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>{data.name}</span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>{data.phone}</span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>{data.email}</span></TableRowColumn>
                    <TableHeaderColumn style={deleteStyles}>
                      <Checkbox
                        key={key}
                        label=""
                        checked={data.deleted}
                        onCheck={this.onCheckForDelete}
                        style={styles.checkbox}
                        value={data.id}
                      />
                    </TableHeaderColumn>
                  </TableRow>)
                    ;
                }
              )}

              {this.state.editMode && this.state.customers.map((data, key) => {
                  return (<TableRow key={key}>
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
                    <TableHeaderColumn style={deleteStyles}></TableHeaderColumn>
                  </TableRow>)
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

CustomerPage.defaultProps = {
  customers: [],
  deletedCustomers: [],
  total: 0,
  size: 10,
  pageNumber: 1,
  nameFilter: '',
  phoneFilter: '',
  emailFilter: '',
  newName: '',
  newPhone: '',
  newEmail: ''
};

CustomerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired,
  deletedCustomers: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  total: PropTypes.number,
  size: PropTypes.number.isRequired,
  nameFilter: PropTypes.string,
  phoneFilter: PropTypes.string,
  emailFilter: PropTypes.string,
  newName: PropTypes.string,
  newPhone: PropTypes.string,
  newEmail: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    customers: state.customer.data.content,
    pageNumber: state.customer.data.number,
    total: state.customer.data.total,
    size: state.customer.data.size
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customerActions, dispatch)
  };
}

const nameStyles = {
  width: "200px"
};

const phoneStyles = {
  width: "100px"
};

const emailStyles = {
  width: "200px"
};

const deleteStyles = {
  width: "100px"
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
