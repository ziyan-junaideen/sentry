/* eslint-disable react/prop-types */
import React, {Mixin} from 'react';
import Reflux from 'reflux';
import createReactClass from 'create-react-class';
import {browserHistory} from 'react-router';

import ProjectsStore from 'app/stores/projectsStore';
import recreateRoute from 'app/utils/recreateRoute';

import ProjectDatascrubbersContent from './projectDatascrubbersContent';

const ProjectDataPrivacy = createReactClass({
  mixins: ([Reflux.listenTo(ProjectsStore, 'onProjectsUpdate')] as unknown) as Mixin<
    unknown,
    {}
  >[],
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
        params={this.props.params}
        organization={{
          features: this.props.organization.features,
          access: this.props.organization.access,
        }}
        onChangeSlug={newSlug => (this.changedSlug = newSlug)}
      />
    );
  },
});

export default ProjectDataPrivacy;
