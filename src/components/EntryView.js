import React, { Component } from 'react';
import Tag from './Tag';

export default class EntryView extends Component {
  formatDate(date) {
    var truncatedDate = date.substring(0, date.indexOf('T'));
    var fullDate = new Date(truncatedDate).toDateString();
    return fullDate;
  }

  render() {
    return(
      <div className="col-md-8" id="entry-view">
        <div className="entry">
          <h4 className="date-text">{this.formatDate(this.props.currentEntry.entry.date)}</h4>
          <p className="entry-text">{this.props.currentEntry.entry.entryText}</p>
        </div>
        <div className="tag-container">
          {
            this.props.currentEntry.tags.map((tag) =>
              <Tag key={tag.id} data={tag} />
            )
          }
        </div>
      </div>
    );
  }
}