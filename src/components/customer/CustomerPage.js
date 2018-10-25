import React from "react";
import {connect} from "react-redux";
import * as customerActions from "../../actions/customerActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';
import Pagination from "react-js-pagination";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";

class CustomerPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      customers: JSON.parse(JSON.stringify(this.props.customers)),
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
      hasChanges: false
    };
    this.onLoadCustomers = this.onLoadCustomers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditCustomer = this.handleEditCustomer.bind(this);
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
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
      editMode: !this.state.editMode
    },() => {
      if (this.state.hasChanges) {
        this.props.actions.updateCustomers(this.state.customers);
      }

      if (!this.state.editMode) {
        this.setState({
          hasChanges: false
        });
      }
    });
  }

  handleAddCustomer() {
    this.setState({
      editMode: !this.state.editMode
    },() => {
      if (this.state.hasChanges) {
        // this.props.actions.addCustomer();
      }

      if (!this.state.editMode) {
        this.setState({
          hasChanges: false
        });
      }
    });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
          <RaisedButton label={this.state.editMode ? "Save" : "Edit"} primary={true} onClick={this.handleEditCustomer} />
          <RaisedButton label={this.state.addMode ? "Save" : "Add"} primary={true} onClick={this.handleAddCustomer} />
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
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows={false}>
              {!this.state.editMode && this.state.customers.map((data, key) => {
                  return (<TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span>{data.name}</span></TableRowColumn>
                    <TableRowColumn style={phoneStyles}><span>{data.phone}</span></TableRowColumn>
                    <TableRowColumn style={emailStyles}><span>{data.email}</span></TableRowColumn>
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
  width: "150px"
};

const phoneStyles = {
  width: "100px"
};

const emailStyles = {
  width: "200px"
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
