import React, { Component } from 'react';
import marked from 'marked';

export default class MarkdownPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const entryText = marked(this.props.entryText);
    return(
      <div id="markdown-preview">
        <p className="markdown-text"><a href="https://guides.github.com/features/mastering-markdown/">Markdown</a> Preview:</p>
        <div className="markdown well" dangerouslySetInnerHTML={{__html: entryText}} />
      </div>
    );
  }
}
