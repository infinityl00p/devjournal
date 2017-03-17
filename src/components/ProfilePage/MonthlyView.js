import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export default class MonthlyView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <CalendarHeatmap
        values={[
          { date: '2016-01-01', count: 1 },
          { date: '2016-01-03', count: 4 },
          { date: '2016-01-06', count: 2 },
        ]}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
        return `color-scale-${value.count}`;
        }}
        />
      </div>
    );
  }
}
