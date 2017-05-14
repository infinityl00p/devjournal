import React, { Component } from 'react';

export default class EntryForm extends Component {
  render(){
    return(
      <div className="entry-form-container">
        <p className="markdown-text">Note - DevJournal supports <a href="https://guides.github.com/features/mastering-markdown/">Markdown</a>:</p>
        <div className="markdown well">
          # This is an h1 tag<br/>
          ## This is an h2 tag<br/>
          *This text will be italic*<br/>
          **This text will be bold**<br/>
          * List Item 1<br/>
          * List Item 2<br/>
          > Block quote<br/>
          ``` code inside here ```<br/>
        </div>
      </div>
    );
  }
}

EntryForm.propTypes = {
  entries: React.PropTypes.array,
  tags: React.PropTypes.array,
  handleCreate: React.PropTypes.func
}
