import React, { Component } from 'react';
import Tag from './Tag';

export default class Entry extends Component {
  truncateDate(date) {
    return date.substring(0, date.indexOf('T'));
  }

  render(){
    return(
      <div className="entry-item-container">
        <div className="entry-header">
          <div className="entry-date">
            {this.truncateDate(this.props.entry.date)}
          </div>
          <div className="tag-container">
            {
              this.props.tags.map((tag) =>
                <Tag key={tag.id} data={tag} />
              )
            }
          </div>
        </div>
        <div className="entry-text">
          {this.props.entry.entryText}
        </div>
      </div>
    );
  }

}
