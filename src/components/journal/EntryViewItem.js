import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tag from './Tag';
import EditModal from './EditModal';

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
    this.renderGlyphicons = this.renderGlyphicons.bind(this);
    this.toggleExpandedEntry = this.toggleExpandedEntry.bind(this);

    this.state = {
      sharedEntryUrl: '',
      showLink: false,
      entryText: this.props.entryText,
      tags: this.props.tags,
      isExpanded: false
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
    var reformattedDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
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

      var tagIds = [];
      tagIds = this.props.tags.map((tagObject) => {
        return tagObject.id
      });

      var editedData = {
        id: this.props.id,
        date: this.props.date,
        entryText: updatedEntryText,
        tags: tagIds
      };

      this.props.onEdit(this.props.id, editedData)
    };

    ReactDOM.render(
      <EditModal
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

  renderGlyphicons() {
    if(this.props.singleView) {
      return(
        <div className="action-bar">
          <span className="glyphicon glyphicon-arrow-left" title="left" onClick={this.props.handleLeftClick}/>
          <span className="glyphicon glyphicon-edit" title="edit" onClick={this.handleEdit} />
          <span className="glyphicon glyphicon-share" title="share" onClick={this.handleShare} />
          <span className="glyphicon glyphicon-trash" title="delete" onClick={this.handleDelete} />
          <span className="glyphicon glyphicon-arrow-right" title="right" onClick={this.props.handleRightClick}/>
        </div>
      )
    }
    return(
      <div className="action-bar">
        <span className="glyphicon glyphicon-edit" title="edit" onClick={this.handleEdit} />
        <span className="glyphicon glyphicon-share" title="share" onClick={this.handleShare} />
        <span className="glyphicon glyphicon-trash" title="delete" onClick={this.handleDelete} />
      </div>
    );
  }

  toggleExpandedEntry() {
    var prevState = this.state.isExpanded;
    this.setState({
      isExpanded: !prevState
    });
  }

  render() {
    const entryText = marked(this.state.entryText);
    if(this.props.singleView) {
      return(
        <div className="entry-view-item">
          <div className="entry">
            <h4 className="date-text">{this.formatDate(this.props.date)}</h4>
            {this.renderGlyphicons()}
            <div className="shared-link-container">{this.renderSharedLinkInput()}</div>
            <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
          </div>
          <div className="tag-container">
            { this.state.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
          </div>
        </div>
      );
    }
    return(
      <div className="entry-view-item" onClick={this.handleClick}>
        <div className={this.state.isExpanded ? "entry-expanded" : "entry"}>
          <h4 className="date-text">{this.formatDate(this.props.date)}</h4>
          {this.renderGlyphicons()}
          <div className="shared-link-container">{this.renderSharedLinkInput()}</div>
          <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
          <div className="tag-container">
            { this.state.tags.map((tag) => <Tag key={tag.id} data={tag} />) }
          </div>
          <span className={this.state.isExpanded ? "resize-entry glyphicon glyphicon-resize-small" : "resize-entry glyphicon glyphicon-resize-full"} onClick={this.toggleExpandedEntry}></span>
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
