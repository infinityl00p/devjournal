import React, { Component } from 'react';
import FilterList from './FilterList';
import CreateItem from './CreateItem';

// TODO: figure out how to make this more generic
export default class TaskFilter extends Component {
  constructor(props) {
    super(props);

    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handlePriorityClick = this.handlePriorityClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.renderCreateFilter = this.renderCreateFilter.bind(this);

    this.state = {
      activeFilter: this.props.projects,
      activeFilterName: 'project'
    }
  }

  handleProjectClick() {
    this.setState({ activeFilter: this.props.projects });
    this.setState({ activeFilterName: 'project' });
  }

  handlePriorityClick() {
    this.setState({ activeFilter: this.props.priorities });
    this.setState({ activeFilterName: 'priority' });
  }

  handleCreate(filter) {
    switch(this.state.activeFilterName) {
      case 'project':
        var newFilter = {
          id: this.props.projects.length + 1,
          text: filter.text
        }
        this.setState({ activeFilter: this.state.activeFilter.concat(newFilter) });
        this.props.onCreate(newFilter);
        return;
      case 'priority':
        return;
    }
  }

  renderCreateFilter() {
    if (this.state.activeFilterName === 'project') {
      return(
        <CreateItem
          onCreate={this.handleCreate}
          text={"Add " + this.state.activeFilterName}
          scheduler={false}
          showProjectsDropdown={false}
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
          <span className={this.state.activeFilterName === 'project' ? 'active' : ''} onClick={this.handleProjectClick}>Projects</span>
          <span className={this.state.activeFilterName === 'priority' ? 'active' : ''} onClick={this.handlePriorityClick}>Priority</span>
        </div>
        <FilterList key="projects" name="Projects" icon="glyphicon-folder-open" items={this.state.activeFilter} onSelect={this.props.onSelect} />
        { this.renderCreateFilter() }
      </div>
    );
  }
}