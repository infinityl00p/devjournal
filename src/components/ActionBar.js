import React, { Component } from 'react';
import ActionBarItem from './ActionBarItem';

export default class ActionBar extends Component {
  constructor() {
    super();

    this.renderEntryForm = this.renderEntryForm.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderFilterOptions = this.renderFilterOptions.bind(this);
    this.renderViewOptions = this.renderViewOptions.bind(this);

    this.state = {
      activeItem: [false, false, false, false]
    }
  }

  renderEntryForm() {
    this.setState({
      activeItem: [true, false, false , false]
    });
  }

  renderSearchBar() {
    this.setState({
      activeItem: [false, true, false , false]
    });
  }

  renderFilterOptions() {
    this.setState({
      activeItem: [false, false, true , false]
    });
  }

  renderViewOptions() {
    this.setState({
      activeItem: [false, false, false , true]
    });
  }

  render() {
    return(
      <div id="action-bar">
        <ActionBarItem
          key="create"
          icon="glyphicon-plus"
          isActive={this.state.activeItem[0]}
          text="CREATE"
          onClick={this.renderEntryForm}
        />
        <ActionBarItem
          key="search"
          icon="glyphicon-search"
          isActive={this.state.activeItem[1]}
          text="SEARCH"
          onClick={this.renderSearchBar}
        />
        <ActionBarItem
          key="filter"
          icon="glyphicon-filter"
          isActive={this.state.activeItem[2]}
          text="FILTER"
          onClick={this.renderFilterOptions}
        />
        <ActionBarItem
          key="view"
          icon="glyphicon-th-large"
          isActive={this.state.activeItem[3]}
          text="VIEW"
          onClick={this.renderViewOptions}
        />
      </div>
    );
  }
}