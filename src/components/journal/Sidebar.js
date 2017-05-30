import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EntrySearch from './EntrySearch';
import EntryFilter from './EntryFilter';
import CreateEntryModal from './CreateEntryModal';
import SidebarActionList from './SidebarActionList';


export default class Sidebar extends Component {
  constructor() {
    super();

    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.createModal = this.createModal.bind(this);

    this.state = {
      activeComponent: 'EntryList'
    }
  }

  createModal() {
    var container = document.body.querySelector('#add-edit-modal');
    if (container === null) {
      container = document.createElement('div');
      container.id = 'add-edit-modal';
      document.body.appendChild(container);
    }

    var onCancel = (e) => {
      e.stopPropagation();
      ReactDOM.unmountComponentAtNode(container);
    };

    var onConfirm = () => {
      ReactDOM.unmountComponentAtNode(container);
    };

    ReactDOM.render(
      <CreateEntryModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        entries={this.props.entries}
        tags={this.props.tags}
        handleCreate={this.props.actions.createEntryAndTags}
      />,
      container
    );
  }

  handleActionSelect(actionType) {
    switch(actionType) {
      case 'Create':
        this.createModal();
        this.setState({ activeComponent: 'EntryForm' });
        return;
      default:
        return;
    }
  };

  render() {
    return(
      <div className="col-sm-3" id="journal-sidebar">
        <SidebarActionList
          onItemClick={this.handleActionSelect}
        />
        <EntryFilter
          entries={this.props.entries}
          tags={this.props.tags}
          onFilter={this.props.onFilter}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  entries: React.PropTypes.array,
  tags: React.PropTypes.array,
  onFilter: React.PropTypes.func
}
