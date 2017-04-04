import React, { Component } from 'react';
import StatsBar from './StatsBar';
import ProgressContainer from './ProgressContainer';

export default class ProfileProgressView extends Component {
  constructor() {
    super();

    this.handleComponentSelection = this.handleComponentSelection.bind(this);

    this.state = {
      activeComponent: "Week"
    }
  }

  handleComponentSelection(selectedView) {
    switch(selectedView) {
      case 'weekly':
        this.setState({
          activeComponent: 'Week'
        });
        return;

      case 'monthly':
        this.setState({
          activeComponent: 'Month'
        });
        return;

      case 'yearly':
        this.setState({
          activeComponent: 'Year'
        });
        return;
    };
  }

  render() {
    return(
      <div>
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} type="time-bar" />
        <ProgressContainer data={this.props.data} activeComponent={this.state.activeComponent} />
      </div>
    );
  }
}
