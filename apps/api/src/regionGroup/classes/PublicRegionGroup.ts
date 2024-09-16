import { PublicRegion } from '@api/region/classes/PublicRegion';
import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';

export class PublicRegionGroup
  implements Omit<RegionGroupEntity, 'createdAt' | 'updatedAt' | 'regions'>
{
  id: string;
  name: string;
  regions: PublicRegion[];

  // eslint-disable-next-line
  constructor(entity: RegionGroupEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate)
      this.regions = entity.regions.map(region => new PublicRegion(region, false));
  }
}
