import React, { Component } from 'react';
import DataVisual from './DataVisual';

//this component will be a container for controlling data, "heavy lifting"
export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getSunday = this.getSunday.bind(this);
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
    var activeComponent = nextProps.activeComponent
    this.setState({
      data: this.getData(activeComponent)
    })
  }

  getData(activeComponent) {
    if(activeComponent === "Week") {
      return this.getWeekData();
    }

    if(activeComponent === "Month") {
      return this.getMonthData();
    }

    if(activeComponent === "Year") {
      return this.getYearData();
    }
  }

  getWeekData() {
    var dates = [];
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var sunday = this.getSunday();
    dates.push(sunday);
    for (var i=1; i <= 6; i++) {
      dates.push(this.addDays(sunday, i))
    }
    var self = this;
    var i = 0;
    var data = [];

    dates.forEach((date) => {
      var count = self.countDailyPosts(date)
      data.push({
        day: daysOfWeek[i],
        count: count
      })
      i++
    })
    return data;
  }

  getMonthData() {
    //Sunday morning to saturday night * 4, Compare Sunday <= Data < nextSunday
    var weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    var i = 1;
    var data = [];
    weeks.forEach(() => {
      var count = this.countWeeklyPosts(i*7)
      data.push({
        day: weeks[i-1],
        count: count
      })
      i++;
    })

    return data;
  }

  getYearData() {
    //get current year
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var i = 0;
    var data = [];
    months.forEach(() => {
      var count = this.countMonthlyPosts(i)
      data.push({
        day: months[i],
        count: count
      })
      i++
    })
    return data;
  }

  getSunday() {
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
    var count = 0;
    this.props.data.entries.forEach(function(object) {
      var date1 = new Date(object.date).setHours(0,0,0,0);
      var date2 = new Date(date).setHours(0,0,0,0);
      if(date1 === date2) {
        count++;
      }
    })
    return count ? count : 0;
  }

  countWeeklyPosts(week) {
    //beginning of week
    var startWeek = new Date();
    var count = 0;
    startWeek.setDate(week-6);
    startWeek.setHours(0,0,0,0);
    var endWeek = new Date();
    endWeek.setDate(week+1);
    endWeek.setHours(0,0,0,0);
    this.props.data.entries.forEach(function(object) {
      var date = new Date(object.date);
      date.setHours(0,0,0,0);
      if(startWeek.getTime() <= date.getTime() && date.getTime() <= endWeek.getTime()) {
        count++;
      }
    })
    //TODO: add some exception handling for last couple days of month
    return count ? count : 0;
  }

  countMonthlyPosts(month) {
    var count = 0;
    this.props.data.entries.forEach(function(object) {
      var date1 = new Date(object.date).getMonth();
      if (date1 === month){
        count++;
      }
    })
    return count ? count : 0;
  }

//choose to filter data by tag, total posts, most used tag
  render() {
    return(
      <div className="data-visual">
        <p className="graph-title"> Entries This {this.props.activeComponent} </p>
        <DataVisual data={this.state.data}/>
      </div>
    )
  }
}
