import {Organization} from 'app/types';

export type DataPrivacy = {
  organization: Organization;
  params: {
    orgId: string;
    projectId: string;
  };
};
