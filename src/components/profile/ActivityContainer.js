import React, { Component } from 'react';
import marked from 'marked';
import Entry from '../journal/Entry';
import PostHeatMap from './PostHeatMap';
import _ from 'lodash';

export default class ActivityContainer extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.filterEntriesByDate = this.filterEntriesByDate.bind(this);
    this.getDropdownValue = this.getDropdownValue.bind(this);

    this.state = {
      selectedDate: null,
      display: 5,
    }
  }

  renderEntries() {
    var displayedEntries = this.state.display;
    if (displayedEntries === "Show All") {
      displayedEntries = this.props.data.entries.length;
    }

    if (this.props.data.entries > 1 && this.props.data.entries[0].date < this.props.data.entries[1].date) {
      var reversedEntries = this.props.data.entries.reverse();
    } else {
      var reversedEntries = this.props.data.entries;
    }

    var entries = reversedEntries.map((entry, index) => {
      if (index < displayedEntries) {
        var tags = this.props.data.tags.filter((tag) => {
          return _.contains(entry.tags, tag.id)
        });
        return <Entry key={entry.id} entry={entry} tags={tags} />
      }
    });
    return entries;
  }

  handleClick(dateAndCount) {
    if(dateAndCount) {
      this.setState({
        selectedDate: dateAndCount.date
      });
    } else {
      this.setState({
        selectedDate: null
      });
    }
  }

  filterEntriesByDate() {
    var entries = this.props.data.entries.map((entry) => {
      var entryDate = entry.date.split('T')[0];
      if (entryDate === this.state.selectedDate) {
        var tags = this.props.data.tags.filter((tag) => {
          return _.contains(entry.tags, tag.id)
        });
        return <Entry key={entry.id} entry={entry} tags={tags} />
      }
    });
    return entries;
  }

  getDropdownValue() {
    this.setState({
      display: document.getElementById("recent-activity-dropdown").value
    });
  }

  render() {
    if (this.state.selectedDate) {
      return(
        <div id="heatmap-and-entries">
          <PostHeatMap dates={this.props.dates} onClick={this.handleClick} />
            <p className="subhead">Entries on {this.state.selectedDate}</p>
          <div id="heatmap-entries">
            {this.filterEntriesByDate()}
          </div>
        </div>
      );
    }
    return(
      <div id="activity-container">
        <div id="heatmap-and-entries">
          <PostHeatMap dates={this.props.dates} onClick={this.handleClick} />
        </div>
        <div id="recent-activity-header">
          <p className="subhead">Most Recent Activity</p>
          <select id="recent-activity-dropdown" onChange={this.getDropdownValue}>
            <option defaultValue hidden>Display</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="Show All">Show All</option>
          </select>
        </div>
        <div id="recent-activity">
          {this.renderEntries()}
        </div>
      </div>
    );
  }
}
