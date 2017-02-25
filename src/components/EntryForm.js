import React, { Component } from 'react';

export default class EntryForm extends Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createEntryAndTags = this.createEntryAndTags.bind(this);
    this.getNewAndExistingTags = this.getNewAndExistingTags.bind(this);
    this.splitTags = this.splitTags.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
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

    entryRef.value = "";
    tagsRef.value = "";
  }

  createEntryAndTags(newEntryAndTags){
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

  render(){
    return(
      <div className="entry-form-container">
        <form id="entry-form" className="input-group" onSubmit={this.handleSubmit}>
          <h2 className="entry-form-title">Add a new entry:</h2>
          <textarea rows="6" className="form-control entry-textarea" placeholder="" ref="entry"></textarea>
          <input className="form-control tags-input" placeholder="#enter #tags #separated #byspace" ref="tags"/>
          <button type="submit" className="btn btn-info" >Save</button>
        </form>
        <p className="markdown-text">Note: DevJournal supports Markdown:</p>
        <div className="markdown well">
          # This is an h1 tag<br/>
          ## This is an h2 tag<br/>
          *This text will be italic*<br/>
          **This text will be bold**<br/>
          * List 1<br/>
            * Item 1a<br/>
          > Block quote<br/>
          ``` code inside here ````<br/>
          <br/>
          See more at: https://guides.github.com/features/mastering-markdown/
        </div>
      </div>
    );
  }
}
