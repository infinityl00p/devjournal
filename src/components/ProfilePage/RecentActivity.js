import React, { Component } from 'react';
import marked from 'marked';

export default class RecentActivity extends Component {
  constructor(props) {
    super(props);

    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    var entryArray=[]
    var arrayLength = this.props.data.entries.length
    for (var i = arrayLength - 1; i > arrayLength - 5; i--){
      const entryText = marked(this.props.data.entries[i].entryText);
      entryArray.push(
        <div key={i}>
          <p dangerouslySetInnerHTML={{__html: entryText}} key={this.props.data.entries[i].entryText} className="entry" />
        </div>
      );
    }
    return entryArray;
  }

  render() {
    return(
      <div>
        {this.renderEntries()}
      </div>
    )
  }
}
