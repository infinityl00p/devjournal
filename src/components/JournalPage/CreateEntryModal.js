import React, { Component } from 'react';
import MarkdownPreview from './MarkdownPreview';
import marked from 'marked';

export default class CreateEntryModal extends Component {
  constructor(props) {
    super(props);

    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createEntryAndTags = this.createEntryAndTags.bind(this);
    this.getNewAndExistingTags = this.getNewAndExistingTags.bind(this);
    this.splitTags = this.splitTags.bind(this);
    this.todaysDate = this.todaysDate.bind(this);

    this.state = {
      entryText: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: figure out why I can use .value here and then not get it everytime later
    var entryRef = this.refs.entry;
    var tagsRef = this.refs.tags;

    var entry = entryRef.value;
    var tags = this.splitTags(tagsRef.value);
    var date = this.todaysDate();

    var newEntryAndTags = {
      entry,
      tags,
      date
    }

    this.createEntryAndTags(newEntryAndTags);
    this.props.onConfirm();

    entryRef.value = "";
    tagsRef.value = "";
  }

  createEntryAndTags(newEntryAndTags) {
    var newAndExistingTags;

    var existingTagsMap = _.reduce(this.props.tags, function (existingTagsMap, tag) {
      existingTagsMap[tag.tagText] = tag.id;
      return existingTagsMap;
    }, {});

    if (newEntryAndTags.tags !== null && newEntryAndTags.tags.length > 0) {
      newAndExistingTags = this.getNewAndExistingTags(newEntryAndTags.tags, existingTagsMap);
    } else {
      newAndExistingTags = {};
    }

    this.props.handleCreate({
      entryText: newEntryAndTags.entry,
      newTags: newAndExistingTags.newTags,
      existingTagIds: newAndExistingTags.existingTagIds
    });
  }

  getNewAndExistingTags(tags, existingTagsMap) {
    var newTags = [];
    var existingTagIds = [];

    tags.forEach(function(tag) {
      if (tag in existingTagsMap) {
        existingTagIds.push(existingTagsMap[tag]);
      } else {
        newTags.push(tag);
      }
    });

    return { newTags: newTags, existingTagIds: existingTagIds };
  }

  todaysDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var currentDate = year + "-" + month + "-" + day;
    return currentDate;
  }

  splitTags(tagString) {
    var tagArray = tagString.match(/#\S+/g);
    return tagArray;
  }

  handleEntryChange(e) {
    this.setState({
      entryText: e.target.value
    });
  }

  render() {
    return (
      <div id="create-entry-modal" className="modal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="edit-entry-header">Add a new entry: </label>
                  <textarea rows="8" onChange={this.handleEntryChange} value={this.state.entryText} className="form-control entry-textarea" ref="entry"></textarea>
                  <input className="form-control tags-input" placeholder="#enter #tags #separated #byspace" ref="tags"/>
                  <MarkdownPreview entryText={this.state.entryText} />
                </div>
                <button type="button" onClick={this.props.onCancel} className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-default" data-dismiss="modal">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
