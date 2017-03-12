import React, { Component } from 'react';

export default class TopTags extends Component {
  constructor(props) {
    super(props);

    this.sortTags = this.sortTags.bind(this);
  }

  sortTags() {
    var frequencyArray = [];
    var tagTextArray = [];
    this.props.data.tags.forEach(function (tags) {
      tagTextArray[tags.id] = tags.tagText;
    })

    var entries = this.props.data.entries;
    for (var i = 0; i < entries.length; i++) {
      for (var j = 0; j < entries[i].tags.length; j++) {
        var tag = entries[i].tags[j];
        if (frequencyArray[tag] === undefined) {
          frequencyArray[tag] = {
            id: tagTextArray[tag],
            frequency: 1
          };
        }
        else {
          frequencyArray[tag].frequency = frequencyArray[tag].frequency + 1;
        }
      }
    }

    var sortedArray = frequencyArray.sort(function(a,b) {
      return (a.frequency < b.frequency) ? 1 : ((b.frequency < a.frequency) ? -1 : 0);
    });

    sortedArray = frequencyArray.map(function (object) {
      return (
        <li className="list-group-item tag-list-item" key={object.id}>
          {object.id}
          <span className="frequency">
            {object.frequency}
          </span>
        </li>)
    })

    return sortedArray;
  }

  render() {
    return(
      <div className="tag-list list-group">
        <h2 id="top-tags-header">
          <span className="glyphicon glyphicon-star"></span>
          Top Tags
        </h2>
        { this.sortTags() }
      </div>
    )
  }
}
