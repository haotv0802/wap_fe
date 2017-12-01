import React from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"  |  "}
      <Link to="/collectedData" activeClassName="active">Collected Data</Link>
      {"  |  "}
      <Link to="/chart" activeClassName="active">Chart</Link>
      {loading && <LoadingDots interval={100} dots={10}/>}
    </nav>
  );
};

export default Header;
