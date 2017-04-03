import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ProjectSelector from './ProjectSelector';

import 'react-datepicker/dist/react-datepicker.css';
// TODO: Bug - selected date doesn't show up if startDate is initialized as null.
//       Fix it so this works (there's issues with setting state to null instead, which is ideal because
//       constructor only gets called when you switch from Overdue to another task (because that one doesn't
//       have this component).)
export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.renderCreateItemInput = this.renderCreateItemInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderProjectLabel = this.renderProjectLabel.bind(this);
    this.renderProjectSelector = this.renderProjectSelector.bind(this);
    this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);

    this.state = {
      isActive: false,
      itemText: '',
      startDate: moment(),
      changedDate: false,
      showProjects: false,
      selectedProject: null
    }
  }

  handleClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  handleSubmit(e) {
    e.preventDefault();

    var dueDate = !this.state.changedDate && this.props.type === 'Inbox' ? null : this.state.startDate;

    if (/\S/.test(this.state.itemText)) {
      var newItem = { text: this.state.itemText, dueDate: dueDate, project: this.state.selectedProject }
      this.props.onCreate(newItem);
      this.setState({ itemText: '' });
      this.setState({ isActive: false });
    }
  }

  handleDateChange(date) {
    this.setState({ changedDate: true });
    this.setState({ startDate: date });
  }

  onChange(e) {
    this.setState({ itemText: e.target.value});
  }

  handleProjectSelectorClick() {
    this.setState({ showProjects: !this.state.showProjects });
  }

  renderProjectLabel() {
    if (this.props.showProjectsDropdown) {
      var classes = this.state.showProjects ? 'input-group-addon btn project-icon active' : 'input-group-addon btn project-icon'
      return (
        <label className={classes} onClick={this.handleProjectSelectorClick}>
          <span className="glyphicon glyphicon-folder-open" />
        </label>
      );
    }
    return;
  }

  handleProjectSelect(projectId) {
    this.setState({ selectedProject: projectId });
  }

  renderProjectSelector() {
    if (this.state.showProjects) {
      return(
        <ProjectSelector projects={this.props.projects} onSelect={this.handleProjectSelect} />
      );
    }
    return;
  }

  renderCreateItemInput() {
    var scheduler;
    var isDisabled = this.props.type === 'Today';
    var startDate = this.props.type === 'Inbox' ? null : moment();

    if (this.props.scheduler) {
      scheduler = (
        <label className="input-group-addon btn">
          <span className="glyphicon glyphicon-time" />
          <DatePicker
            className="date-picker"
            placeholderText="Schedule"
            selected={startDate}
            onChange={this.handleDateChange}
            disabled={isDisabled}
            disabledKeyboardNavigation
          />
        </label>
      );
    }

    if (this.state.isActive) {
      return(
        <div className="create-item-input">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={this.props.placeholder}
                value={this.state.itemText}
                onChange={this.onChange}
              />
            </div>
          </form>
          { this.renderProjectLabel() }
          {scheduler}
          { this.renderProjectSelector() }
        </div>
      );
    }
  }

  render() {
    return(
      <div className="create-item">
        {this.renderCreateItemInput()}
        <div className="create-item-text" onClick={this.handleClick}>
          <span className={"glyphicon glyphicon-plus"} />
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}