import React from 'react';

import {t} from 'app/locale';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import PermissionAlert from 'app/views/settings/project/permissionAlert';
import JsonForm from 'app/views/settings/components/forms/jsonForm';
import Form from 'app/views/settings/components/forms/form';
import {fields} from 'app/data/forms/projectGeneralSettings';

type Props = {
  organization: {
    features: Array<string>;
    access: Array<string>;
  };
  params: {
    orgId: string;
    projectId: string;
  };
  project: {
    team?: {
      slug: string;
    };
  };
};

const ProjectDatascrubbersContent = ({
  organization,
  params: {orgId, projectId},
  project,
}: Props) => {
  const access = new Set(organization.access);
  return (
    <React.Fragment>
      <SettingsPageHeader title={t('Datascrubbers Settings')} />
      <PermissionAlert />
      <Form
        initialData={{
          ...project,
          team: project.team && project.team.slug,
        }}
        apiMethod="PUT"
        apiEndpoint={`/projects/${orgId}/${projectId}/`}
        // onSubmitSuccess={resp => {
        //   // this is necessary for the grouping upgrade button to be
        //   // updating based on the current selection of the grouping
        //   // config.
        //   this.setState({data: resp});
        //   if (projectId !== resp.slug) {
        //     changeProjectSlug(projectId, resp.slug);
        //     // Container will redirect after stores get updated with new slug
        //     this.props.onChangeSlug(resp.slug);
        //   }
        //   // This will update our project context
        //   ProjectActions.updateSuccess(resp);
        // }}
        saveOnBlur
        allowUndo
      >
        <JsonForm
          // @ts-ignore Type 'Set<string>' is not assignable to type 'string[]'
          features={new Set(organization.features)}
          disabled={!access.has('project:write')}
          additionalFieldProps={{
            organization,
            // groupingConfigs: this.state.groupingConfigs,
            // groupingEnhancementBases: this.state.groupingEnhancementBases,
          }}
          access={access}
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
};

export default ProjectDatascrubbersContent;
