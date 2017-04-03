import React, { Component } from 'react';
import TagSelectee from './TagSelectee';

export default class TagSelector extends Component {
  constructor() {
    super();

    this.handleTagClick = this.handleTagClick.bind(this);

    this.state = {
      activeTag: null
    }
  }

  handleTagClick(id, isActive) {
    if (isActive) {
      this.setState({ activeTag: id });
      this.props.onSelect(id);
    } else {
      this.setState({ activeTag: null });
      this.props.onSelect(null);
    }
  }

  render() {
    return(
      <div className="tag-selector">
        <span className="tag-text">Tags: </span>
        {
          this.props.tags.map((tag) => {
            return(
              <TagSelectee
                key={tag.id}
                text={tag.text}
                id={tag.id}
                isActive={this.state.activeTag === tag.id}
                onClick={this.handleTagClick}
              />
            )
          })
        }
      </div>
    );
  }
}