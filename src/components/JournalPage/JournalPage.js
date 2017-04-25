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
