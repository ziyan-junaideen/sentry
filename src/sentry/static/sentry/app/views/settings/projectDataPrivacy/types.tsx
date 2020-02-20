import {OrganizationSummary} from 'app/types';

export type DataPrivacy = {
  organization: OrganizationSummary;
  params: {
    orgId: string;
    projectId: string;
  };
};
