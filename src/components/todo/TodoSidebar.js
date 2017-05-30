import React, { Component } from 'react';
import FolderList from './FolderList';
import TaskFilter from './TaskFilter';

export default class TodoSidebar extends Component {
  render() {
    return(
      <div className="col-sm-3" id="todo-sidebar">
        <FolderList tasks={this.props.tasks} onFolderClick={this.props.onFolderClick} />
        <TaskFilter
          tags={this.props.tags}
          priorities={this.props.priorities}
          onCreate={this.props.onCreate}
          onSelect={this.props.onFilterSelect}
        />
      </div>
    );
  }
}