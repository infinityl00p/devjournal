import React, { Component } from 'react';

export default class StreakStats extends Component {
  constructor(props){
    super(props);

    this.previous30Days = this.previous30Days.bind(this);
    this.longestStreak = this.longestStreak.bind(this);
    this.currentStreak = this.currentStreak.bind(this);
    this.priorDate = this.priorDate.bind(this);
  }

    /*TODO: Streaks Last 30 days/Longest Streak/Current Streak*/
  previous30Days() {
    var dateCount = 0;
    var priorDate = this.priorDate();

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T');
      entryDate = new Date(entryDate[0]);
      if(entryDate >= priorDate) {
        dateCount++;
      }
    })

    return dateCount;
  }

  currentStreak() {
    var streakCount = 0;
    var previousDate = 'NULL';
    var today = new Date();
    today = this.props.concatDate(today);

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T')[0]

      if (previousDate !== 'NULL' && entryDate !== previousDate) {
        var date1 = new Date(previousDate)
        var date2 = new Date(entryDate)
        var timeDiff = Math.abs(date2.getTime() - date1.getTime())
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
        if (diffDays == 1) {
          streakCount++
        }
        else {
          return streakCount
        }
      }
      else if (today === entryDate && entryDate !== previousDate) {
        streakCount++
      }

      previousDate = entryDate
    });
    return streakCount;
  }

  longestStreak() {
    var currentStreakCount = 0;
    var highStreak = 0;
    var previousDate = 'NULL';
    var today = new Date();
    today = this.props.concatDate(today);

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T')[0]
      entryDate = new Date(entryDate)
      //TODO: wanted to put a function here but kept returning undefined
      if(previousDate !== 'NULL') {
        var date1 = new Date(previousDate)
        var date2 = new Date(entryDate)
        var timeDiff = Math.abs(date2.getTime() - date1.getTime())
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

        if (previousDate !== entryDate && diffDays == 1) {
          currentStreakCount++
          if (currentStreakCount > highStreak) {
            highStreak=currentStreakCount
          }
        }
      }
      else if(entryDate === today){
        currentStreakCount++;
        highStreak++;
      }

      previousDate = entryDate
    });
    return highStreak;
  }

  priorDate() {
    var today = new Date();
    var date = new Date().setDate(today.getDate()-30);

    return date;
  }

  render() {
    return(
      <div className="col-md-12" id="stats">
        <div className="col-md-4">
          <p>30 Day Post Count</p>
          <div id="stats-count">
            {this.previous30Days()}
          </div>
        </div>
        <div className="col-md-4">
          <p>Current Streak</p>
          <div id="stats-count">
            {this.currentStreak()}
          </div>
        </div>
        <div className="col-md-4">
          <p>Longest Streak</p>
          <div id="stats-count">
            {this.longestStreak()}
          </div>
        </div>
      </div>
    );
  }
}
