import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip'

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.countPerDay = this.countPerDay.bind(this);
    this.customTitleForValue = this.customTitleForValue.bind(this);
    this.customClassForValue = this.customClassForValue.bind(this);

    this.state = {
      countPerDay: this.countPerDay()
    }
  }

  countPerDay() {
    var previousDate;
    var dateAndCountArray = []
    var index = 0;

    this.props.dates.forEach(function(date) {
      var entryDate = date.split('T')[0];
      if (previousDate === entryDate) {
        dateAndCountArray[index-1].count++;
      } else {
        dateAndCountArray.push({
          date: entryDate,
          count: 1
        });
        index++;
      }
      previousDate = entryDate;
    });
    return dateAndCountArray;
  }

  customTitleForValue(value) {
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

  customClassForValue(value) {
    if (!value) {
      return "color-empty";
    }

    if (value.count > 4) {
      return "color-gitlab-4";
    }

    return "color-gitlab-" + value.count;
  }

  render(){
    return(
      <div id="heatmap">
        <ReactTooltip />
        <CalendarHeatmap
          endDate={new Date()}
          numDays={365}
          horizontal={true}
          values={this.state.countPerDay}
          classForValue={this.customClassForValue}
          tooltipDataAttrs={this.customTitleForValue}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}
