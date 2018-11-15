import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

export default class PostPage extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        title="title"
      >
        <h1>Hao HO</h1>
      </Dialog>
    );
  }
}

PostPage.propTypes = {
  open: PropTypes.bool
};
