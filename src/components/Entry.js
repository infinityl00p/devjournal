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

  // TODO: wrap in <a href={"#" + this.props.entry.id}>
  render(){
    return(
      <div className="entry-item-container" onClick={this.handleClick}>
        <a href="#" >
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
        </a>
      </div>
    );
  }

}
