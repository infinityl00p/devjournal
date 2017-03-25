import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export default class HeatMap extends Component {
  render(){
    return(
      <div id="HeatMap">
        <CalendarHeatmap
        endDate={new Date()}
        numDays={365}
        values={[
          { date: '2017-01-01', count: 1 },
          { date: '2017-01-03', count: 4 },
          { date: '2017-01-06', count: 2 },
        ]}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
        return `color-scale-${value.count}`;
        }}
        />
      </div>
    )
  }
}
