import React, { Component } from 'react';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionBar from './ActionBar';
import JournalPage from './journal/JournalPage';
import TodoList from './todo/TodoList';
import ProfilePage from './profile/ProfilePage';

const USER_ID = localStorage.getItem('userId');

class App extends Component {
  constructor(props) {
    super(props);

    this.renderActiveComponent = this.renderActiveComponent.bind(this);
    this.handleActiveComponentChange = this.handleActiveComponentChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

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
        return(
          <JournalPage
            entries={this.state.entries.entries}
            tags={this.state.entries.tags}
            actions={this.props.actions}
            userId={USER_ID}
            onFilter={this.handleFilter}
          />
        );
      case 'todo':
        return(
          <TodoList
            tasks={this.state.tasks}
            actions={this.props.actions}
            tags={this.state.entries.tags}
            userId={USER_ID}
          />
        );
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
        var searchEntries = this.props.entries.entries.filter(function (entry) {
          return _.contains(entry.entryText.toLowerCase(), searchTerm.toLowerCase())
        });

        var searchResults = {
          entries: searchEntries,
          tags: this.state.entries.tags
        };

        this.setState({ entries: searchResults });
        return;
      case 'todo':
        return;
      case 'profile':
        return;
      default:
        return;
    }
  }

  // TODO: Make Searching and Filtering use the same set of entries (not this.props.entries)
  handleFilter(filteredTagIds) {
    // console.log('filteredTagIds: ' + filteredTagIds);
    if (filteredTagIds.length > 0) {
      var filteredEntries = this.props.entries.entries.filter(function (entry) {
        var intersectedTags = _.intersection(entry.tags, filteredTagIds);
        return intersectedTags > 0;
      });

      var filterResults = {
        entries: filteredEntries,
        tags: this.state.entries.tags
      };

      this.setState({ entries: filterResults });
    } else {
      this.setState({ entries: this.props.entries });
    }
  }

  render() {
    if (this.state.isLoading) {
      return(
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
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