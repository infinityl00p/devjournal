import React, { Component } from 'react';

export default class TotalStats extends Component {
  constructor(props){
    super(props);

    this.totals = this.totals.bind(this);
  }

  totals() {
    var postCount = 0;
    var tagCount = 0;

    this.props.data.entries.forEach(function() {
      postCount++
    });

    this.props.data.tags.forEach(function() {
      tagCount++
    });

    return({
      postCount: postCount,
      tagCount: tagCount
    });
  }

  render() {
    var totals = this.totals();
    return(
      <div className="col-md-12" id="stats">
        <div className="col-md-6">
          <p>Total Posts</p>
          <div id="stats-count">
            {totals.postCount}
          </div>
        </div>
        <div className="col-md-6">
          <p>Total Number of Tags</p>
          <div id="stats-count">
            {totals.tagCount}
          </div>
        </div>
      </div>
    )
  }
}
