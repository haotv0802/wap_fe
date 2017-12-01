import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <div className="container-fluid" style={{width: '850px'}}>
      <div className="row" >
        <div className="col-md-2">
          <img src={require("../../assets/images/logo.png")}
               className="img-responsive center-block"
               style={{maxHeight: '54px', maxWidth: '188px'}}/>
        </div>
        <div className="col-md-10" style={{textAlign: 'left', textIndent: '150px'}}>
          <nav>
            <IndexLink to="/" activeClassName="active"/>
            &nbsp;&nbsp;&nbsp;
            <Link to="/businessLoans" activeClassName="active">Business Loans    </Link>
            &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
            <Link to="/howItWorks" activeClassName="active">How it works    </Link>
            &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
            <Link to="/useCases" activeClassName="active">Use Cases    </Link>
            &nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;
            <Link to="/whyAspire" activeClassName="active">Why Aspire</Link>
            &nbsp;&nbsp;&nbsp;<LoadingDots interval={100} dots={10}/>
          </nav>
        </div>
      </div>
      <div style={{border: '1px solid black'}} />
    </div>
  );
};


Header.propTypes = {
};

export default Header;
