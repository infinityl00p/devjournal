import React, { Component } from 'react';

export default class Subtask extends Component {
  constructor() {
    super();

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    var subtask = {
      id: this.props.id,
      taskId: this.props.taskId,
      completed: !this.props.isCompleted
    }

    this.props.onCheck(subtask);
  }

  render() {
    return(
      <div className="subtask">
        <input
          type="checkbox"
          className="checkbox-round"
          checked={this.props.isCompleted}
          onChange={this.handleCheck}
        />
        <p className={this.props.isCompleted ? "completed-subtask" : ""}>{this.props.text}</p>
      </div>
    );
  }
}