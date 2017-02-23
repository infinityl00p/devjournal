import React, { Component } from 'react';
import EntryViewItem from './EntryViewItem';

export default class EntryViewList extends Component {
  constructor() {
      super();

      this.renderEntryList = this.renderEntryList.bind(this);
  }

  renderEntryList() {
    var entryItems = this.props.entries.map((entry) => {
      var tags = this.props.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id)
      });
      return <EntryViewItem
               key={entry.id}
               date={entry.date}
               entryText={entry.entryText}
               id={entry.id}
               tags={tags}
              />
    });

    return entryItems.reverse();
  }

  render() {
    return(
      <div id="entry-view-list">
          {this.renderEntryList()}
      </div>
    );
  }
}