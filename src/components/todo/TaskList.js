import React, { Component } from 'react';
import Task from './Task';
import CreateItem from './CreateItem'

export default class TaskList extends Component {
  categorizeTasks() {
    var tasks = [];
    var completedTasks = [];

    if (this.props.showWeekdays) {
      return this.renderWithWeekdays(this.props.tasks);
    }

    this.props.tasks.forEach((task, idx) => {
      if(task.complete === false) {
        tasks.push(this.generateTask(idx, task, false));
      }
      if(task.complete === true) {
        completedTasks.push(this.generateTask(idx, task, true));
      }
    });

    return [tasks, completedTasks];
  }

  completeDayText(day) {
    switch(day) {
      case 'Mon':
        return 'MONDAY';
      case 'Tue':
        return 'TUESDAY';
      case 'Wed':
        return 'WEDNESDAY';
      case 'Thu':
        return 'THURSDAY';
      case 'Fri':
        return 'FRIDAY';
      case 'Sat':
        return 'SATURDAY';
      case 'Sun':
        return 'SUNDAY';
    }
  }

  renderWeekdayHeading(weekday) {
    return(
      <div className="task-weekday-subheading" key={weekday}>
        <h2>{this.completeDayText(weekday)}</h2>
      </div>
    );
  }

  // TODO: - Fix minor bug - should render weekdays in order (Mon -> Sun), not by first occurence.
  //         Probably need to give each date a value (mon = 0, tues = 1, ...) and then sort tasks.
  //       - Can make this more efficient by popping values off array after its associated component is created.
  renderWithWeekdays(tasks) {
    var taskMap = new Map();
    var tasksByWeekday = [];
    var completedTasks = [];

    tasks.forEach((task) => {
      var weekday = task.dueDate.substring(0, 3);
      taskMap[weekday] ? taskMap[weekday] : taskMap[weekday] = 1;
    });

    var props = this.props;
    tasks.forEach((task, idx) => {
      if(task.complete === false) {
        var currentWeekday = task.dueDate.substring(0, 3);
        if (taskMap[currentWeekday]) {
          tasksByWeekday.push(this.renderWeekdayHeading(currentWeekday));
          tasks.forEach((t, tIdx) => {
            if (t.dueDate.substring(0,3) === currentWeekday && t.complete === false) {
              tasksByWeekday.push(this.generateTask(tIdx, t, false));
            }
          });
          taskMap[currentWeekday] = null;
        }
      }
      if(task.complete === true) {
        completedTasks.push(this.generateTask(idx, task, true));
      }
    });

    return [tasksByWeekday, completedTasks];
  }

  renderCreateItem() {
    if (this.props.createItems) {
      return(
        <CreateItem
          onCreate={this.props.onCreate}
          text="Add Task"
          scheduler={true}
          showTagsDropdown={true}
          placeholder="e.g. Create new database table for users"
          type={this.props.title}
          tags={this.props.tags}
        />
      );
    }
    return;
  }

  generateTask(id, task, isCompleted) {
    return(
      <Task
        key={id}
        id={task.id}
        text={task.text}
        createdDate={task.createdDate}
        subtasks={task.subtasks}
        onCreateSubtask={this.props.onCreateSubtask}
        onCheck={this.props.onCheck}
        onSubtaskCheck={this.props.onSubtaskCheck}
        isCompleted={isCompleted}
      />
    );
  }

  render() {
    var tasks = this.categorizeTasks();
    return(
      <div id="task-list">
        <h1>{this.props.title}</h1>
        <div className="tasks">
          { tasks[0] }
          { this.renderCreateItem() }
        </div>
        <div className="completed-tasks">
          <h2>COMPLETED</h2>
          { tasks[1] }
        </div>
      </div>
    );
  }
}