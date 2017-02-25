import React, { Component } from 'react';
import Tag from './Tag';
import marked from 'marked';

export default class EntryViewItem extends Component {
  formatDate(date) {
    var truncatedDate = date.substring(0, date.indexOf('T'));
    var fullDate = new Date(truncatedDate).toDateString();
    return fullDate;
  }

  render() {
    const entryText = marked(this.props.entryText);
    return(
      <div className="entry-view-item">
        <div className="entry">
            <h4 className="date-text">{this.formatDate(this.props.date)}</h4>
            <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
        </div>
        <div className="tag-container">
            { this.props.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
        </div>
      </div>
    );
  }
}