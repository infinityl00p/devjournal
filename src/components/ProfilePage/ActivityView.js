import React, { Component } from 'react';
import StatsBar from './StatsBar';
import Progress from './Progress';

export default class ActivityView extends Component {
  constructor(props) {
    super(props);

    this.handleComponentSelection=this.handleComponentSelection.bind(this);

    this.state = {
      activeComponent: "week"
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
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} type="time-bar"/>
        <Progress data={this.props.data} activeComponent={this.state.activeComponent} active={this.state.activeComponent}/>
      </div>
    )
  }
}
