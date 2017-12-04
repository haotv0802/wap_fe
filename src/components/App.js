import React, {PropTypes} from 'react';
import Header from "./common/Header";
import {connect} from 'react-redux';
import Favicon from 'react-favicon';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div style={{fontSize: "20px", height: "100px"}}>
          <Header loading={this.props.loading}/>
        </div>
        <div style={{overflow: "auto"}}>
          <div style={{height: "1000px"}}>
            {this.props.children}
          </div>
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
