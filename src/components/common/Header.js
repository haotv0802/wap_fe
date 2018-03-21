import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

const iconStyles = {
  marginRight: 24
};


class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: Object.assign({}, this.props.credentials),
      open: false
    };
    this.logout = this.logout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  handleClick() {
    alert('onClick triggered on the title component');
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleRequestChange() {
    this.setState({open: !this.state.open});
  }

  logout(event) {
    event.preventDefault();
    this.props.actions.logout(this.state.credentials);
    this.context.router.push('/login');
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>Title</span>}
          onTitleClick={this.handleClick}
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            <FlatButton href="https://github.com/callemall/material-ui"
                        label="Home"
                        secondary={false}
                        containerElement={<Link to="/" />}
            />
          }
        />
        <Drawer
          open={this.state.open}
          onRequestChange={this.handleRequestChange}
          docked={false}
        >
          <MenuItem containerElement={<Link to="/crawledData" />}>Crawled Data</MenuItem>
          <MenuItem containerElement={<Link to="/crawling" />}>Crawling</MenuItem>
        </Drawer>
      </div>
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
