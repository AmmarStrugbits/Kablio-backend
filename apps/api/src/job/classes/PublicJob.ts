import { PublicJobGroup } from '@api/jobGroup/classes/PublicJobGroup';
import { JobEntity } from '@app/database';

export class PublicJob implements Omit<JobEntity, 'createdAt' | 'updatedAt' | 'group'> {
  id: string;
  name: string;
  group: PublicJobGroup;

  // eslint-disable-next-line
  constructor(entity: JobEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate) this.group = new PublicJobGroup(entity.group, false);
  }
}
