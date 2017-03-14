import React, { Component } from 'react';

export default class TodaysStats extends Component {
  constructor(props){
    super(props);

    this.todaysPostCount = this.todaysPostCount.bind(this);
    this.renderTodaysStats = this.renderTodaysStats.bind(this);
  }

  todaysPostCount(todaysDate) {
    var postCount = 0;

    this.props.data.entries.filter(function(entry) {
      var entryDate = entry.date.split('T');
      if (todaysDate === entryDate[0]) {
        postCount++
      }
    });

    return postCount;
  }

  renderTodaysStats() {
    var todaysDate = this.props.todaysDate();
    var todaysPostCount = this.todaysPostCount(todaysDate);

    return(
      <div className="col-md-12" id="stats">
        <p>Todays Post Count</p>
        <div id="stats-count">
          {todaysPostCount}
        </div>
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.renderTodaysStats()}
      </div>
    )
  }
}
