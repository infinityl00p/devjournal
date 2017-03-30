import React, { Component } from 'react';
import DataVisual from './DataVisual';

//this component will be a container for controlling data, "heavy lifting"
export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getSunday = this.getSunday.bind(this);
    this.addDays = this.addDays.bind(this);
    this.countPosts = this.countPosts.bind(this);

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

      dates.forEach(function (date) {
        var count = self.countPosts(date)
        data.push({
          day: daysOfWeek[i],
          count: count
        })
        i++
      })
      return data;
    }

    if(activeComponent === "Month") {
      var data = [
        {day: "Week 1", count:20},
        {day: "Week 2", count:30},
        {day: "Week 3", count:40},
        {day: "Week 4", count:50}
      ]
      return data;
    }

    if(activeComponent === "Year") {
      var data = [{day: "Jan", count:5}, {day: "Feb", count:5}, {day: "Mar", count:5},
    {day: "Apr", count:5},{day: "May", count:5},{day: "Jun", count:5},{day: "Jul", count:5}
  ,{day: "Aug", count:5},{day: "Sept", count:5},{day: "Oct", count:5},{day: "Nov", count:5},{day: "Dec", count:5}]
    }
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

  countPosts(date) {
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

//choose to filter data by tag, total posts, most used tag
  render() {
    return(
      <div className="data-visual">
        <p className="graph-title"> This {this.props.activeComponent} </p>
        <DataVisual data={this.state.data}/>
      </div>
    )
  }
}
