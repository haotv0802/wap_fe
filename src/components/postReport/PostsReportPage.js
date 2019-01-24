import React from "react";
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';
import TextInputWithLabel from "../common/TextInputWithLabel";
import PropTypes from "prop-types";
import DatePicker from 'react-bootstrap-date-picker';

class PostsReportPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      formInputs: Object.assign({}, this.props.formInputs),
      startDate: "",
      endDate: "",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]
      }
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);

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
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }

  handleEndDateChange(startDate, formattedValue) {
    this.setState({
      endDate: startDate, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
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
                          style={{"width": "140px"}}/>
            </div>

            <div style={{width: "50px"}} className="col-sm-1">
              <label>To</label>
            </div>
            <div style={{width: "200px"}} className="col-sm-4">
              <DatePicker id="endDate" value={this.state.endDate} onChange={this.handleEndDateChange}
                          style={{"width": "140px"}}/>
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
  formInputs: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsReportPage);
