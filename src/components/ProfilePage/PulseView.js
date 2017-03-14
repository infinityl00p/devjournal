import React, { Component } from 'react';
import TodaysStats from './TodaysStats';
import TotalStats from './TotalStats';
import StreakStats from './StreakStats';

export default class PulseView extends Component {
  constructor(props) {
    super(props);

    this.todaysDate = this.todaysDate.bind(this);
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

  render() {
    return(
      <div className="active-stats-component">
        <TodaysStats data={this.props.data} todaysDate={this.todaysDate} />
        <TotalStats data={this.props.data} />
       </div>
    );
  }
}
