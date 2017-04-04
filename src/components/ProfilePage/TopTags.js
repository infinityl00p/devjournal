import React, { Component } from 'react';
import Tag from './Tag'

export default class TopTags extends Component {
  constructor() {
    super();

    this.sortTags = this.sortTags.bind(this);
    this.countFrequency = this.countFrequency.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  renderTags() {
    var sortedArray = this.sortTags();
    var visibleTagCount = 0;

    sortedArray = sortedArray.map(function (tagFrequency) {
      if (tagFrequency.id && tagFrequency.frequency &&  visibleTagCount < 5){
        visibleTagCount++;
        return (
          <Tag key={tagFrequency.id} id={tagFrequency.id} frequency={tagFrequency.frequency} />
        )
      }
    });

    return sortedArray;
  }

  sortTags() {
    var tagTextArray = [];

    this.props.data.tags.forEach(function (tags) {
      tagTextArray[tags.id] = tags.tagText;
    });
    var frequencyArray = this.countFrequency(tagTextArray);

    var sortedArray = frequencyArray.sort(function(a,b) {
      return (a.frequency < b.frequency) ? 1 : ((b.frequency < a.frequency) ? -1 : 0);
    });

    return sortedArray;
  }

  countFrequency(tagTextArray) {
    var frequencyArray = [];
    this.props.data.entries.forEach(function(entry, index) {
      if(entry.tags) {
        entry.tags.forEach(function(tag, index) {
          var tag = tag;
          if (frequencyArray[tag] === undefined) {
            frequencyArray[tag] = {
              id: tagTextArray[tag],
              frequency: 1
            };
          }else {
            frequencyArray[tag].frequency = frequencyArray[tag].frequency + 1;
          }
        })
      }
    });
    return frequencyArray;
  }

  render() {
    return(
      <div className="list-group" id="tag-list">
        <h2 id="top-tags-header">
          <span className="glyphicon glyphicon-star"></span>
          Top 5 Tags
        </h2>
        { this.renderTags() }
      </div>
    );
  }
}
