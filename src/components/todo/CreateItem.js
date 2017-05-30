import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TagSelector from './TagSelector';

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
    this.renderTagLabel = this.renderTagLabel.bind(this);
    this.renderTagSelector = this.renderTagSelector.bind(this);
    this.handleTagSelectorClick = this.handleTagSelectorClick.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);

    this.state = {
      isActive: false,
      itemText: '',
      startDate: moment(),
      changedDate: false,
      showTags: false,
      selectedTag: null
    }
  }

  handleClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  handleSubmit(e) {
    e.preventDefault();

    var dueDate = !this.state.changedDate && this.props.type === 'Inbox' ? null : this.state.startDate;

    if (/\S/.test(this.state.itemText)) {
      var newItem = { text: this.state.itemText, dueDate: dueDate, tag: this.state.selectedTag }
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

  handleTagSelectorClick() {
    this.setState({ showTags: !this.state.showTags });
  }

  renderTagLabel() {
    if (this.props.showTagsDropdown) {
      var classes = this.state.showTags ? 'input-group-addon btn tag-icon active' : 'input-group-addon btn tag-icon'
      return (
        <label className={classes} onClick={this.handleTagSelectorClick}>
          <span className="glyphicon glyphicon-tag" />
        </label>
      );
    }
    return;
  }

  handleTagSelect(tagId) {
    this.setState({ selectedTag: tagId });
  }

  renderTagSelector() {
    if (this.state.showTags) {
      return(
        <TagSelector tags={this.props.tags} onSelect={this.handleTagSelect} />
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
          { this.renderTagLabel() }
          {scheduler}
          { this.renderTagSelector() }
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