import React, { Component } from 'react';
import marked from 'marked';
import Entry from '../JournalPage/Entry';
import _ from 'lodash';

export default class RecentActivity extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);

    this.state = {
      reverse: false
    }
  }

  componentWillReceiveProps() {
    if(!this.state.reverse) {
      this.setState({
        reverse: true
      });
    }
  }

  renderEntries() {
    var displayedEntries = this.props.display;
    if (displayedEntries === "Show All") {
      displayedEntries = this.props.data.entries.length;
    }
    if(!this.state.reverse) {
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

  render() {
    return(
      <div id="recent-activity">
        {this.renderEntries()}
      </div>
    );
  }
}
