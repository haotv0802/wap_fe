import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {List, ListItem} from 'material-ui/List';
import {LinearProgress} from 'material-ui/Progress';

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
      open: false,
      completed: 0
    };
    this.logout = this.logout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openOrCloseDrawer = this.openOrCloseDrawer.bind(this);
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

  logout(event) {
    event.preventDefault();
    this.props.actions.logout(this.state.credentials);
    this.context.router.push('/login');
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>.......</span>}
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            <Button href="https://github.com/callemall/material-ui"
                        label="Home"
                        secondary={false}
                        containerElement={<Link to="/" />}
            />
          }
        />
        <LinearProgress mode="determinate" value={this.state.completed} />
        <Drawer
          open={this.state.open}
          onRequestChange={this.openOrCloseDrawer}
          docked={false}
        >
          <List>
            <ListItem
              key={1}
              primaryText="Crawled data"
              // leftIcon={<ContentSend />}
              disabled={true}
              nestedItems={[
                <ListItem key={1} primaryText="All posts" containerElement={<Link to="/crawledData" />} onClick={this.openOrCloseDrawer}/>
              ]}
            />
            <ListItem
              key={2}
              primaryText="Crawling"
              containerElement={<Link to="/crawling" />}
              onClick={this.openOrCloseDrawer}
            />
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
