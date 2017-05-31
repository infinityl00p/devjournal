import React, { Component } from 'react';

import SimpleListTags from './SimpleListTags';

export default class SimpleListItem extends Component {

  // TODO: move this to utils class
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

  render() {
    return(
      <div className="simple-list-item col-md-12">
        <div className="entry">
          <span className="entry-text col-md-7">
            {this.props.text}
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