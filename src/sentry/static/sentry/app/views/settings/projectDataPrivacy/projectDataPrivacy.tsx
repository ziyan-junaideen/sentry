import React from 'react';

import Feature from 'app/components/acl/feature';
import FeatureDisabled from 'app/components/acl/featureDisabled';
import {PanelAlert} from 'app/components/panels';
import {t} from 'app/locale';

import ProjectDataPrivacyContent from './projectDataPrivacyContent';
import {DataPrivacy} from './types';

const ProjectDataPrivacy = ({params, organization}: DataPrivacy) => (
  <Feature
    features={['datascrubbers-v2']}
    organization={organization}
    renderDisabled={() => (
      <FeatureDisabled
        alert={PanelAlert}
        features={organization.features}
        featureName={t('Data Privacy - new')}
      />
    )}
  >
    <ProjectDataPrivacyContent params={params} organization={organization} />
  </Feature>
);

export default ProjectDataPrivacy;
