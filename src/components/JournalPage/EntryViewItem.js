import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tag from './Tag';
import Modal from './Modal';

import axios from 'axios';
import marked from 'marked';
import base62 from 'base62';

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';
const URL = 'http://localhost:8080/';
// const URL = 'http://devjournal.co/';

export default class EntryViewItem extends Component {
  constructor(props) {
    super(props);

    this.handleShare = this.handleShare.bind(this);
    this.renderSharedLinkInput = this.renderSharedLinkInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      sharedEntryUrl: '',
      showLink: false,
      entryText: this.props.entryText,
      tags: this.props.tags
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entryText: nextProps.entryText,
      tags: nextProps.tags
    });
  }

  formatDate(date) {
    var splitDate = date.substring(0, date.indexOf('T')).split('-');
    var reformattedDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2])
    var fullDate = new Date(reformattedDate).toDateString();
    return fullDate;
  }

  handleClick(){
    if (this.props.onClick){
      var updatedEntry = {
        date: this.props.date,
        entryText: this.props.entryText,
        id: this.props.id,
      }

      var visibleEntry = {
        entry: updatedEntry,
        tags: this.props.tags
      }
      this.props.onClick(visibleEntry);
    }
  }

  handleEdit() {
    // Render edit Modal (or do it in the view)
    // var editedData = { 'something' };
    // this.props.onEdit(editedData);
    var container = document.body.querySelector('#add-edit-modal');
    if (container === null) {
      container = document.createElement('div');
      container.id = 'add-edit-modal';
      document.body.appendChild(container);
    }

    var onCancel = (e) => {
      e.stopPropagation();
      ReactDOM.unmountComponentAtNode(container);
    };

    var onConfirm = (e, updatedEntryText) => {
      ReactDOM.unmountComponentAtNode(container);
      this.setState({
        entryText: updatedEntryText
      });

      var editedData = {
        id: this.props.id,
        date: this.props.date,
        entryText: updatedEntryText,
        tags: this.props.tags
      }
      this.props.onEdit(this.props.id, editedData)
    };

    ReactDOM.render(
      <Modal
        onCancel={onCancel}
        onConfirm={onConfirm}
        entryText={this.props.entryText}
        tags={this.props.tags}
      />,
      container
    );
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
          value={URL + 's/' + this.state.sharedEntryUrl}
        />
      );
    }
  }

  handleDelete() {
     this.props.onDelete(this.props.id);
  }

  render() {
    const entryText = marked(this.state.entryText);
    return(
      <div className="entry-view-item" onClick={this.handleClick}>
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
          { this.state.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
        </div>
      </div>
    );
  }
}

EntryViewItem.propTypes = {
  id: React.PropTypes.number,
  date: React.PropTypes.string,
  entryText: React.PropTypes.string,
  tags: React.PropTypes.array
}
