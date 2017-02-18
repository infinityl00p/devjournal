import React, { Component } from 'react';

export default class EntryForm extends Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
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

    this.props.onSubmit(newEntryAndTags);

    entryRef.value = "";
    tagsRef.value = "";
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

  handleTagChange(e) {}

  handleEntryChange(e) {}

  render(){
    return(
      <form id='entry-form' onSubmit={this.handleSubmit}>
        <tag className="entry-title"> Journal Entry: </tag>
        <textarea rows='6' onChange={this.handleEntryChange} id='entry' placeholder='printf("hello world");' ref="entry"></textarea>
        <input type='text' onChange={this.handleTagChange} id='tags' placeholder='#enter #tags #separated #byspace' ref="tags"/>
        <button type='submit' className='btn btn-default' >Save</button>
      </form>
    )
  }
}
