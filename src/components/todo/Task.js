import React, { Component } from 'react';
import CreateSubTask from './CreateSubtask';
import Subtask from './Subtask';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.renderIcons = this.renderIcons.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.renderAddSubtask = this.renderAddSubtask.bind(this);
    this.handleAddTaskToggle = this.handleAddTaskToggle.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCreateSubtask = this.handleCreateSubtask.bind(this);

    this.state = {
      isCollapsed: true,
      addSubtask: false,
      isCompleted: this.props.isCompleted
    }
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var parsedDate = new Date(date);

    return monthNames[parsedDate.getMonth()] + ' ' + parsedDate.getDate();
  }

  handleExpand() {
    this.setState({ isCollapsed: false });
  }

  handleCollapse() {
    this.setState({ isCollapsed: true });
  }

  handleAddTaskToggle() {
    if(!this.state.addSubtask) {
      this.handleExpand();
    }

    this.setState({ addSubtask: !this.state.addSubtask });
  }

  handleCheck() {
    var task = {
      id: this.props.id,
      completed: !this.state.isCompleted
    }

    this.props.onCheck(task);
  }

  renderSubtasks() {
    if(this.props.subtasks && !this.state.isCollapsed){
      var props = this.props;
      return this.props.subtasks.map(function(subtask, idx){
        return(
          <Subtask
            key={idx}
            id={subtask.id}
            taskId={props.id}
            text={subtask.text}
            isCompleted={subtask.complete}
            onCheck={props.onSubtaskCheck}
          />
        );
      });
    }
    return;
  }

  renderIcons() {
    var arrow;
    if (this.props.subtasks && this.props.subtasks.length > 0) {
      if (this.state.isCollapsed) {
        arrow = <span className="glyphicon glyphicon-chevron-down" onClick={this.handleExpand} />
      } else {
        arrow = <span className="glyphicon glyphicon-chevron-up" onClick={this.handleCollapse} />
      }
    }

    var addIcon = this.state.addSubtask ? 'glyphicon glyphicon-plus-sign activeIcon' : 'glyphicon glyphicon-plus-sign';
    return(
      <div className="action-icons">
        <span className={addIcon} onClick={this.handleAddTaskToggle} />
        {arrow}
      </div>
    );
  }

  handleCreateSubtask(subtask) {
    this.setState({ addSubtask: false });
    this.props.onCreateSubtask(subtask);
  }

  renderAddSubtask() {
    if (this.state.addSubtask) {
      return (
        <CreateSubTask
          onCreate={this.handleCreateSubtask}
          taskId={this.props.id}
        />
      );
    }
  }

  render() {
    return(
      <div className="task">
        <input
          type="checkbox"
          className="checkbox-round"
          onChange={this.handleCheck}
          checked={this.props.isCompleted}
        />
        <p className={this.props.isCompleted ? "completed-task" : ""}>{this.props.text}</p>
        {this.renderIcons()}
        <span className="created-date">
          <span className="date-underline">
            {this.formatDate(this.props.createdDate)}
          </span>
        </span>
        <div className="subtasks">
          {this.renderSubtasks()}
        </div>
        {this.renderAddSubtask()}
      </div>
    );
  }
}