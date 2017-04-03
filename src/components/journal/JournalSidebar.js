import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActionBar from './ActionBar';
import ActionList from './ActionList';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import EntrySearch from './EntrySearch';
import EntryFilter from './EntryFilter';
import CreateEntryModal from './CreateEntryModal';


export default class JournalSidebar extends Component {
  constructor() {
    super();

    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.renderActionComponent = this.renderActionComponent.bind(this);
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
      case 'create':
        this.createModal();
        this.setState({ activeComponent: 'EntryForm' });
        return;
      case 'search':
        this.setState({ activeComponent: 'EntrySearch' });
        return;
      case 'filter':
        this.setState({ activeComponent: 'EntryFilter' });
        return;
      case 'list':
        this.setState({ activeComponent: 'EntryList' });
        return;
    }
  };

  renderActionComponent() {
    var ac = this.state.activeComponent;
    switch(ac) {
      case 'EntryForm':
        return(
          <EntryForm />
        );

      case 'EntrySearch':
        return(
          <EntrySearch
            entries={this.props.entries}
            tags={this.props.tags}
            onEntryClick={this.props.onEntryClick}
          />
        );
      case 'EntryFilter':
        return(
          <EntryFilter
            entries={this.props.entries}
            tags={this.props.tags}
            onEntryClick={this.props.onEntryClick}
          />
        );
      case 'EntryList':
        return(
          <EntryList
            entries={this.props.entries}
            tags={this.props.tags}
            onEntryClick={this.props.onEntryClick}
          />
        );
    }
  }

  render() {
    return(
      <div className="col-md-3" id="journal-sidebar">
        <ActionList />
        <EntryFilter
          entries={this.props.entries}
          tags={this.props.tags}
          onFilter={this.props.onFilter}
        />
      </div>
    );
  }
}

JournalSidebar.propTypes = {
  entries: React.PropTypes.array,
  tags: React.PropTypes.array,
  onFilter: React.PropTypes.func
}
