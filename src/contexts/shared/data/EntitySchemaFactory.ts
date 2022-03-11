import { AggregateRoot } from '@nestjs/cqrs';
import IdentifiableEntitySchema from './IdentifiableEntitySchema';

interface EntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> {
  createSchemaFromEntity(entity: TEntity): TSchema;
  createEntityFromSchema(entitySchema: TSchema): TEntity;
}

export default EntitySchemaFactory;
