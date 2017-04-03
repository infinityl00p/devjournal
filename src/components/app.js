import React, { Component } from 'react';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionBar from './ActionBar';
import JournalPage from './journal/JournalPage';
import TodoList from './todo/TodoList';
import ProfilePage from './profile/ProfilePage';

const USER_ID = 2;

class App extends Component {
  constructor(props) {
    super(props);

    this.renderActiveComponent = this.renderActiveComponent.bind(this);
    this.handleActiveComponentChange = this.handleActiveComponentChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      activeComponent: 'journal',
      entries: [],
      tasks: [],
      isLoading: true
    };

    this.props.actions.getEntriesAndTags(USER_ID);
    this.props.actions.getTasks(USER_ID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks) {
      this.setState({ tasks: nextProps.tasks.tasks });
    }
    if (nextProps.entries) {
      this.setState({ entries: nextProps.entries });
    }
    if (nextProps.tasks  && nextProps.entries) {
      this.setState({ isLoading: false });
    }
  }

  renderActiveComponent() {
    switch(this.state.activeComponent) {
      case 'journal':
        return <JournalPage entries={this.state.entries.entries} tags={this.state.entries.tags} actions={this.props.actions} userId={USER_ID} />;
      case 'todo':
        return <TodoList tasks={this.state.tasks} actions={this.props.actions} tags={this.state.entries.tags} userId={USER_ID} />;
      case 'profile':
        return <ProfilePage />;
    }
  }

  handleActiveComponentChange(activeComponent) {
    this.setState({ activeComponent: activeComponent });
  }

  handleSearch(searchTerm, componentType) {
    switch(componentType) {
      case 'journal':
        var searchEntries = this.props.journal.entries.filter(function (entry) {
          return _.contains(entry.entryText.toLowerCase(), searchTerm.toLowerCase())
        });

        this.setState({ entries: searchEntries });
        return;
      case 'todo':
        // console.log(searchTerm);
        return;
      case 'profile':
        return;
    }
  }

  render() {
    // TODO: Make this UX better.
    if (this.state.isLoading) {
      return(
        <div><h3>Loading...</h3></div>
      );
    }

    return(
      <div className='wrapper'>
        <ActionBar
          onNav={this.handleActiveComponentChange}
          activeView={this.state.activeComponent}
          onSearch={this.handleSearch}
          entries={this.state.entries}
        />
        { this.renderActiveComponent() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // TODO: Probably call this journalData
    entries: state.entries,
    tasks: state.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)