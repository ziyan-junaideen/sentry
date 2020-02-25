import React from 'react';
import PropTypes from 'prop-types';

import {t} from 'app/locale';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import PermissionAlert from 'app/views/settings/project/permissionAlert';
import JsonForm from 'app/views/settings/components/forms/jsonForm';
import Form from 'app/views/settings/components/forms/form';
import {fields} from 'app/data/forms/projectGeneralSettings';
import AsyncView from 'app/views/asyncView';
import {GetEndPointsOutput} from 'app/components/asyncComponent';
import ProjectActions from 'app/actions/projectActions';

import {DataPrivacy} from './types';

class ProjectDataPrivacyContent extends AsyncView<DataPrivacy> {
  static contextTypes = {
    organization: PropTypes.object.isRequired,
    router: PropTypes.object,
  };

  getEndpoints() {
    const {orgId, projectId} = this.props.params;
    const endpoints: GetEndPointsOutput = [['data', `/projects/${orgId}/${projectId}/`]];
    return endpoints;
  }

  renderBody() {
    const {organization} = this.context;
    const project = this.state.data;
    const {orgId, projectId} = this.props.params;
    const endpoint = `/projects/${orgId}/${projectId}/`;
    const access = new Set(organization.access);
    const features = new Set(organization.features);

    return (
      <React.Fragment>
        <SettingsPageHeader title={t('Data Privacy')} />
        <PermissionAlert />
        <Form
          saveOnBlur
          allowUndo
          initialData={project}
          apiMethod="PUT"
          apiEndpoint={endpoint}
          onSubmitSuccess={resp => {
            // This will update our project context
            ProjectActions.updateSuccess(resp);
          }}
        >
          <JsonForm
            title={t('Data Privacy')}
            additionalFieldProps={{
              organization,
            }}
            features={features}
            disabled={!access.has('project:write')}
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
