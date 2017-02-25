import React, { Component } from 'react';
import Tag from './Tag';
import marked from 'marked';

export default class EntryViewItem extends Component {
  formatDate(date) {
    var truncatedDate = date.substring(0, date.indexOf('T'));
    var fullDate = new Date(truncatedDate).toDateString();
    return fullDate;
  }

  // TODO: add these as we build functionality. Should call action creator in JournalPage.
  handleEdit() {
    // Render edit Modal (or do it in the view)
    // var editedData = { 'something' };
    // this.props.onEdit(editedData);
  }

  handleShare() {
    // generate shareable link
    // this.props.onShare(this.props.id);
  }

  handleDelete() {
  //   this.props.onDelete(this.props.id);
  }

  render() {
    const entryText = marked(this.props.entryText);
    return(
      <div className="entry-view-item">
        <div className="entry">
            <h4 className="date-text">{this.formatDate(this.props.date)}</h4>
            <div className="action-bar">
              <span className="glyphicon glyphicon-edit" title="edit" onClick={this.handleEdit} />
              <span className="glyphicon glyphicon-share" title="share" onClick={this.handleShare} />
              <span className="glyphicon glyphicon-trash" title="delete" onClick={this.handleDelete} />
            </div>
            <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
        </div>
        <div className="tag-container">
            { this.props.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
        </div>
      </div>
    );
  }
}