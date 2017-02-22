import React, { Component } from 'react';
import Tag from './Tag';

export default class Entry extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  truncateDate(date) {
    return date.substring(0, date.indexOf('T'));
  }

  handleClick() {
    var entryAndTags = {
      entry: this.props.entry,
      tags: this.props.tags
    }

    this.props.onClick(entryAndTags);
  }

  render(){
    return(
      <div className="entry-item-container">
        <div className="entry-header">
          <div className="entry-date" onClick={this.handleClick}>
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
        <div className="entry-text" onClick={this.handleClick}>
          {this.props.entry.entryText}
        </div>
      </div>
    );
  }

}
