import React from 'react';

import ProjectDataPrivacyContent from './projectDataPrivacyContent';
import {DataPrivacy} from './types';

const ProjectDataPrivacy = ({params, organization}: DataPrivacy) => (
  <ProjectDataPrivacyContent params={params} organization={organization} />
);

export default ProjectDataPrivacy;
