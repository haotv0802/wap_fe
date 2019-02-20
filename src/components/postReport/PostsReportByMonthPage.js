import React from "react";
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import {bindActionCreators} from "redux";
import * as postsActions from "../../actions/postsActions";
import MenuItem from "material-ui/MenuItem";
import Select from "material-ui/SelectField";

class PostsReportByMonthPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    let now = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);

    this.state = {
      formInputs: Object.assign({}, this.props.formInputs),
      startMonth: 5,
      startYear: 2018,
      endMonth: 3,
      endYear: 2019,
      data: {
        labels: [],
        datasets: [{
          label: "posts",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: []
        }]
      }
    };

    this.props.postsActions.getPostsReportByMonth(this.state.startMonth, this.state.startYear, this.state.endMonth, this.state.endYear);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
    this.handleStartMonthChange = this.handleStartMonthChange.bind(this);
    this.handleStartYearChange = this.handleStartYearChange.bind(this);
    this.handleEndMonthChange = this.handleEndMonthChange.bind(this);
    this.handleEndYearChange = this.handleEndYearChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.report !== nextProps.report) {
      let data = this.state.data;
      data.labels = nextProps.report.periods;
      data.datasets[0].data = nextProps.report.figures;
      this.setState({
        data: data
      });
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
    // console.log(this.state);
    this.props.postsActions.getPostsReportByMonth(this.state.startMonth, this.state.startYear, this.state.endMonth, this.state.endYear);
  }

  handleStartMonthChange(event, key, value) {
    this.setState({
      startMonth: value
    });
  }

  handleStartYearChange(event, key, value) {
    this.setState({
      startYear: value
    });
  }

  handleEndMonthChange(event, key, value) {
    this.setState({
      endMonth: value
    });
  }

  handleEndYearChange(event, key, value) {
    this.setState({
      endYear: value
    });
  }

  render() {
    const months = [];
    for (let i=0; i <= 12; i++) {
      months.push(<MenuItem key={i} value={i} primaryText={i} />);
    }
    const years = [];
    for (let i=2018; i <= 2020; i++) {
      years.push(<MenuItem key={i} value={i} primaryText={i} />);
    }
    return (
      <div className="panel panel-primary">
        <form style={{height: "auto"}}>
          <div style={{display: "inline-block", width: "auto"}}>
            <div style={{width: "60px"}} className="col-sm-1">
              <label>Start month</label>
            </div>
            <div style={{width: "70px"}} className="col-sm-2">
              <Select
                name="type"
                value={this.state.startMonth}
                style={{width: "70px"}}
                onChange={this.handleStartMonthChange}
              >
                {months}
              </Select>
            </div>

            <div style={{width: "60px"}} className="col-sm-1">
              <label>Start year</label>
            </div>
            <div style={{width: "70px"}} className="col-sm-2">
              <Select
                name="type"
                value={this.state.startYear}
                style={{width: "70px"}}
                onChange={this.handleStartYearChange}
              >
                {years}
              </Select>
            </div>
            <div style={{width: "60px"}} className="col-sm-1">
              <label>End month</label>
            </div>
            <div style={{width: "70px"}} className="col-sm-2">
              <Select
                name="type"
                value={this.state.endMonth}
                style={{width: "70px"}}
                onChange={this.handleEndMonthChange}
              >
                {months}
              </Select>
            </div>

            <div style={{width: "60px"}} className="col-sm-1">
              <label>End year</label>
            </div>
            <div style={{width: "70px"}} className="col-sm-2">
              <Select
                name="type"
                value={this.state.endYear}
                style={{width: "70px"}}
                onChange={this.handleEndYearChange}
              >
                {years}
              </Select>
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

PostsReportByMonthPage.defaultProps = {
  formInputs: {"from": "123", "to": "456"}
};

PostsReportByMonthPage.propTypes = {
  formInputs: PropTypes.object,
  postsActions: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    report: state.post.reportByMonth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsReportByMonthPage);
