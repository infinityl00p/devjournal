import React, { Component } from 'react';
import Tag from './Tag';
import marked from 'marked';

export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  truncateDate(date) {
    return date.substring(0, date.indexOf('T'));
  }

  handleClick() {
    var entryAndTags = {
      entry: this.props.entry,
      tags: this.props.tags
    }

    if (this.props.onClick) {
      this.props.onClick(entryAndTags);
    }
  }

  render(){
    const entryText = marked(this.props.entry.entryText);
    return(
      <div className="entry-item-container" onClick={this.handleClick}>
        <a href="#" >
        <div className="entry-header">
          <div className="entry-date">
            {this.truncateDate(this.props.entry.date)}
          </div>
          <div className="tag-container">
            {
              this.props.tags.map((tag) =>
                <Tag key={tag.id} data={tag} />
              )
            }
          </div>
        </div>
        <div className="entry-text" dangerouslySetInnerHTML={{__html: entryText}} />
        </a>
      </div>
    );
  }

}

Entry.propTypes = {
  entry: React.PropTypes.object,
  tags: React.PropTypes.array
}
