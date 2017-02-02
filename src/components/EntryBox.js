import React, { Component } from 'react';

export default class EntryPage extends Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

  }

  handleSubmit(e){
    e.preventDefault();
  }

  handleCategoryChange(e){
  }

  handleEntryChange(e){

  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label className="entry-title"> Journal Entry: </label>
        <textarea rows='6' onChange={this.handleEntryChange} id='input-text' placeholder='printf("hello world");'></textarea>
        <input type='text' onChange={this.handleCategoryChange} id='categories' placeholder='#enter #categories #separated #byspace'/>
        <button type='submit' className='btn btn-default' >Save</button>
      </form>
    )
  }
}
