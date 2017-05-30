import React, { Component } from 'react';
import FilterList from './FilterList';
import CreateItem from './CreateItem';

// TODO: figure out how to make this more generic
export default class TaskFilter extends Component {
  constructor(props) {
    super(props);

    this.handleTagClick = this.handleTagClick.bind(this);
    this.handlePriorityClick = this.handlePriorityClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.renderCreateFilter = this.renderCreateFilter.bind(this);

    this.state = {
      activeFilter: this.props.tags,
      activeFilterName: 'tag'
    }
  }

  handleTagClick() {
    this.setState({ activeFilter: this.props.tags });
    this.setState({ activeFilterName: 'tag' });
  }

  handlePriorityClick() {
    this.setState({ activeFilter: this.props.priorities });
    this.setState({ activeFilterName: 'priority' });
  }

  handleCreate(filter) {
    switch(this.state.activeFilterName) {
      case 'tag':
        var newFilter = {
          id: this.props.tags.length + 1,
          text: filter.tagText
        }
        this.setState({ activeFilter: this.state.activeFilter.concat(newFilter) });
        this.props.onCreate(newFilter);
        return;
      case 'priority':
        return;
    }
  }

  renderCreateFilter() {
    if (this.state.activeFilterName === 'tag') {
      return(
        <CreateItem
          onCreate={this.handleCreate}
          text={"Add " + this.state.activeFilterName}
          scheduler={false}
          showTagsDropdown={false}
          placeholder={this.state.activeFilterName + " name"}
        />
      );
    }
    return;
  }

  render() {
    return(
      <div id="task-filter">
        <p className="sub-heading">FILTERS</p>
        <div className="filters">
          <span className={this.state.activeFilterName === 'tag' ? 'active' : ''} onClick={this.handleTagClick}>Tags</span>
          <span className={this.state.activeFilterName === 'priority' ? 'active' : ''} onClick={this.handlePriorityClick}>Priority</span>
        </div>
        <FilterList key="tags" name="Tags" icon="glyphicon-tag" items={this.state.activeFilter} onSelect={this.props.onSelect} />
        { this.renderCreateFilter() }
      </div>
    );
  }
}