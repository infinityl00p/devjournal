import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EntryView from './EntryView';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

var tempEntry = {
  entry: {
    date: "2017-02-22T04:50:46.729656Z",
    entryText:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    id: 28,
    tags: [29, 31, 34]
  },
  tags: [
    {
      id: 29,
      tagText: '#first'
    },
    {
      id: 31,
      tagText: '#second'
    },
    {
      id: 34,
      tagText: '#third'
    }
  ]
};

class JournalPage extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getEntriesAndTags();

    this.handleEntrySelect = this.handleEntrySelect.bind(this);
    this.setActiveEntry = this.setActiveEntry.bind(this);
    // TODO: update this to set state to:
    // this.props.journal.entries.slice(-1)[0] after successful getEntriesAndTags()
    this.state = {
      selectedEntry: tempEntry
    }
  }

  // TODO: make this better: create helper method to filter by tag
  componentWillReceiveProps(nextProps) {
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

  render() {
    // TODO: Make this UX better.
    if (!this.props.journal) {
      return(
        <div><h3>Loading...</h3></div>
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
