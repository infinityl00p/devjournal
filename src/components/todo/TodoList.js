import React, { Component } from 'react';
import TaskListContainer from './TaskListContainer';
import TodoSidebar from './TodoSidebar';

// TODO: Store dates in a better format so we don't have to keep parsing them.
const tasks = [
  {
    id: 1,
    userId: 2,
    text: 'Lose yourself to dance.',
    createdDate: 'Tue Mar 21 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Tue Mar 21 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: [
      {
        id: 1,
        text: 'I know you don\'t get chance to take a break this often',
        complete: false
      },
      {
        id: 2,
        text: 'I know your life is speeding and it isn\'t stopping',
        complete: true
      }
    ]
  },
  // {
  //   id: 2,
  //   userId: 2,
  //   text: 'I\'m up all night to get lucky',
  //   createdDate: 'Wed Mar 18 2017 18:42:29 GMT-0700 (PDT)',
  //   dueDate: null,
  //   priority: null,
  //   project: null,
  //   complete: false,
  //   subtasks: []
  // },
  {
    id: 3,
    userId: 2,
    text: 'Harder. Better. Faster. Stronger.',
    createdDate: 'Wed Mar 20 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Wed Mar 25 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
  {
    id: 4,
    userId: 2,
    text: 'Harder. Better. Faster. Stronger.',
    createdDate: 'Wed Mar 18 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: null,
    priority: null,
    project: null,
    complete: true,
    subtasks: []
  },
  {
    id: 5,
    userId: 2,
    text: 'Test weekday 1',
    createdDate: 'Tues Mar 17 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Fri Mar 26 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
  {
    id: 6,
    userId: 2,
    text: 'Test weekday 2',
    createdDate: 'Thurs Mar 20 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Fri Mar 27 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
  {
    id: 7,
    userId: 2,
    text: 'Test weekday 3',
    createdDate: 'Thurs Mar 19 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Thu Mar 26 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
  {
    id: 8,
    userId: 2,
    text: 'Test overdue',
    createdDate: 'Thurs Mar 12 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Thu Mar 12 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
  {
    id: 9,
    userId: 2,
    text: 'Test weekday 4',
    createdDate: 'Thurs Mar 19 2017 18:42:29 GMT-0700 (PDT)',
    dueDate: 'Thu Mar 26 2017 18:42:29 GMT-0700 (PDT)',
    priority: null,
    project: null,
    complete: false,
    subtasks: []
  },
];

const projects = [
  {
    id: 1,
    text: 'Javascript'
  },
  {
    id: 2,
    text: 'Golang'
  },
  {
    id: 3,
    text: 'DevOps'
  },
  {
    id: 4,
    text: 'Leadership'
  }
];

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
  constructor() {
    super();
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
      tasks: tasks,
      projects: projects,
      activeFilter: null,
      filteredTasks: []
    }
  }

  // TODO: Move handler logic into action creators instead of setState
  handleCreate(newTask) {
    // TODO: update this as we add more logic
    var dueDate = newTask.dueDate ? newTask.dueDate.toString() : null;
    // TODO: fix hard coding id when backend generates it
    var id = this.state.tasks.length + 2;
    var task = {
      id: id,
      userId: 2,
      text: newTask.text,
      createdDate: new Date().toString(),
      dueDate: dueDate,
      complete: false,
      project: newTask.project
    }

    this.setState({ tasks: this.state.tasks.concat(task) });
  }

  handleCreateSubtask(newSubtask) {
    var newTasks = this.state.tasks.slice();
    newTasks.map(function(task){
      if (!task.subtasks) {
        task.subtasks = [];
      }
      if (task.id ===  newSubtask.taskId) {
        // TODO: fix hard coding id when backend generates it
        var subtask = {
          id: task.subtasks.length + 1,
          taskId: newSubtask.taskId,
          text: newSubtask.text,
          completed: false
        }

        task.subtasks.push(subtask);
      }
      return task;
    });

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

    this.setState({ tasks: newTasks });
  }

  handleFilterCreate(newFilter) {
    // send through filter type later and support more filter types
    var newProjects = this.state.projects.slice();
    newProjects.push(newFilter);
    this.setState({ projects: newProjects });
  }

  handleFilterSelect(id) {
    this.setState({ activeFilter: id }, function() {
      this.filterTasks();
    });
  }

  filterTasks() {
    if (this.state.activeFilter) {
      var filteredTasks = this.state.tasks.filter((task) => {
        return task.project === this.state.activeFilter
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
          projects={this.state.projects}
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
          projects={this.state.projects}
          priorities={priorities}
        />
      </div>
    );
  }
}