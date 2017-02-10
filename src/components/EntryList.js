import React, { Component } from 'react';
import Entry from './Entry';
import _ from 'lodash';

export default class EntryList extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    var entries = this.props.entries.map((entry) => {
      var tags = this.props.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id)
      });
      return <Entry key={entry.id} entry={entry} tags={tags} />
    });

    return entries;
  }

  render() {
    return(
      <div className="previous-entries">
        {this.renderEntries()}
       </div>
    )
  }
}
