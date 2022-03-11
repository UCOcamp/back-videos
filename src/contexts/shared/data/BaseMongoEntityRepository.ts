import { AggregateRoot } from '@nestjs/cqrs';
import IdentifiableEntitySchema from './IdentifiableEntitySchema';
import MongoEntityRepository from './MongoEntityRepository';
import { FilterQuery } from 'mongoose';
abstract class BaseMongoEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends MongoEntityRepository<TSchema, TEntity> {
  protected async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ id: id });
  }
  protected async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
  protected async findOneAndUpdateById(
    id: string,
    entity: TEntity
  ): Promise<void> {
    await this.findOneAndUpdate({ id: id } as FilterQuery<TSchema>, entity);
  }
}

export default BaseMongoEntityRepository;
