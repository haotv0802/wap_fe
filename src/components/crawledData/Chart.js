import React, {Component, PropTypes} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData
    };
  }

  render() {

    return(
      <div className="chart">
        <Bar
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.displayText,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}


Chart.propTypes = {
  displayTitle: PropTypes.bool.isRequired,
  displayText: PropTypes.string.isRequired,
  displayLegend: PropTypes.bool.isRequired,
  legendPosition: PropTypes.string.isRequired
};

Chart.defaultProps = {
  displayTitle: true,
  displayText: 'Largest Cities in Massachusetts',
  displayLegend: true,
  legendPosition: 'right'
};

export default Chart;
