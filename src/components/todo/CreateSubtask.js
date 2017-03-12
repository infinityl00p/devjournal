import React, { Component } from 'react';

/* TODO: Consider consolidating this into CreateItem. Would require:
         - boolean prop to optionally show create-item-text div
         - boolean prop to set isActive to on initialization
*/

export default class CreateSubtask extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      subtaskText: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // make sure text is not just whitespace or empty
    if (/\S/.test(this.state.subtaskText)) {
      var newSubtask = {
        taskId: this.props.taskId,
        text: this.state.subtaskText,
        completed: false
      }

      this.props.onCreate(newSubtask);
      this.setState({ subtaskText: '' });
    }
  }

  handleChange(e) {
    this.setState({ subtaskText: e.target.value });
  }

  render() {
    return(
      <div className="create-subtask">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Write unit tests"
              value={this.state.subtaskText}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    )
  }
}