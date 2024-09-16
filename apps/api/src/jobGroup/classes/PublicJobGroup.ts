import { PublicJob } from '@api/job/classes/PublicJob';
import { JobGroupEntity } from '@app/database';

export class PublicJobGroup
  implements Omit<JobGroupEntity, 'createdAt' | 'updatedAt' | 'jobs'>
{
  id: string;
  name: string;
  jobs: PublicJob[];

  // eslint-disable-next-line
  constructor(entity: JobGroupEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate) this.jobs = entity.jobs.map(job => new PublicJob(job, false));
  }
}
