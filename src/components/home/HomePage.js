import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body"  >
          <div className="row" >
            <img src={require("../../assets/images/logo.png")}
                 className="img-responsive center-block"
                 style={{maxHeight:'300px', paddingBottom:'50px'}}/>
          </div>
        </div>
        <div className="bubblingG">
          <span id="bubblingG_1">
          </span>
            <span id="bubblingG_2">
          </span>
            <span id="bubblingG_3">
          </span>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

HomePage.defaultProps = {
  pageTitle: "Home Page"
};

export default HomePage;
