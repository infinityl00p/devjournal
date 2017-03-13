import React, { Component } from 'react';

export default class PulseView extends Component {
  constructor(props) {
    super(props);

    this.renderDailyStats = this.renderDailyStats.bind(this);
    this.renderStreaks = this.renderStreaks.bind(this);
    this.renderTotals = this.renderTotals.bind(this);

    this.todaysPostCount = this.todaysPostCount.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
    this.totals = this.totals.bind(this);
  }

  renderDailyStats() {
    var todaysDate = this.todaysDate();
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

  renderStreaks() {

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
          <p>Total Number of Tags Used</p>
          <div id="stats-count">
            {totalTags}
          </div>
        </div>
      </div>
    )
  }

  todaysDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(month < 10){
      month = "0" + month;
    };
    var year = date.getFullYear();
    var currentDate = year + "-" + month + "-" + day;
    return currentDate;
  }

  todaysPostCount(todaysDate) {
    var postCount = 0;

    this.props.data.entries.filter(function(entry) {
      if (todaysDate === entry.date) {
        postCount++
      }
    });

    return postCount;
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
      <div className="active-view-component">
        {/*Daily Stats Posts Today/*/}
        {this.renderDailyStats()}
        {this.renderTotals()}
        {/*Streaks Last 30 days/Longest Streak/Current Streak*/}
        {/*Totals Total Posts/ Total Tag Count*/}
      </div>
    );
  }
}
