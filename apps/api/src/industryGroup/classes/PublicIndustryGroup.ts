import { PublicIndustry } from '@api/industry/classes/PublicIndustry';
import { IndustryGroupEntity } from '@app/database';

export class PublicIndustryGroup
  implements Omit<IndustryGroupEntity, 'createdAt' | 'updatedAt' | 'industries'>
{
  id: string;
  name: string;
  industries: PublicIndustry[];

  // eslint-disable-next-line
  constructor(entity: IndustryGroupEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate)
      this.industries = entity.industries.map(
        industry => new PublicIndustry(industry, false),
      );
  }
}
