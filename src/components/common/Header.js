import React from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav style={{textAlign: 'right'}}>
      <IndexLink to="/" activeClassName="active">Aspire</IndexLink>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/businessLoans" activeClassName="active">Business Loans    </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/howItWorks" activeClassName="active">How it works    </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/useCases" activeClassName="active">Use Cases    </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;{"  |  "}&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/whyAspire" activeClassName="active">Why Aspire</Link>
      {loading && <LoadingDots interval={100} dots={10}/>}
    </nav>
  );
};

export default Header;
