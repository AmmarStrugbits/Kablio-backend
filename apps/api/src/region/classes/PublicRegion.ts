import { PublicRegionGroup } from '@api/regionGroup/classes/PublicRegionGroup';
import { RegionEntity } from '@app/database/entities/Region.entity';

/**
 * Represents a public region.
 */
export class PublicRegion
  implements Omit<RegionEntity, 'createdAt' | 'updatedAt' | 'group'>
{
  id: string;
  name: string;
  group: PublicRegionGroup;

  // eslint-disable-next-line
  constructor(entity: RegionEntity, populate = true) {
    this.id = entity.id;
    this.name = entity.name;
    if (populate) this.group = new PublicRegionGroup(entity.group, false);
  }
}
