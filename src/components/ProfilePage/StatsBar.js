import React, { Component } from 'react';
import StatsBarItem from './StatsBarItem'

export default class StatsBar extends Component {
  constructor() {
    super();

    this.setActiveView = this.setActiveView.bind(this);
    this.setActiveTimeView = this.setActiveTimeView.bind(this);

    this.state = {
      activeItem: [true, false],
      activeTimeView: [true, false, false]
    }
  }

  setActiveView(name) {
    if (name === "Summary") {
      this.setState({
        activeItem: [true, false]
      });

      this.props.onClick('summaryView');
    }

    if (name === "Progress") {
      this.setState({
        activeItem: [false, true]
      });

      this.props.onClick('progressView');
    }
  }

  setActiveTimeView(name) {
    if (name === "Weekly") {
      this.setState({
        activeTimeView: [true, false, false]
      });

      this.props.onClick('weekly');
    }

    if (name === "Monthly") {
      this.setState({
        activeTimeView: [false, true, false]
      });

      this.props.onClick('monthly');
    }

    if (name === "Yearly") {
      this.setState({
        activeTimeView: [false, false, true]
      });

      this.props.onClick('yearly');
    }
  }

  renderStatsBar() {
    if(this.props.type === "stats-bar") {
      return(
        <div id={"stats-bar"}>
          <StatsBarItem
          name="Summary"
          type="stats-bar-item"
          isActive={this.state.activeItem[0]}
          onClick={this.setActiveView}
          />
          <StatsBarItem
          name="Progress"
          type="stats-bar-item"
          isActive={this.state.activeItem[1]}
          onClick={this.setActiveView}
          />
        </div>
      );
    }

    if(this.props.type === "time-bar") {
      return(
        <div id="time-bar">
          <StatsBarItem
            name="Weekly"
            type="time-bar-item"
            isActive={this.state.activeTimeView[0]}
            onClick={this.setActiveTimeView}
          />
          <StatsBarItem
            name="Monthly"
            type="time-bar-item"
            isActive={this.state.activeTimeView[1]}
            onClick={this.setActiveTimeView}
          />
          <StatsBarItem
            name="Yearly"
            type="time-bar-item"
            isActive={this.state.activeTimeView[2]}
            onClick={this.setActiveTimeView}
          />
        </div>
      );
    }
  }

  render() {
    return(
      <div id="title-bar">
        {this.renderStatsBar()}
      </div>
    );
  }
}
