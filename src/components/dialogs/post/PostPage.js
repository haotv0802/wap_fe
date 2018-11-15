import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {bindActionCreators} from "redux";
import * as postsActions from "../../../actions/postsActions";
import connect from "react-redux/es/connect/connect";

class PostPage extends Component {
  render() {
    return (
      <Dialog
        title="title"
        modal={this.props.modal}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <h1>Hao HO</h1>
      </Dialog>
    );
  }
}

PostPage.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  modal: PropTypes.bool,
  open: PropTypes.bool
};


function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
