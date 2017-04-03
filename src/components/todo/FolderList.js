import React, { Component } from 'react';
import FolderListItem from './FolderListItem';

export default class FolderList extends Component {
  constructor() {
    super();

    this.handleFolderClick = this.handleFolderClick.bind(this);
    this.getCountFor = this.getCountFor.bind(this);

    this.state = {
      activeFolder: 'Inbox'
    }
  }

  handleFolderClick(folderType) {
    switch(folderType) {
      case 'Inbox':
        this.setState({ activeFolder: 'Inbox' });
        this.props.onFolderClick('Inbox');
        return;
      case 'Today':
        this.setState({ activeFolder: 'Today' });
        this.props.onFolderClick('Today');
        return;
      case 'This week':
        this.setState({ activeFolder: 'Week' });
        this.props.onFolderClick('Week');
        return;
      case 'Overdue':
        this.setState({ activeFolder: 'Overdue' });
        this.props.onFolderClick('Overdue');
        return;
    }
  }

  getCountFor(range) {
    var today = new Date();
    var nonCompleteTasks = this.props.tasks.filter(function (task){
      return task.complete !== true
    });

    switch(range) {
      case 'Inbox':
        var tasks = nonCompleteTasks.filter(function (task){
          return task.dueDate === null || task.dueDate === '';
        });
        return tasks.length;
      case 'Today':
        var tasks = nonCompleteTasks.filter(function (task){
          if (task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff <= 1  && dayDiff >= 0;
          }
        });
        return tasks.length;
      case 'Week':
        var tasks = nonCompleteTasks.filter(function (task){
          if (task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff <= 7 && dayDiff >= 0;
          }
        });
        return tasks.length;
      case 'Overdue':
        var tasks = nonCompleteTasks.filter(function (task){
          if (task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff < 0;
          }
        });
        return tasks.length;
    }
  }

  render() {
    // TODO: Find better icons for these
    return(
      <div id="folder-list">
        <p className="sub-heading">FOLDERS</p>
        <FolderListItem
          key="folder-inbox"
          icon="glyphicon-inbox"
          isActive={this.state.activeFolder === 'Inbox' ? true : false}
          count={this.getCountFor('Inbox')}
          text="Inbox"
          onClick={this.handleFolderClick}
        />
        <FolderListItem
          key="folder-today"
          icon="glyphicon-inbox"
          isActive={this.state.activeFolder === 'Today' ? true : false}
          count={this.getCountFor('Today')}
          text="Today"
          onClick={this.handleFolderClick}
        />
        <FolderListItem
          key="folder-week"
          icon="glyphicon-inbox"
          isActive={this.state.activeFolder === 'Week' ? true : false}
          count={this.getCountFor('Week')}
          text="This week"
          onClick={this.handleFolderClick}
        />
        <FolderListItem
          key="folder-overdue"
          icon="glyphicon-inbox"
          isActive={this.state.activeFolder === 'Overdue' ? true : false}
          count={this.getCountFor('Overdue')}
          text="Overdue"
          onClick={this.handleFolderClick}
        />
      </div>
    );
  }
}