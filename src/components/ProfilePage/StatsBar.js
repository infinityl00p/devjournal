import React, { Component } from 'react';
import StatsBarItem from './StatsBarItem'

export default class StatsBar extends Component {
  constructor(props) {
    super(props);

    this.setActiveView = this.setActiveView.bind(this);

    this.state = {
      activeItem: [true, false]
    }
  }

  setActiveView(name) {
    if (name === "Summary") {
      this.setState({
        activeItem: [true, false]
      });

      this.props.onClick('summaryView');
    }

    if (name === "Weekly") {
      this.setState({
        activeItem: [false, true]
      });

      this.props.onClick('weeklyView');
    }

  }

  render() {
    return(
      <div id="stats-bar">
        <StatsBarItem
        name="Summary"
        icon="glyphicon-stats"
        isActive={this.state.activeItem[0]}
        onClick={this.setActiveView}
        />
        <StatsBarItem
        name="Weekly"
        icon="glyphicon-grain"
        isActive={this.state.activeItem[1]}
        onClick={this.setActiveView}
        />
      </div>
    );
  }
}
