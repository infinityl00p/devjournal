import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tag from './Tag';

import axios from 'axios';
import marked from 'marked';
import base62 from 'base62';

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';
const URL = 'http://localhost:8080/';
// const URL = 'http://devjournal.co/';

export default class EntryViewItem extends Component {
  constructor() {
    super();

    this.handleShare = this.handleShare.bind(this);
    this.renderSharedLinkInput = this.renderSharedLinkInput.bind(this);

    this.state = {
      sharedEntryUrl: '',
      showLink: false
    }
  }

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
    if (this.state.sharedEntryUrl === '') {
      const request = axios.post(
        ROOT_URL + '/shared',
        { entryId: this.props.id }
      ).then((response) => {
        this.setState({ sharedEntryUrl: base62.encode(response.data.id) })
        this.setState({ showLink: !this.state.showLink });
      });
    } else {
      this.setState({ showLink: !this.state.showLink });
      this.renderSharedLinkInput();
    }
  }

  // TODO: maybe render this as a modal or some other thing.
  renderSharedLinkInput() {
    if (this.state.showLink) {
      return(
        <input
          className="shared-link-input"
          type="text"
          readOnly
          value={URL + this.state.sharedEntryUrl}
        />
      );
    }
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
            <div className="shared-link-container">{this.renderSharedLinkInput()}</div>
            <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
        </div>
        <div className="tag-container">
            { this.props.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
        </div>
      </div>
    );
  }
}