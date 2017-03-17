import React, { Component } from 'react';

export default class TodaysStats extends Component {
  constructor(props){
    super(props);

    this.todaysPostCount = this.todaysPostCount.bind(this);
  }

  todaysPostCount() {
    var date = new Date();
    var todaysDate = this.props.concatDate(date);
    var postCount = 0;

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T');
      if (todaysDate === entryDate[0]) {
        postCount++
      }
    });

    return postCount;
  }

  render() {
    return(
      <div className="col-md-12" id="stats">
        <p>Todays Post Count</p>
        <div id="stats-count">
          {this.todaysPostCount()}
        </div>
      </div>
    )
  }
}
