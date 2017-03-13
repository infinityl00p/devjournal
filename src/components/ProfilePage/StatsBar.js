import React, { Component } from 'react';
import StatsBarItem from './StatsBarItem'

export default class StatsBar extends Component {
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

    this.props.onClick('pulseView');
  }

  handleWeeklyClick() {
    this.setState({
      activeItem: [false, true, false]
    });

    this.props.onClick('weeklyView');
  }

  handleMonthlyClick() {
    this.setState({
      activeItem: [false, false, true]
    });

    this.props.onClick('monthlyView');
  }

  render() {
    return(
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
    );
  }
}
