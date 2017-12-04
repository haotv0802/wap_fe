import React, {PropTypes} from 'react';
import Header from "./common/Header";
import {connect} from 'react-redux';
import Favicon from 'react-favicon';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header" style={{width: "100%"}}>
          <Header loading={this.props.loading}/>
        </div>
        <div className="content">
          {this.props.children}
        </div>
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
