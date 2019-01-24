import React from "react";
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';


class PostsReportPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]}
    };
  }

  render() {
    return (
      <div className="panel panel-primary">
        < Bar data={this.state.data} />
      </div>
    );
  }
}

PostsReportPage.defaultProps = {
};

PostsReportPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsReportPage);
