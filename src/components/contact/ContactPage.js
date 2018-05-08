import React from "react";
import {connect} from "react-redux";
import * as contactActions from "../../actions/contactActions";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";

class ContactPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: Object.assign([], this.props.contacts)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contacts !== nextProps.contacts) {
      this.setState({
        contacts: Object.assign([], nextProps.contacts)
      });
    }
  }

  componentWillMount() {
    // this.props.actions.getCrawledData(this.state.page, this.state.numberOfRows);
    this.props.actions.getContacts();
  }

  render() {
    console.log(this.state.contacts);
    return (
      <div className="panel panel-primary">
        <div className="table-responsive">
        </div>
      </div>
    );
  }
}

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    contacts: state.contact.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
