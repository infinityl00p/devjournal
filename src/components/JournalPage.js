import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EntryView from './EntryView';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.props.actions.getEntriesAndTags();
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
        />
        <EntryView />
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
