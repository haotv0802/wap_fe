import React from "react";
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';
import PropTypes from "prop-types";
import DatePicker from 'react-bootstrap-date-picker';
import RaisedButton from "material-ui/RaisedButton";
import {bindActionCreators} from "redux";
import * as postsActions from "../../actions/postsActions";

class PostsReportPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    let now = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);

    this.state = {
      formInputs: Object.assign({}, this.props.formInputs),
      startDate: startDate.toISOString(),
      formattedStartDate: startDate.getUTCDate() + "/" + (startDate.getUTCMonth() + 1) + "/" + startDate.getFullYear(),
      endDate: now.toISOString(),
      formattedEndDate: now.getUTCDate() + "/" + (now.getUTCMonth() + 1) + "/" + now.getFullYear(),
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: "posts",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]
      }
    };

    this.props.postsActions.getPostsReportByDate(this.state.formattedStartDate, this.state.formattedEndDate);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("====== componentWillReceiveProps");
    if (this.props.report !== nextProps.report) {
      console.log("this: ");
      console.log(this.props.report);
      console.log("next: ");
      console.log(nextProps.report);
      let data = this.state.data;
      data.labels = nextProps.report.periods;
      data.datasets[0].data = nextProps.report.figures;
      this.setState({
        data: data
      });

      console.log(this.state.data);
      console.log("====== componentWillReceiveProps");
    }
  }

  handleTextInputChange(event) {
    const field = event.target.name;
    let formInputs = this.state.formInputs;
    formInputs[field] = event.target.value;
    return this.setState({formInputs: formInputs});
  }

  handleStartDateChange(startDate, formattedValue) {
    this.setState({
      startDate: startDate, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedStartDate: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }

  handleEndDateChange(startDate, formattedValue) {
    this.setState({
      endDate: startDate, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedEndDate: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }

  handleReportClick() {
    let startDate = new Date(this.state.startDate);
    let endDate = new Date(this.state.endDate);
    this.props.postsActions.getPostsReportByDate(this.state.formattedStartDate, this.state.formattedEndDate);
  }

  render() {
    return (
      <div className="panel panel-primary">
        <form style={{height: "auto"}}>
          <div style={{display: "inline-block", width: "auto"}}>
            <div style={{width: "50px"}} className="col-sm-1">
              <label>From</label>
            </div>
            <div style={{width: "200px"}} className="col-sm-4">
              <DatePicker id="startDate" value={this.state.startDate} onChange={this.handleStartDateChange}
                          style={{"width": "140px"}} dateFormat="DD/MM/YYYY"/>
            </div>

            <div style={{width: "50px"}} className="col-sm-1">
              <label>To</label>
            </div>
            <div style={{width: "200px"}} className="col-sm-4">
              <DatePicker id="endDate" value={this.state.endDate} onChange={this.handleEndDateChange}
                          style={{"width": "140px"}}  dateFormat="DD/MM/YYYY"/>
            </div>
            <div style={{width: "100px"}} className="col-sm-1">
              <RaisedButton label="Report" primary={true} onClick={this.handleReportClick}/>
            </div>
          </div>
        </form>
        <div style={{"width": "1024px"}}>
          < Bar data={this.state.data}/>
        </div>
      </div>
    );
  }
}

PostsReportPage.defaultProps = {
  formInputs: {"from": "123", "to": "456"}
};

PostsReportPage.propTypes = {
  formInputs: PropTypes.object,
  postsActions: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log(state.post);
  return {
    report: state.post.reportByDate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsReportPage);
