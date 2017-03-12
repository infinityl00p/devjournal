import React, { Component } from 'react';
import StatsBarItem from './StatsBarItem'

export default class StatsContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePulseClick = this.handlePulseClick.bind(this);
    this.handleWeeklyClick = this.handleWeeklyClick.bind(this);
    this.handleMonthlyClick = this.handleMonthlyClick.bind(this);

    this.state = {
      activeItem: [true, false, false]
    }
  }

  handlePulseClick() {
    this.setState({
      activeItem: [true, false, false]
    });
  }

  handleWeeklyClick() {
    this.setState({
      activeItem: [false, true, false]
    });
  }

  handleMonthlyClick() {
    this.setState({
      activeItem: [false, false, true]
    });
  }

  render() {
    return(
      <div id="stats-container">
        <div id="stats-bar">
          <StatsBarItem
          name="Pulse"
          icon="glyphicon-stats"
          isActive={this.state.activeItem[0]}
          onClick={this.handlePulseClick}
          />
          <StatsBarItem
          name="Weekly Growth"
          icon="glyphicon-grain"
          isActive={this.state.activeItem[1]}
          onClick={this.handleWeeklyClick}
          />
          <StatsBarItem
          name="Monthly Timeline"
          icon="glyphicon-calendar"
          isActive={this.state.activeItem[2]}
          onClick={this.handleMonthlyClick}
          />
        </div>
        <div id="stats-view">
        </div>
      </div>
    )
  }
}
