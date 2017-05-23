import React, { Component } from 'react';
import JournalSidebar from './JournalSidebar';
import EntryView from './EntryView';
import _ from 'lodash';

export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
    this.setActiveEntry = this.setActiveEntry.bind(this);

    var firstEntry = this.props.entries.slice(-1).pop();
    var firstEntryTags = this.props.tags.filter(function (tag) {
      return _.contains(firstEntry.tags, tag.id)
    });
    var defaultEntry = {
      entry: firstEntry,
      tags: firstEntryTags
    };

    this.state = {
      selectedEntry: defaultEntry,
      visibleEntries: this.props.entries
    }
  }

  setActiveEntry(visibleEntry) {
    this.setState({ selectedEntry: visibleEntry });
  }

  handleFilter(filteredTagIds) {
    if (filteredTagIds.length > 0) {
      var filteredEntries = this.props.entries.filter(function (entry) {
        var intersectedTags = _.intersection(entry.tags, filteredTagIds);
        return intersectedTags > 0;
      });

      this.setState({ filteredEntries: filteredEntries });
    } else {
      this.setState({ filteredEntries: this.props.entries });
    }
  }

  render() {
    return(
      <div id="journal-page-container">
        <JournalSidebar
          actions={this.props.actions}
          entries={this.props.entries}
          tags={this.props.tags}
          props={this.props}
          onFilter={this.handleFilter}
        />
        <EntryView
          currentEntry={this.state.selectedEntry}
          entries={this.props.entries}
          tags={this.props.tags}
          setActiveEntry={this.setActiveEntry}
          onDelete={this.props.actions.deleteEntry}
        />
      </div>
    );
  }
}
