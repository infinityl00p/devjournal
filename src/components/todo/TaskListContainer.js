import React, { Component } from 'react';
import TaskList from './TaskList';

export default class TaskListContainer extends Component {
  constructor() {
    super();

    this.renderTaskList = this.renderTaskList.bind(this);
  }

  renderTaskList() {
    var today = new Date();

    switch(this.props.activeList) {
      case 'Inbox':
        var tasks = this.props.tasks.filter(function (task){
          return task.dueDate === null
        });
        return(
          <TaskList
            title="Inbox"
            tasks={tasks}
            onCreate={this.props.handleCreate}
            onCreateSubtask={this.props.handleCreateSubtask}
            onCheck={this.props.handleCheck}
            onSubtaskCheck={this.props.handleSubtaskCheck}
            showWeekdays={false}
            createItems={true}
            projects={this.props.projects}
          />
        );
      case 'Today':
        var tasks = this.props.tasks.filter(function (task){
          if (task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff <= 1 && dayDiff >= 0;
          }
        });
        return(
          <TaskList
            title="Today"
            tasks={tasks}
            onCreate={this.props.handleCreate}
            onCreateSubtask={this.props.handleCreateSubtask}
            onCheck={this.props.handleCheck}
            onSubtaskCheck={this.props.handleSubtaskCheck}
            showWeekdays={false}
            createItems={true}
            projects={this.props.projects}
          />
        );
      case 'Week':
        var tasks = this.props.tasks.filter(function (task){
          if (task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff <= 7 && dayDiff >= 0;
          }
        });
        return(
          <TaskList
            title="Week"
            tasks={tasks}
            onCreate={this.props.handleCreate}
            onCreateSubtask={this.props.handleCreateSubtask}
            onCheck={this.props.handleCheck}
            onSubtaskCheck={this.props.handleSubtaskCheck}
            showWeekdays={true}
            createItems={true}
            projects={this.props.projects}
          />
        );
      case 'Overdue':
        var tasks = this.props.tasks.filter(function (task){
          if(task.dueDate !== null) {
            var timeDiff = Date.parse(task.dueDate) - today.getTime();
            var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return dayDiff < 0;
          }
        });
        return(
          <TaskList
            title="Overdue"
            tasks={tasks}
            onCreate={this.props.handleCreate}
            onCreateSubtask={this.props.handleCreateSubtask}
            onCheck={this.props.handleCheck}
            onSubtaskCheck={this.props.handleSubtaskCheck}
            showWeekdays={false}
            createItems={false}
          />
        );
    }
  }

  render() {
    return(
      <div className="col-md-7" id="task-list-container">
        {this.renderTaskList()}
      </div>
    );
  }
}