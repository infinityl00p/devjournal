import React, { Component } from 'react';
import StatsBar from './StatsBar'

export default class ActivityView extends Component {
  constructor(props) {
    super(props);

    this.handleComponentSelection=this.handleComponentSelection.bind(this);

    this.state = {
      activeComponent: "weekly"
    }
  }

  handleComponentSelection(selectedView) {
    console.log(selectedView);
    switch(selectedView) {
      case 'weekly':
        this.setState({
          activeComponent: 'weekly'
        });
        return;

      case 'monthly':
        this.setState({
          activeComponent: 'monthly'
        });
        return;

      case 'yearly':
        this.setState({
          activeComponent: 'yearly'
        });
        return;
    };
  }

  render() {
    return(
      <div>
      {/*Activity Bar goes here*/}
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} type="time-bar"/>
      {/*Render Page according to state of activity bar*/}
      </div>
    )
  }
}
