import React, { Component } from 'react';
import TodaysStats from './TodaysStats';
import TotalStats from './TotalStats';
import StreakStats from './StreakStats';

export default class PulseView extends Component {
  constructor(props) {
    super(props);

    this.concatDate = this.concatDate.bind(this);
  }

  concatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(month < 10) {
      month = "0" + month;
    };
    var year = date.getFullYear();
    var currentDate = year + "-" + month + "-" + day;
    return currentDate;
  }

  render() {
    return(
      <div className="active-stats-component">
        <TodaysStats dates={this.props.dates} concatDate={this.concatDate} />
        <StreakStats dates={this.props.dates} concatDate={this.concatDate} />
        <TotalStats data={this.props.data} dates={this.props.dates} />
       </div>
    );
  }
}
