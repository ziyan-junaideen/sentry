import React from 'react';
import PropTypes from 'prop-types';

import {t} from 'app/locale';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import PermissionAlert from 'app/views/settings/project/permissionAlert';
import JsonForm from 'app/views/settings/components/forms/jsonForm';
import Form from 'app/views/settings/components/forms/form';
import {fields} from 'app/data/forms/projectGeneralSettings';
import AsyncView from 'app/views/asyncView';
import ProjectActions from 'app/actions/projectActions';
import {changeProjectSlug} from 'app/actionCreators/projects';
import {OrganizationSummary} from 'app/types';

type Props = {
  onChangeSlug: (slug: any) => void;
  organization: OrganizationSummary;
  params: {
    orgId: string;
    projectId: string;
  };
};

class ProjectDataPrivacyContent extends AsyncView<Props> {
  static propTypes = {
    onChangeSlug: PropTypes.func,
  };

  static contextTypes = {
    organization: PropTypes.object.isRequired,
  };

  // @ts-ignore
  getEndpoints() {
    const {orgId, projectId} = this.props.params;
    const endpoints = [['data', `/projects/${orgId}/${projectId}/`]];
    const {organization} = this.context;
    const features = new Set(organization.features);
    if (features.has('set-grouping-config') || features.has('tweak-grouping-config')) {
      endpoints.push(['groupingConfigs', '/grouping-configs/']);
      endpoints.push(['groupingEnhancementBases', '/grouping-enhancements/']);
    }
    return endpoints;
  }

  renderBody() {
    const {organization} = this.context;
    const project = this.state.data;
    const {orgId, projectId} = this.props.params;
    const endpoint = `/projects/${orgId}/${projectId}/`;
    const access = new Set(organization.access);
    return (
      <React.Fragment>
        <SettingsPageHeader title={t('Data Privacy')} />
        <PermissionAlert />
        <Form
          saveOnBlur
          allowUndo
          initialData={{
            ...project,
          }}
          apiMethod="PUT"
          apiEndpoint={endpoint}
          onSubmitSuccess={resp => {
            // this is necessary for the grouping upgrade button to be
            // updating based on the current selection of the grouping
            // config.
            this.setState({data: resp});
            if (projectId !== resp.slug) {
              changeProjectSlug(projectId, resp.slug);
              // Container will redirect after stores get updated with new slug
              this.props.onChangeSlug(resp.slug);
            }
            // This will update our project context
            ProjectActions.updateSuccess(resp);
          }}
        >
          <JsonForm
            additionalFieldProps={{
              organization,
              groupingConfigs: this.state.groupingConfigs,
              groupingEnhancementBases: this.state.groupingEnhancementBases,
            }}
            features={new Set(organization.features)}
            access={access}
            disabled={!access.has('project:write')}
            title={t('Data Privacy')}
            fields={[
              fields.dataScrubber,
              fields.dataScrubberDefaults,
              fields.scrubIPAddresses,
              fields.sensitiveFields,
              fields.safeFields,
              fields.storeCrashReports,
              fields.relayPiiConfig,
            ]}
          />
        </Form>
      </React.Fragment>
    );
  }
}

export default ProjectDataPrivacyContent;
