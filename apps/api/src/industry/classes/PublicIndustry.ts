import { PublicIndustryGroup } from '@api/industryGroup/classes/PublicIndustryGroup';
import { IndustryEntity } from '@app/database/entities/Industry.entity';

export class PublicIndustry
  implements Omit<IndustryEntity, 'createdAt' | 'updatedAt' | 'group'>
{
  id: string;
  name: string;
  group: PublicIndustryGroup;

  // eslint-disable-next-line
  constructor(entity: IndustryEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate) this.group = new PublicIndustryGroup(entity.group, false);
  }
}
