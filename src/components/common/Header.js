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
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';


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
      credentials: Object.assign({}, this.props.credentials),
      open: false
    };
    this.logout = this.logout.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleActive(tab) {
    this.context.router.push(tab.props['data-route']);
  }

  handleClick() {
    alert('onClick triggered on the title component');
  }

  handleToggle() {
    this.setState({open: !this.state.open})
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
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<RaisedButton
            label="Toggle Drawer"
            onClick={this.handleToggle}
          />}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
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
