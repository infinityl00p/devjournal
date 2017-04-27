import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EntryView from './EntryView';
import * as actionCreators from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

var currentEntry = {
  entry: {
    date: "2017-02-22T04:50:46.729656Z",
    entryText:"Default entry, create an entry to remove this text",
    id: 1,
    tags: [1]
  },
  tags: [
    {
      id: 1,
      tagText: '#defaultEntry'
    }
  ]
}

var Entries = {
  entries: [{
    date: "2017-02-22T04:50:46.729656Z",
    entryText:"Default entry, create an entry to remove this text",
    id: 1,
    tags: [1]
  }],
  tags: [
    {
      id: 1,
      tagText: '#defaultEntry'
    }
  ]
};

class JournalPage extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getEntriesAndTags();

    this.handleEntrySelect = this.handleEntrySelect.bind(this);
    this.setActiveEntry = this.setActiveEntry.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.renderNewerEntry = this.renderNewerEntry.bind(this);
    this.renderOlderEntry = this.renderOlderEntry.bind(this);
    this.getEntryIndex = this.getEntryIndex.bind(this);
    this.getEntryTags = this.getEntryTags.bind(this);

    // TODO: update this to set state to:
    // this.props.journal.entries.slice(-1)[0] after successful getEntriesAndTags()
    this.state = {
      selectedEntry: currentEntry
    }
  }

  // TODO: make this better: create helper method to filter by tag
  componentWillReceiveProps(nextProps) {
    nextProps = this.sortByDate(nextProps);
    var firstEntry = nextProps.journal.entries.slice(-1).pop();
    var firstEntryTags = nextProps.journal.tags.filter(function (tag) {
      return _.contains(firstEntry.tags, tag.id)
    });

    var firstEntry = {
      entry: firstEntry,
      tags: firstEntryTags
    };
    this.setState({ selectedEntry: firstEntry });
  }

  setActiveEntry(visibleEntry) {
    this.setState({ selectedEntry: visibleEntry });
  }

  handleEntrySelect(entryAndTags) {
    this.setState({ selectedEntry: entryAndTags });
  }

  sortByDate(props) {
    props.journal.entries.sort(function(a,b) {
      return new Date(a.date) - new Date(b.date);
    })

    return props;
  }

  renderNewerEntry() {
    var entryIndex = this.getEntryIndex();

    var entriesArrayLength = this.props.journal.entries.length;

    if (entryIndex < entriesArrayLength - 1) {
      var tagArray = this.getEntryTags(entryIndex+1);

      var entriesAndTags = {
        entry: this.props.journal.entries[entryIndex+1],
        tags: tagArray
      };

      this.setState({ selectedEntry: entriesAndTags})
    }
  }

  renderOlderEntry() {
    var entryIndex = this.getEntryIndex();

    if (entryIndex > 0) {
      var tagArray = this.getEntryTags(entryIndex-1);

      var entriesAndTags = {
        entry: this.props.journal.entries[entryIndex-1],
        tags: tagArray
      };

      this.setState({ selectedEntry: entriesAndTags})
    }
  }

  getEntryIndex() {
    var entryIndex;

    this.props.journal.entries.forEach((entry, index) => {
        if (entry === this.state.selectedEntry.entry) {
          entryIndex = index;
        }
    });

    return entryIndex;
  }

  getEntryTags(entryIndex) {
    var tagArray = [];

    this.props.journal.tags.forEach((tag1) => {
      this.props.journal.entries[entryIndex].tags.forEach((tag2) => {
        if(tag1.id === tag2) {
          tagArray.push(tag1)
        }
      })
    });

    return tagArray;
  }

  render() {
    // TODO: Make this UX better.
    if (!this.props.journal) {
      return(
        <div id="journal-page-container">
          <Sidebar
            actions={this.props.actions}
            entries={Entries.entries}
            tags={Entries.tags}
            props={this.props}
            onEntryClick={this.handleEntrySelect}
          />
          <EntryView
            currentEntry={this.state.selectedEntry}
            entries={Entries.entries}
            tags={Entries.tags}
            setActiveEntry={this.setActiveEntry}
            onDelete={this.props.actions.deleteEntry}
            onEdit={this.props.actions.updateEntry}
          />
        </div>
      );
    }
    return(
      <div id="journal-page-container">
        <Sidebar
          actions={this.props.actions}
          entries={this.props.journal.entries}
          tags={this.props.journal.tags}
          props={this.props}
          onEntryClick={this.handleEntrySelect}
        />
        <EntryView
          currentEntry={this.state.selectedEntry}
          entries={this.props.journal.entries}
          tags={this.props.journal.tags}
          setActiveEntry={this.setActiveEntry}
          onDelete={this.props.actions.deleteEntry}
          onEdit={this.props.actions.updateEntry}
          renderNewerEntry={this.renderNewerEntry}
          renderOlderEntry={this.renderOlderEntry}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    journal: state.entries
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage)
