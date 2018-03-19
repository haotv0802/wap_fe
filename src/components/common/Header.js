import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: Object.assign({}, this.props.credentials)
    };
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.actions.logout(this.state.credentials);
    this.context.router.push('/login');
  }

  render() {
    return (
      <div className="container-fluid" style={{width: '100%', height: '100%'}}>
        <div className="row">
          <div className="col-md-2">
            <IndexLink to="/" activeClassName="active">
              <img src={require("../../assets/images/logo.png")}
                   className="img-responsive center-block"
                   style={{maxHeight: '54px', maxWidth: '188px'}}/>
            </IndexLink>
          </div>
          <div className="col-md-10" style={{textAlign: 'left', textIndent: '150px'}}>
            <nav>
              &nbsp;&nbsp;&nbsp;
              <Link to="/crawledData" activeClassName="active">Crawled Data</Link>
              &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
              <Link to="/crawling" activeClassName="active">Crawling</Link>
              {
                this.props.credentials.isAuthorized === false ?
                  <span>
                    &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
                    <Link to="/login" activeClassName="active">Login</Link>
                    &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
                    <Link to="/signup" activeClassName="active">Create Account</Link>
                  </span> : <span>
                    &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
                    <Link to="/#" activeClassName="" onClick={this.logout}>Logout</Link>
                  </span>
              }
              &nbsp;&nbsp;&nbsp;
              {this.props.loading && <LoadingDots interval={100} dots={10}/>}
            </nav>
          </div>
        </div>

        <div style={{border: '1px solid gray'}}/>
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
