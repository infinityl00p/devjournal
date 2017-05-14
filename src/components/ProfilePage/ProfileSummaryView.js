import React, { Component } from 'react';
import StatsComponent from './StatsComponent';
import ActivityContainer from './ActivityContainer';

export default class ProfileSummaryView extends Component {
  constructor(props) {
    super(props);

    this.concatDate = this.concatDate.bind(this);
    this.todaysPostCount = this.todaysPostCount.bind(this);
    this.totalPostCount = this.totalPostCount.bind(this);
    this.totalTagCount = this.totalTagCount.bind(this);
    this.previous30Days = this.previous30Days.bind(this);
    this.longestStreak = this.longestStreak.bind(this);
    this.currentStreak = this.currentStreak.bind(this);
    this.priorDate = this.priorDate.bind(this);
    this.renderStatsComponent = this.renderStatsComponent.bind(this);

    this.state = {
      todaysPostCount: this.todaysPostCount(),
      totalPostCount: this.totalPostCount(),
      totalTagCount: this.totalTagCount(),
      previous30Days: this.previous30Days(),
      longestStreak: this.longestStreak(),
      currentStreak: this.currentStreak(),
    }
  }

  concatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(month < 10) {
      month = "0" + month;
    };
    if(day < 10) {
      day = "0" + day;
    };
    var year = date.getFullYear();
    var currentDate = year + "-" + month + "-" + day;
    return currentDate;
  }

  todaysPostCount() {
    var date = new Date();
    var todaysDate = this.concatDate(date);
    var postCount = 0;
    //TODO, make this more efficient, doesn't have to go through all of the days
    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T');

      if (todaysDate === entryDate[0]) {
        postCount++;
      }

    });
    return postCount;
  }

  totalPostCount() {
    var postCount = 0;

    this.props.data.entries.forEach(function() {
      postCount++;
    });

    return postCount;
  }

  totalTagCount() {
    var tagCount = 0;

    this.props.data.tags.forEach(function() {
      tagCount++;
    });

    return tagCount;
  }

  previous30Days() {
    var dateCount = 0;
    var priorDate = this.priorDate();

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T');
      entryDate = new Date(entryDate[0]);
      if(entryDate >= priorDate) {
        dateCount++;
      }
    });

    return dateCount;
  }

  currentStreak() {
    var streakCount = 0;
    var previousDate = null;
    var dates = [...this.props.dates];
    var dates = this.props.dates.reverse();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    yesterday.setHours(0,0,0,0);
    var lastPostDate = new Date(dates[0]);
    lastPostDate.setHours(0,0,0,0);

    if (lastPostDate.getTime() === yesterday.getTime()) {
      dates.forEach(function(date, index) {
        var entryDate = date.split('T')[0];
        if (previousDate !== null) {
          var date1 = new Date(previousDate);
          var date2 = new Date(entryDate);
          var timeDiff = Math.abs(date2.getTime() - date1.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          if (diffDays == 1) {
            streakCount++;
          } else {
            return streakCount;
          }
        } else if (index === 0 && entryDate !== previousDate) {
          streakCount++;
        }
        previousDate = entryDate;
      });
      return streakCount;
    }

    return streakCount;
  }

  longestStreak() {
    var currentStreakCount = 0;
    var highStreak = 0;
    var previousDate = null;

    this.props.dates.forEach(function(date,index) {
      var entryDate = date.split('T')[0];

      if (index === 0 || currentStreakCount === 0) {
        currentStreakCount++;
      }

      if(previousDate !== null ) {
        var date1 = new Date(previousDate);
        var date2 = new Date(entryDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (previousDate !== entryDate && diffDays == 1) {
          currentStreakCount++;
          if (currentStreakCount > highStreak) {
            highStreak = currentStreakCount;
          }
        } else if (diffDays > 1) {
          currentStreakCount = 1;
        }
      }
      previousDate = entryDate;
    });

    return highStreak;
  }

  priorDate() {
    var today = new Date();
    var date = new Date().setDate(today.getDate()-30);

    return date;
  }

  renderStatsComponent() {
    var statsComponentArray = [];
    var statsArray = [
      {
        name: "Total Post Count",
        count: this.state.totalPostCount
      },
      {
        name: "Total Tag Count",
        count: this.state.totalTagCount
      },
      {
        name: "30 Day Count",
        count: this.state.previous30Days
      },
      {
        name: "Longest Streak",
        count: this.state.longestStreak
      },
      {
        name: "Current Streak",
        count: this.state.currentStreak
      },
      {
        name: "Todays Post Count",
        count: this.state.todaysPostCount
      }
    ];

    statsComponentArray = statsArray.map(function(object) {
      return(<StatsComponent key={object.name} name={object.name} count={object.count} />);
    });

    return(
      <div className="stats-component">
        {statsComponentArray}
      </div>
    );
  }

  render() {
    return(
      <div id="summary-view">
        {this.renderStatsComponent()}
        <div id="recent-activity-container">
          <ActivityContainer
            data={this.props.data}
            dates={this.props.dates}
          />
        </div>
      </div>
    );
  }
}
