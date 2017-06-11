import React, { Component } from 'react';
import StatsBar from './StatsBar';
import ProfileSummaryView from './ProfileSummaryView';
import ProfileProgressView from './ProfileProgressView';

export default class ActiveProfileView extends Component {
  constructor() {
    super();

    this.handleComponentSelection = this.handleComponentSelection.bind(this);
    this.renderActiveComponent = this.renderActiveComponent.bind(this);
    this.getDates = this.getDates.bind(this);

    this.state = {
      activeComponent: 'summaryView'
    }
  }

  getDates() {
    var dateArray = [];

    dateArray = this.props.data.entries.map(function (entry) {
      return entry.date
    });

    return dateArray;
  }

  handleComponentSelection(selectedView) {
    this.setState({
      activeComponent: selectedView
    });
  }

  renderActiveComponent() {
    switch (this.state.activeComponent) {
      case 'summaryView':
        return(<ProfileSummaryView data={this.props.data} dates={this.getDates()} />);

      case 'progressView':
        return(<ProfileProgressView data={this.props.data} />);
    }
  }

  render() {
    return(
      <div>
        <StatsBar data={this.props.data} onClick={this.handleComponentSelection} type="stats-bar"/>
        {this.renderActiveComponent()}
      </div>
    );
  }
}
