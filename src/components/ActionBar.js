import React, { Component } from 'react';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.handleJournalClick = this.handleJournalClick.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      actionText: '',
      activeView: this.props.activeView
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeView !== this.state.activeView) {
      this.setState({ activeView: nextProps.activeView });
    }
  }

  handleJournalClick() {
    this.setState({ activeView: 'journal' });
    this.props.onNav('journal');
  }

  handleTodoClick() {
    this.setState({ activeView: 'todo' });
    this.props.onNav('todo');
  }

  handleProfileClick() {
    this.setState({ activeView: 'profile' });
    this.props.onNav('profile');
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onInputChange(e) {
    var actionText = e.target.value;
    this.setState({ actionText: actionText });

    // TODO: Change this from search to an `actioner` that parse commands from the string
    this.onSearch(actionText);
  }

  onSearch(searchTerm) {
    this.props.onSearch(searchTerm, this.state.activeView);
  }

  render() {
    return(
      <div id="action-bar2" className="col-sm-12">
        <div className="navi col-sm-3">
          <div className="journal-link" onClick={this.handleJournalClick}>
            <span className={this.state.activeView === 'journal' ? "active" : ""}>
              <a href="#">JOURNAL</a>
            </span>
          </div>
          <div className="todo-link" onClick={this.handleTodoClick}>
            <span className={this.state.activeView === 'todo' ? "active" : ""}>
              <a href="#">TODO</a>
            </span>
          </div>
        </div>
        <div className="action-input col-sm-7">
          <form onSubmit={this.onSubmit} className="input-group">
            <input
              placeholder="Enter search text"
              className="form-control"
              value={this.state.actionText}
              onChange={this.onInputChange}
            />
          </form>
        </div>
        <div className="preferences col-sm-2" onClick={this.handleProfileClick}>
          <div className="profile">
            <a href="#" className={this.state.activeView === 'profile' ? "active" : ""}>
              <span className="glyphicon glyphicon-user"/>
              <p>PROFILE</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}