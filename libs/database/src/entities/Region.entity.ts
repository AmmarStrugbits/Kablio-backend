import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { RegionRepository } from '@app/database/repositories/Region.repository';
import {
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({
  tableName: 'region',
  customRepository: () => RegionRepository,
})
@Unique<RegionEntity>({ properties: ['name', 'group'] })
export class RegionEntity extends BaseEntity {
  [EntityRepositoryType]?: RegionRepository;

  @Property({ name: 'name', type: 'varchar' })
  @Index()
  name!: string;

  @ManyToOne({
    entity: () => RegionGroupEntity,
    name: 'region_group',
    onDelete: 'cascade',
  })
  group!: RegionGroupEntity;
}
