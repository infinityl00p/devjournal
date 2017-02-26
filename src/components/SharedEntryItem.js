import React, { Component } from 'react';
import marked from 'marked';

export default class SharedEntryItem extends Component {
  formatDate(date) {
    var truncatedDate = date.substring(0, date.indexOf('T'));
    var fullDate = new Date(truncatedDate).toDateString();
    return fullDate;
  }

  render() {
    const entryText = marked(this.props.entryText);
    return(
      <div id="shared-entry-item" className="col-md-8 col-md-offset-2">
        <div className="entry">
          <h4 className="entry-note"><a href="#">DevJournal</a> entry from:</h4>
          <h4 className="entry-date">{this.formatDate(this.props.date)}</h4>
          <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
        </div>
      </div>
    );
  }
}

// props:
// key: tempEntry.entry.id,
// date: tempEntry.entry.date,
// entryText: tempEntry.entry.entryText,
// id: tempEntry.entry.id,
// tags: tempEntry.tags