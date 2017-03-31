import React, { Component } from 'react';
import Tag from './Tag'

export default class TopTags extends Component {
  constructor(props) {
    super(props);

    this.sortTags = this.sortTags.bind(this);
    this.countFrequency = this.countFrequency.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  renderTags() {
    var sortedArray = this.sortTags();

    var i = 0;
    sortedArray = sortedArray.map(function (object) {
      if (object.id && object.frequency && i < 5){
        i++;
        return (
          <Tag key={object.id} id={object.id} frequency={object.frequency} />
        )
      }
    })
    return sortedArray;
  }

  sortTags() {
    var tagTextArray = [];

    this.props.data.tags.forEach(function (tags) {
      tagTextArray[tags.id] = tags.tagText;
    })

    var frequencyArray = this.countFrequency(tagTextArray);

    var sortedArray = frequencyArray.sort(function(a,b) {
      return (a.frequency < b.frequency) ? 1 : ((b.frequency < a.frequency) ? -1 : 0);
    });
    return sortedArray;
  }

  countFrequency(tagTextArray) {
    var frequencyArray = [];
    var entries = this.props.data.entries;

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].tags){
        for (var j = 0; j < entries[i].tags.length; j++) {
          var tag = entries[i].tags[j]
          if (frequencyArray[tag] === undefined) {
            frequencyArray[tag] = {
              id: tagTextArray[tag],
              frequency: 1
            }
          }
          else {
            frequencyArray[tag].frequency = frequencyArray[tag].frequency + 1
          }
        }
      }
    }

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
