import React, { Component } from 'react';
import ActionBarItem from './ActionBarItem';

export default class ActionBar extends Component {
  constructor() {
    super();

    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleListClick = this.handleListClick.bind(this);

    this.state = {
      activeItem: [false, false, false, false]
    }
  }

  handleCreateClick() {
    this.setState({
      activeItem: [true, false, false , false]
    });

    this.props.onSelect('create');
  }

  handleSearchClick() {
    this.setState({
      activeItem: [false, true, false , false]
    });

    this.props.onSelect('search');
  }

  handleFilterClick() {
    this.setState({
      activeItem: [false, false, true , false]
    });

    this.props.onSelect('filter');
  }

  handleListClick() {
    this.setState({
      activeItem: [false, false, false , true]
    });

    this.props.onSelect('list');
  }

  render() {
    return(
      <div id="action-bar">
        <ActionBarItem
          key="create"
          icon="glyphicon-plus"
          isActive={this.state.activeItem[0]}
          text="CREATE"
          onClick={this.handleCreateClick}
        />
        <ActionBarItem
          key="search"
          icon="glyphicon-search"
          isActive={this.state.activeItem[1]}
          text="SEARCH"
          onClick={this.handleSearchClick}
        />
        <ActionBarItem
          key="filter"
          icon="glyphicon-filter"
          isActive={this.state.activeItem[2]}
          text="FILTER"
          onClick={this.handleFilterClick}
        />
        <ActionBarItem
          key="list"
          icon="glyphicon-align-justify"
          isActive={this.state.activeItem[3]}
          text="LIST"
          onClick={this.handleListClick}
        />
      </div>
    );
  }
}