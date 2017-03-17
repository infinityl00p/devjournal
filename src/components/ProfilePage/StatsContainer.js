import React, { Component } from 'react';
import StatsBar from './StatsBar';
import PulseView from './PulseView';
import MonthlyView from './MonthlyView';


export default class StatsContainer extends Component {
  constructor(props) {
    super(props);

    this.handleComponentSelection = this.handleComponentSelection.bind(this);
    this.renderActiveComponent = this.renderActiveComponent.bind(this);
    this.getDates = this.getDates.bind(this);

    this.state = {
      activeComponent: 'pulseView'
    }
  }

  getDates() {
    var dateArray = [];

    this.props.data.entries.forEach(function (entry) {
      dateArray.push(entry.date)
    });
    return dateArray;
  }

  handleComponentSelection(selectedView) {
    switch(selectedView) {
      case 'pulseView':
        this.setState({
          activeComponent: 'pulseView'
        });
        return;

      case 'weeklyView':
        this.setState({
          activeComponent: 'weeklyView'
        });
        return;

      case 'monthlyView':
        this.setState({
          activeComponent: 'monthlyView'
        });
        return;
    };
  }

  renderActiveComponent() {
    var activeComponent = this.state.activeComponent;
    switch (activeComponent) {
      case 'pulseView':
        return(
          <PulseView data={this.props.data} dates={this.getDates()} />
        );
      case 'monthlyView':
        return(
          <MonthlyView data={this.props.data} dates={this.getDates()} />
        );
    }
  }

  render() {
    return(
      <div id="stats-container" className="col-md-9">
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} />
        {this.renderActiveComponent()}
      </div>
    );
  }
}
