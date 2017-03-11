import React, { Component } from 'react';

export default class TopTags extends Component {
  constructor(props) {
    super(props);

    this.sortTags = this.sortTags.bind(this);
  }

  sortTags() {
    var sortedTags = [];
    var TagTally = [];
    this.props.data.entries.map(function(entry){
      entry.tags.map(function(tag){
        TagTally[tag]++;
      })
    })
    console.log(TagTally);
    return sortedTags;
  }

  render() {
    return(
      <div className="tag-list list-group">
        <h2 id="tag-list-header">
          Top tags
        </h2>
        { this.sortTags() }
      </div>
    )
  }
}
