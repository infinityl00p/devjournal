import React, { Component } from 'react';
import marked from 'marked';
import Entry from '../JournalPage/Entry';
import _ from 'lodash';

export default class RecentActivity extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    var displayedEntries = this.props.display;
    if (displayedEntries === "Show All") {
      displayedEntries = this.props.data.entries.length;
    }
    var entries = this.props.data.entries.reverse().map((entry, index) => {
      if (index < displayedEntries) {
        var tags = this.props.data.tags.filter((tag) => {
          return _.contains(entry.tags, tag.id)
        });
      }

      if (index < displayedEntries) {
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
