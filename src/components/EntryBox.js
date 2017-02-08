import React, { Component } from 'react';

export default class EntryPage extends Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.splitCategories = this.splitCategories.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var categoryString = e.target.categories.value;
    //prepare categories
    var categories = this.splitCategories(categoryString);
    var date = this.todaysDate();
    var entry = e.target.entry.value;

    var newEntry = {
      entry,
      categories,
      date
    }

    this.props.renderEntries(newEntry);
  }

  todaysDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var currentDate = year + "-" + month + "-" + day;
    return currentDate;
  }

  splitCategories(categoryString){
    var categoryArray = categoryString.match(/#\S+/g);
    return categoryArray;
  }

  handleCategoryChange(e){
  }

  handleEntryChange(e){
  }

//add form submit action functions, good place to insert axios calls
  render(){
    return(
      <form id='entry-form' onSubmit={this.handleSubmit}>
        <label className="entry-title"> Journal Entry: </label>
        <textarea rows='6' onChange={this.handleEntryChange} id='entry' placeholder='printf("hello world");'></textarea>
        <input type='text' onChange={this.handleCategoryChange} id='categories' placeholder='#enter #categories #separated #byspace'/>
        <button type='submit' className='btn btn-default' >Save</button>
      </form>
    )
  }
}
