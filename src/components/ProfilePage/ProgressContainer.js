import React, { Component } from 'react';
import ProgressLineChart from './ProgressLineChart';

export default class ProgressContainer extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getSundayofCurrentWeek = this.getSundayofCurrentWeek.bind(this);
    this.getWeekData = this.getWeekData.bind(this);
    this.getMonthData = this.getMonthData.bind(this);
    this.getYearData = this.getYearData.bind(this);
    this.addDays = this.addDays.bind(this);
    this.countDailyPosts = this.countDailyPosts.bind(this);
    this.countWeeklyPosts = this.countWeeklyPosts.bind(this);
    this.countMonthlyPosts = this.countMonthlyPosts.bind(this);

    this.state = {
      data: this.getData("Week")
    }
  }

  componentWillReceiveProps(nextProps) {
    var activeComponent = nextProps.activeComponent;
    this.setState({
      data: this.getData(activeComponent)
    });
  }

  getData(activeComponent) {
    if(activeComponent === "Week") {
      return this.getWeekData();
    } else if(activeComponent === "Month") {
      return this.getMonthData();
    } else if(activeComponent === "Year") {
      return this.getYearData();
    }
  }

  getWeekData() {
    var dates = [];
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var sunday = this.getSundayofCurrentWeek();
    dates.push(sunday);
    self=this;

    daysOfWeek.forEach(function(currentValue, index) {
      if (index != 0) {
        dates.push(self.addDays(sunday, index));
      }
    });

    var self = this;
    var data = [];

    dates.forEach((date, index) => {
      var count = self.countDailyPosts(date);
      data.push({
        day: daysOfWeek[index],
        count: count
      });
    });
    return data;
  }

  getMonthData() {
    var weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    var i = 1;
    var data = [];
    weeks.forEach(() => {
      var count = this.countWeeklyPosts(i*7);
      data.push({
        day: weeks[i-1],
        count: count
      });
      i++;
    });

    return data;
  }

  getYearData() {
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var data = [];
    months.forEach((currentValue, index) => {
      var count = this.countMonthlyPosts(index);
      data.push({
        day: months[index],
        count: count
      });
    });
    return data;
  }

  getSundayofCurrentWeek() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var sunday = new Date(today.setDate(today.getDate()-today.getDay()));
    return sunday;
  }

  addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
  }

  countDailyPosts(date) {
    var currentWeek = 0;
    this.props.data.entries.forEach(function(object) {
      var date1 = new Date(object.date).setHours(0,0,0,0);
      var date2 = new Date(date).setHours(0,0,0,0);
      if(date1 === date2) {
        currentWeek++;
      }
    });
    return currentWeek ? currentWeek : 0;
  }

  countWeeklyPosts(week) {
    var firstDayOfWeek = new Date();
    var postCount = 0;
    firstDayOfWeek.setDate(week-6);
    firstDayOfWeek.setHours(0,0,0,0);
    var endOfWeek = new Date();
    endOfWeek.setDate(week+1);
    endOfWeek.setHours(0,0,0,0);
    this.props.data.entries.forEach(function(entry) {
      var entryDate = new Date(entry.date);
      entryDate.setHours(0,0,0,0);
      if(firstDayOfWeek.getTime() <= entryDate.getTime() && entryDate.getTime() <= endOfWeek.getTime()) {
        postCount++;
      }
    });
    return postCount ? postCount : 0;
  }

  countMonthlyPosts(month) {
    var postCount = 0;
    this.props.data.entries.forEach(function(entry) {
      var date1 = new Date(entry.date).getMonth();
      if (date1 === month){
        postCount++;
      }
    });
    return postCount ? postCount : 0;
  }

  render() {
    return(
      <div className="progress-container">
        <p className="graph-title">Entries This {this.props.activeComponent}</p>
        <ProgressLineChart data={this.state.data} />
      </div>
    );
  }
}
