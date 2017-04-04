import React, { Component } from 'react';
import PostHeatMap from './PostHeatMap';
import Entry from '../JournalPage/Entry';
import _ from 'lodash';

export default class PostByDate extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.filterEntriesByDate = this.filterEntriesByDate.bind(this);

    this.state = {
      selectedDate: null
    }
  }

  handleClick(dateAndCount) {
    if(dateAndCount) {
      this.setState({
        selectedDate: dateAndCount.date
      });
    } else {
      this.setState({
        selectedDate: null
      })
    }
  }

  filterEntriesByDate() {
    if(this.state.selectedDate) {
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
  }
  render() {
    if (this.state.selectedDate) {
      return(
        <div id="heatmap-and-entries">
          <PostHeatMap dates={this.props.dates} onClick={this.handleClick}/>
            <p className="subhead">
              Entries on {this.state.selectedDate}
            </p>
          <div id="heatmap-entries">
            {this.filterEntriesByDate()}
          </div>
        </div>
      );
    }
    return(
      <div id="heatmap-and-entries">
        <PostHeatMap dates={this.props.dates} onClick={this.handleClick}/>
      </div>
    );
  }
}
