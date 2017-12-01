import React, {PropTypes} from 'react';
import Header from "./common/Header";
import {connect} from 'react-redux';
import Favicon from 'react-favicon';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Favicon url={require("../assets/images/logo.png")} />
        <Header loading={this.props.loading}/>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
