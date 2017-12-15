import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
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
              <Link to="/businessLoans" activeClassName="active">Business Loans</Link>
              &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
              <Link to="/howItWorks" activeClassName="active">How it works</Link>
              &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
              <Link to="/useCases" activeClassName="active">Use Cases</Link>
              &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
              <Link to="/whyAspire" activeClassName="active">Why Aspire</Link>
              {
                this.props.isAuthorized === false ?
                  <span>
                    &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
                    <Link to="/login" activeClassName="active">Login</Link>
                    &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
                    <Link to="/signup" activeClassName="active">Create Account</Link>
                  </span> : <span>

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
  };
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    isAuthorized: state.credentials.isAuthorized
  };
}

export default connect(mapStateToProps)(Header);
