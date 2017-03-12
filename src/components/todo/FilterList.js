import React, { Component } from 'react';
import FilterListItem from './FilterListItem';

export default class FilterList extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.renderFilterListItems = this.renderFilterListItems.bind(this);

    this.state = {
      activeFilter: 0
    }
  }

  onClick(id, isActive) {
    if (isActive) {
      this.setState({ activeFilter: id });
      this.props.onSelect(id);
    } else {
      this.setState({ activeFilter: 0 });
      this.props.onSelect(null);
    }
  }

  renderFilterListItems() {
    return(
      this.props.items.map((item) => {
        return(
          <FilterListItem
            key={item.id}
            id={item.id}
            icon={this.props.icon}
            text={item.text}
            onClick={this.onClick}
            isActive={item.id === this.state.activeFilter}
          />
        );
      })
    );
  }

  render() {
    return(
      <div className="filter-list">
        { this.renderFilterListItems() }
      </div>
    );
  }
}