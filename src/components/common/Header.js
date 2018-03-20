import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: Object.assign({}, this.props.credentials)
    };
    this.logout = this.logout.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive(tab) {
    this.context.router.push(tab.props['data-route']);
  }

  logout(event) {
    event.preventDefault();
    this.props.actions.logout(this.state.credentials);
    this.context.router.push('/login');
  }

  render() {
    return (
      <Tabs>
        <Tab label="Home"
             data-route="/"
             onActive={this.handleActive}
        />
        <Tab label="Crawled Data"
             data-route="/crawledData"
             onActive={this.handleActive}
        />
        <Tab
          label="Crawling"
          data-route="/crawling"
          onActive={this.handleActive}
        />
      </Tabs>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  credentials: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Header.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    credentials: state.credentials
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
