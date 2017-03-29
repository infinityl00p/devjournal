import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip'

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
    const customTooltipDataAttrs = {'data-tip': 'blah'}

    function customTitleForValue(value) {
      if(value) {
        if(value.count == 1) {
          var obj = {
            'data-tip' :  value.count + " entry on " + value.date
          }
          return obj;
        }
        else if(value.count > 1){
          var obj = {
            'data-tip' :  value.count + " entries on " + value.date
          }
          return obj;
        }
        else {
          var obj = {
            'data-tip' :  "No entry :("
          }
          return obj;
        }
      }
    }

    return(
      <div id="heatmap">
      <ReactTooltip />
        <CalendarHeatmap
        endDate={new Date()}
        numDays={365}
        horizontal={true}
        values={this.state.countPerDay}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
        return "color-gitlab-" + value.count;
        }}
        tooltipDataAttrs={customTitleForValue}
        />
      </div>
    )
  }
}
