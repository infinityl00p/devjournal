import React, { Component } from 'react';
import StatsBar from './StatsBar';
import SummaryView from './SummaryView';
import ActivityView from './ActivityView';

export default class ActiveProfileView extends Component {
  constructor(props) {
    super(props);

    this.handleComponentSelection = this.handleComponentSelection.bind(this);
    this.renderActiveComponent = this.renderActiveComponent.bind(this);
    this.getDates = this.getDates.bind(this);

    this.state = {
      activeComponent: 'summaryView'
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
      case 'summaryView':
        this.setState({
          activeComponent: 'summaryView'
        });
        return;

      case 'activityView':
        this.setState({
          activeComponent: 'activityView'
        });
        return;
    };
  }

  renderActiveComponent() {
    var activeComponent = this.state.activeComponent;
    switch (activeComponent) {
      case 'summaryView':
        return(
          <SummaryView data={this.props.data} dates={this.getDates()} />
        );

      case 'activityView':
        return(
          <ActivityView data={this.props.data}/>
        )
    }
  }

  render() {
    return(
      <div id="stats-container" className="col-md-9">
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} type="stats-bar"/>
        {this.renderActiveComponent()}
      </div>
    );
  }
}
