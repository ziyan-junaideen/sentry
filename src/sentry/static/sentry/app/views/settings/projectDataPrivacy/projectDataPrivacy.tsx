import React from 'react';

import Feature from 'app/components/acl/feature';
import FeatureDisabled from 'app/components/acl/featureDisabled';
import {PanelAlert} from 'app/components/panels';
import {t} from 'app/locale';

import ProjectDataPrivacyContent from './projectDataPrivacyContent';
import {DataPrivacy} from './types';

const ProjectDataPrivacy = ({params, organization}: DataPrivacy) => (
  <Feature features={['datascrubbers-v2']}>
    {({hasFeature, features}) =>
      hasFeature ? (
        <ProjectDataPrivacyContent params={params} organization={organization} />
      ) : (
        <FeatureDisabled
          alert={PanelAlert}
          features={features}
          featureName={t('Data Privacy - new')}
        />
      )
    }
  </Feature>
);

export default ProjectDataPrivacy;
