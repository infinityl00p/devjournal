import React, { Component } from 'react';
import ActionBar from './ActionBar';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import EntrySearch from './EntrySearch';


export default class Sidebar extends Component {
  constructor() {
    super();

    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.renderActionComponent = this.renderActionComponent.bind(this);

    this.state = {
      activeComponent: ''
    }
  }

  handleActionSelect(actionType) {
    switch(actionType) {
      case 'create':
        console.log('create');
        this.setState({ activeComponent: 'EntryForm' });
        return;
      case 'search':
        this.setState({ activeComponent: 'EntrySearch' });
        return;
      case 'filter':
        this.setState({ activeComponent: 'EntryFilter' });
        return;
      case 'list':
        console.log('list?');
        this.setState({ activeComponent: 'EntryList' });
        return;
    }
  };

  renderActionComponent() {
    var ac = this.state.activeComponent;
    switch(ac) {
      case 'EntryForm':
        return(
          <EntryForm
            entries={this.props.entries}
            tags={this.props.tags}
            handleCreate={this.props.actions.createEntryAndTags}
            onSubmit={this.createEntryAndTags}
          />
        );

      case 'EntrySearch':
        return(
          <EntrySearch onSubmit={this.handleEntrySearch} />
        );
        // TODO: Also render an EntryList with updated values
      case 'EntryFilter':
        return;
      case 'EntryList':
        return(
          <EntryList
            entries={this.props.entries}
            tags={this.props.tags}
          />
        );

      default:
        return;
    }
  }

  handleEntrySearch(searchText) {
    console.log("add me");
  }

  render() {
    return(
      <div className="col-md-4" id="sidebar">
        <ActionBar
          entries={this.props.entries}
          tags={this.props.tags}
          onSelect={this.handleActionSelect}
        />
        <ul className="sidebar-components">
          <li>{this.renderActionComponent()}</li>
        </ul>
      </div>
    );
  }
}