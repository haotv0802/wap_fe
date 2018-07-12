import React from "react";
import {connect} from "react-redux";
import * as contactActions from "../../actions/contactActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class ContactPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: Object.assign([], this.props.contacts),
      pageNumber: this.props.pageNumber,
      numberOfRows: 20,
      activePage: 15
    };
    this.onLoadContacts = this.onLoadContacts.bind(this);
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
  }

  componentWillMount() {
    this.props.actions.getContacts(this.state.pageNumber, this.state.numberOfRows);
  }

  onLoadContacts(pageNumber) {
    this.setState({
      page: pageNumber
    });
    this.props.actions.getContacts(pageNumber, this.state.numberOfRows);
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
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
              {this.state.contacts.map((data, key) => {
                  return <TableRow key={key}>
                    <TableRowColumn style={nameStyles}><span></span></TableRowColumn>
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
        </div>
      </div>
    );
  }
}

ContactPage.defaultProps = {
  contacts: []
};

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired
};

ContactPage.defaultProps = {
  pageNumber: 0,
  contacts: []
};

function mapStateToProps(state, ownProps) {
  return {
    contacts: state.contact.data.content,
    pageNumber: state.contact.data.number
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
  width: "100px"
};

const createdStyles = {
  width: "100px"
};

const updatedStyles = {
  width: "100px"
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
