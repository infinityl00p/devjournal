import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EntryView from './EntryView';
import * as actionCreators from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const LOGIN_URL = "http://localhost:8080/login";
const USER_ID = localStorage.getItem('userId');


class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.setActiveEntry = this.setActiveEntry.bind(this);
    this.handleEntrySelect = this.handleEntrySelect.bind(this);
    this.setActiveEntry = this.setActiveEntry.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.renderNewerEntry = this.renderNewerEntry.bind(this);
    this.renderOlderEntry = this.renderOlderEntry.bind(this);
    this.getEntryIndex = this.getEntryIndex.bind(this);
    this.getEntryTags = this.getEntryTags.bind(this);

    var sortedProps = this.sortByDate(props);
    var firstEntry = sortedProps.entries.slice(-1).pop();
    var firstEntryTags = sortedProps.tags.filter(function (tag) {
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

  handleEntrySelect(entryAndTags) {
    this.setState({ selectedEntry: entryAndTags });
  }

  sortByDate(props) {
    props.journal.entries.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    })

    return props;
  }

  renderNewerEntry() {
    var entryIndex = this.getEntryIndex();

    var entryCount = this.props.journal.entries.length;

    if (entryIndex < entryCount - 1) {
      var entryTagArray = this.getEntryTags(entryIndex+1);

      var entriesAndTags = {
        entry: this.props.journal.entries[entryIndex+1],
        tags: entryTagArray
      };

      this.setState({ selectedEntry: entriesAndTags})
    }
  }

  renderOlderEntry() {
    var entryIndex = this.getEntryIndex();

    if (entryIndex > 0) {
      var entryTagArray = this.getEntryTags(entryIndex-1);

      var entriesAndTags = {
        entry: this.props.journal.entries[entryIndex-1],
        tags: entryTagArray
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
          tagArray.push(tag1);
        }
      })
    });

    return tagArray;
  }

  render() {
    return(
      <div id="journal-page-container">
        <Sidebar
          actions={this.props.actions}
          entries={this.props.journal.entries}
          tags={this.props.journal.tags}
          props={this.props}
          onEntryClick={this.handleEntrySelect}
          onFilter={this.props.onFilter}
        />
        <EntryView
          currentEntry={this.state.selectedEntry}
          entries={this.props.entries}
          tags={this.props.tags}
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

