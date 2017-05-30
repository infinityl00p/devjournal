import React, { Component } from 'react';
import SidebarActionListItem from './SidebarActionListItem';

export default class Sidebar extends Component {
  render() {
    return(
      <div id="action-list">
        <p className="sub-heading">ACTIONS</p>
          <SidebarActionListItem
            key="sidebar-item-create"
            icon="glyphicon-pencil"
            text="Create Entry"
            type="Create"
            onClick={this.props.onItemClick}
          />
      </div>
    );
  }
}


