import React from 'react';
import Reflux from 'reflux';
import createReactClass from 'create-react-class';
import {browserHistory} from 'react-router';

import ProjectsStore from 'app/stores/projectsStore';
import recreateRoute from 'app/utils/recreateRoute';

import ProjectDatascrubbersContent from './projectDatascrubbersContent';

const ProjectDatascrubbers = createReactClass({
  // @ts-ignore Type 'void[]' is not assignable to type 'Mixin<unknown, {}>[]'
  mixins: [Reflux.listenTo(ProjectsStore, 'onProjectsUpdate')],
  onProjectsUpdate(_projects) {
    if (!this.changedSlug) {
      return;
    }
    const project = ProjectsStore.getBySlug(this.changedSlug);

    if (!project) {
      return;
    }

    browserHistory.replace(
      recreateRoute('', {
        ...this.props,
        params: {
          ...this.props.params,
          projectId: this.changedSlug,
        },
      })
    );
  },

  render() {
    return (
      <ProjectDatascrubbersContent
        {...this.props}
        onChangeSlug={newSlug => (this.changedSlug = newSlug)}
      />
    );
  },
});

export default ProjectDatascrubbers;
