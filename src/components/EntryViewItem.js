import React, { Component } from 'react';
import Tag from './Tag';

export default class EntryViewItem extends Component {
  formatDate(date) {
    var truncatedDate = date.substring(0, date.indexOf('T'));
    var fullDate = new Date(truncatedDate).toDateString();
    return fullDate;
  }

  render() {
    return(
      <div className="entry-view-item">
        <a name={this.props.id} />
        <div className="entry">
            <h4 className="date-text">{this.formatDate(this.props.date)}</h4>
            <p className="entry-text">{this.props.entryText}</p>
        </div>
        <div className="tag-container">
            { this.props.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
        </div>
      </div>
    );
  }
}