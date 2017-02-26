import React, { Component } from 'react';
import SharedEntryItem from './SharedEntryItem';

var tempEntry = {
  entry: {
    date: "2017-02-22T04:50:46.729656Z",
    entryText:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    id: 28,
    tags: [29, 31, 34]
  },
  tags: [
    {
      id: 29,
      tagText: '#first'
    },
    {
      id: 31,
      tagText: '#second'
    },
    {
      id: 34,
      tagText: '#third'
    }
  ]
};

export default class SharedEntryView extends Component {
  constructor() {
    super();

    // TODO: Call backend to get entryData.
  }
  render() {
    var props = {
      key: tempEntry.entry.id,
      date: tempEntry.entry.date,
      entryText: tempEntry.entry.entryText,
      id: tempEntry.entry.id,
      tags: tempEntry.tags
    };
    return(
      <div id="shared-entry-view" className="col-md-12">
        <SharedEntryItem {...props} />
      </div>
    );
  }
}