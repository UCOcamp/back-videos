import { AggregateRoot } from '@nestjs/cqrs';
import EntitySchemaFactory from './EntitySchemaFactory';
import IdentifiableEntitySchema from './IdentifiableEntitySchema';
import { Model, FilterQuery } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';

abstract class MongoEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >
  ) {}

  protected async findOne(
    entityFilterQuery: FilterQuery<TSchema>
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true }
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createEntityFromSchema(entityDocument);
  }
  protected async find(
    entityFilterQuery: FilterQuery<TSchema>
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
    ).map((entityDocument) =>
      this.entitySchemaFactory.createEntityFromSchema(entityDocument)
    );
  }
  protected async findOneAndUpdate(
    filter: FilterQuery<TSchema>,
    entity: TEntity
  ): Promise<void> {
    const updatedEntityDocument = await this.entityModel.findOneAndReplace(
      filter,
      this.entitySchemaFactory.createSchemaFromEntity(entity),
      {
        new: true,
        useFindAndModify: false,
        lean: true,
      }
    );

    if (!updatedEntityDocument)
      throw new NotFoundException('Not able to found the entity to replace');
  }
  protected async create(entity: TEntity): Promise<void> {
    await new this.entityModel(
      this.entitySchemaFactory.createSchemaFromEntity(entity)
    ).save();
  }
}

export default MongoEntityRepository;
