import React, { Component } from 'react';
import TaskListContainer from './TaskListContainer';
import TodoSidebar from './TodoSidebar';

const priorities = [
  {
    text: "Priority One"
  },
  {
    text: "Priority Two"
  },
  {
    text: "Priority Three"
  }
];

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    // TODO: Load tasks from DB.

    this.handleFolderClick = this.handleFolderClick.bind(this);
    // TODO: Change after we get Redux+DB
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCreateSubtask = this.handleCreateSubtask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubtaskCheck = this.handleSubtaskCheck.bind(this);
    this.handleFilterCreate = this.handleFilterCreate.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.filterTasks = this.filterTasks.bind(this);

    this.state = {
      activeTaskList: 'Inbox',
      tasks: this.props.tasks,
      tags: this.props.tags,
      activeFilter: null,
      filteredTasks: []
    }
  }

  // TODO: Move handler logic into action creators instead of setState
  handleCreate(newTask) {
    // TODO: update this as we add more logic
    var dueDate = newTask.dueDate ? newTask.dueDate.toString() : null;
    var task = {
      userId: 2,
      text: newTask.text,
      createdDate: new Date().toString(),
      dueDate: dueDate,
      complete: false,
      tag: newTask.tag
    }

    this.props.actions.createTask(task);
    this.setState({ tasks: this.state.tasks.concat(task) });
  }

  handleCreateSubtask(newSubtask) {
    var newTasks = this.state.tasks.slice();
    var subtask;
    newTasks.map(function(task){
      if (!task.subtasks) {
        task.subtasks = [];
      }
      if (task.id ===  newSubtask.taskId) {
        subtask = {
          taskId: newSubtask.taskId,
          text: newSubtask.text,
          completed: false
        }
        task.subtasks.push(subtask);
      }

      return task;
    });

    this.props.actions.createSubtask(subtask, this.props.userId);
    this.setState({tasks: newTasks });
  }

  handleFolderClick(folderType) {
    this.setState({ activeTaskList: folderType });
  }

  handleCheck(updatedTask) {
    var newTasks = this.state.tasks.slice();
    newTasks.map(function(task){
      if (!task.subtasks) {
        task.subtasks = [];
      }
      if (task.id === updatedTask.id) {
        task.complete = updatedTask.completed
      }
      return task;
    });

    this.props.actions.updateTask(updatedTask, this.props.userId);
    this.setState({ tasks: newTasks });
  }

  handleSubtaskCheck(updatedSubtask) {
    var newTasks = this.state.tasks.slice();
    newTasks.map(function(task){
      if (task.id === updatedSubtask.taskId) {
        task.subtasks.map(function(subtask){
          if (subtask.id === updatedSubtask.id) {
            subtask.complete = updatedSubtask.completed
          }
        })
      }
      return task;
    });

    this.props.actions.updateSubtask(updatedSubtask, this.props.userId);
    this.setState({ tasks: newTasks });
  }

  handleFilterCreate(newFilter) {
    // send through filter type later and support more filter types
    var newTags = this.state.tags.slice();
    newTags.push(newFilter);
    this.setState({ tags: newTags });
  }

  handleFilterSelect(id) {
    this.setState({ activeFilter: id }, function() {
      this.filterTasks();
    });
  }

  filterTasks() {
    if (this.state.activeFilter) {
      var filteredTasks = this.state.tasks.filter((task) => {
        return task.tag === this.state.activeFilter
      });

      this.setState({ filteredTasks: filteredTasks });
    }
  }

  render(){
    return(
      <div id="todo-list">
        <TodoSidebar
          tasks={this.state.tasks}
          onFolderClick={this.handleFolderClick}
          tags={this.state.tags}
          priorities={priorities}
          onCreate={this.handleFilterCreate}
          onFilterSelect={this.handleFilterSelect}
        />
        <TaskListContainer
          activeList={this.state.activeTaskList}
          tasks={this.state.activeFilter ? this.state.filteredTasks : this.state.tasks}
          handleCreate={this.handleCreate}
          handleCreateSubtask={this.handleCreateSubtask}
          handleCheck={this.handleCheck}
          handleSubtaskCheck={this.handleSubtaskCheck}
          tags={this.state.tags}
          priorities={priorities}
        />
      </div>
    );
  }
}