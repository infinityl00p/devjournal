import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import $ from 'jquery';

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.countPerDay = this.countPerDay.bind(this);

    this.state = {
      countPerDay: this.countPerDay()
    }
  }

  countPerDay() {
    var previousDate;
    var dateAndCountArray = []
    var index = 0;

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T')[0]
      if (previousDate === entryDate) {
        dateAndCountArray[index-1].count++
      }
      else {
        dateAndCountArray.push({
          date: entryDate,
          count: 1
        })
        index++
      }
      previousDate = entryDate
    })
    return dateAndCountArray;
  }

  render(){
    const customTooltipDataAttrs = {'data-toggle': 'tooltip'}

    function customTitleForValue(value) {
      if(value) {
        if(`${value.count}` == 1) {
          return `${value.count} entry on ${value.date}`
        }
        else {
          return `${value.count} entries on ${value.date}`
        }
      }
    }

    return(
      <div id="heatmap">
        <CalendarHeatmap
        endDate={new Date()}
        numDays={365}
        horizontal={true}
        values={this.state.countPerDay}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
        return `color-gitlab-${value.count}`;
        }}
        titleForValue={customTitleForValue}
        tooltipDataAttrs={customTooltipDataAttrs}
        />
      </div>
    )
  }
}
