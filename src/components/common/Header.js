import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import Button from 'material-ui/Button';
import {LinearProgress} from 'material-ui/Progress';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

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

const muiStyles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};


class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: Object.assign({}, this.props.credentials),
      open: false,
      completed: 0
    };
    this.logout = this.logout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openOrCloseDrawer = this.openOrCloseDrawer.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  handleClick() {
    alert('onClick triggered on the title component');
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  openOrCloseDrawer() {
    this.setState({open: !this.state.open});
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
    console.log("hello");
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 500);
    }
  }

  toggleDrawer(side, open) {
    this.setState({
      [side]: open
    });
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
          position="static"
        >
          <Toolbar>
            <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={muiStyles.flex}>
              Title
            </Typography>
          </Toolbar>
        </AppBar>
        <LinearProgress mode="determinate" value={this.state.completed} />
        <Drawer
          open={this.state.open}
          onRequestChange={this.openOrCloseDrawer}
          docked={false}
        >
            <List>

            </List>
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
