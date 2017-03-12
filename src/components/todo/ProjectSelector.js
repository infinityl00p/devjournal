import React, { Component } from 'react';
import ProjectSelectee from './ProjectSelectee';

export default class ProjectSelector extends Component {
  constructor() {
    super();

    this.handleProjectClick = this.handleProjectClick.bind(this);

    this.state = {
      activeProject: null
    }
  }

  handleProjectClick(id, isActive) {
    if (isActive) {
      this.setState({ activeProject: id });
      this.props.onSelect(id);
    } else {
      this.setState({ activeProject: null });
      this.props.onSelect(null);
    }
  }

  render() {
    return(
      <div className="project-selector">
        <span className="project-text">Projects: </span>
        {
          this.props.projects.map((project) => {
            return(
              <ProjectSelectee
                key={project.id}
                text={project.text}
                id={project.id}
                isActive={this.state.activeProject === project.id}
                onClick={this.handleProjectClick}
              />
            )
          })
        }
      </div>
    );
  }
}