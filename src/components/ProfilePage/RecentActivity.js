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
    var entries = this.props.data.entries.map((entry) => {
      var tags = this.props.data.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id)
      });
      return <Entry key={entry.id} entry={entry} tags={tags} />
    });
    return entries.reverse();
  }

  render() {
    return(
      <div id="recent-activity-container">
        {this.renderEntries()}
      </div>
    );
  }
}
