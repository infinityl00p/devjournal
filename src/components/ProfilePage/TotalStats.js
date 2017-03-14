import React, { Component } from 'react';

export default class TotalStats extends Component {
  constructor(props){
    super(props);

    this.renderTotals = this.renderTotals.bind(this);
    this.totals = this.totals.bind(this);

  }

  renderTotals() {
    var totals = this.totals();
    var totalPosts = totals.postCount;
    var totalTags = totals.tagCount;

    return(
      <div className="col-md-12" id="stats">
        <div className="col-md-6">
          <p>Total Posts</p>
          <div id="stats-count">
            {totalPosts}
          </div>
        </div>
        <div className="col-md-6">
          <p>Total Number of Tags</p>
          <div id="stats-count">
            {totalTags}
          </div>
        </div>
      </div>
    )
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
    return(
      <div>
        {this.renderTotals()}
      </div>
    )
  }
}
