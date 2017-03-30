import React, { Component } from 'react';
import DataVisual from './DataVisual';

//this component will be a container for controlling data, "heavy lifting"
export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.filterXAxis = this.filterXAxis.bind(this);
    this.concatDate = this.concatDate.bind(this);

    this.state = {
      data: [
      {name: 'January', value: 4000},
      {name: 'February', value: 3000},
      {name: 'March', value: 2000},
      {name: 'April', value: 2780},
      {name: 'May', value: 1890},
      {name: 'June', value: 2390},
      {name: 'July', value: 3490},
      ]
    }
  }

filterXAxis() {
  console.log("here")
  if(this.props.activeComponent == "Week") {
    //sunday to saturday
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
    lastSunday = this.concatDate(lastSunday);
    console.log(lastSunday);
  }
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


//choose to filter data by tag, total posts, most used tag
  render() {
    this.filterXAxis();
    return(
      <div>
        <p> This {this.props.activeComponent} </p>
        <DataVisual data={this.state.data}/>
      </div>
    )
  }
}
