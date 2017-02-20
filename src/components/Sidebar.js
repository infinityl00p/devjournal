import React, { Component } from 'react';
import ActionBar from './ActionBar';
import EntryForm from './EntryForm';
import EntryList from './EntryList';


export default class Sidebar extends Component {
  render() {
    // TODO: Probably handle calls to ActionCreators here instead of arbitrarily passing it one level higher
    // We also need to look into using col-md-4 instead of fixed positioning
    return(
      <div className="col-md-4" id="sidebar">
        <ActionBar
          entries={this.props.entries}
          tags={this.props.tags}
        />
        <ul className="sidebar-components">
          <li>
            <EntryForm
              entries={this.props.entries}
              tags={this.props.tags}
              handleCreate={this.props.actions.createEntryAndTags}
              onSubmit={this.createEntryAndTags}
            />
          </li>
          <li>
            <EntryList
              entries={this.props.entries}
              tags={this.props.tags}
            />
          </li>
        </ul>
      </div>
    );
  }
}