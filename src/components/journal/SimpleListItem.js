import React, { Component } from 'react';

import SimpleListTags from './SimpleListTags';

export default class SimpleListItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.formatText = this.formatText.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  // TODO: move this to utils class

  formatText(text) {
    return text.replace(/[^a-z0-9\.'"\/:?=!+]+/gi, ' ');
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var parsedDate;
    if (date) {
      parsedDate = new Date(date);
      return monthNames[parsedDate.getMonth()] + ' ' + parsedDate.getDate();
    }
    else {
      return 'N/A';
    }
  }

  handleClick() {
    var updatedEntry = {
      date: this.props.date,
      entryText: this.props.entryText,
      id: this.props.key,
    };

    var visibleEntry = {
      entry: updatedEntry,
      tags: this.props.tags
    };

    this.props.onClick(visibleEntry);
  }

  render() {
    return(
      <div className="simple-list-item col-md-12" onClick={this.handleClick}>
        <div className="entry">
          <span className="entry-text col-md-7">
            {this.formatText(this.props.text)}
          </span>
          <span className="entry-date col-md-1">
            {this.formatDate(this.props.date)}
          </span>
          <span className="entry-tags col-md-3">
            <SimpleListTags tags={this.props.tags} />
          </span>
        </div>
      </div>
    );
  }
}