interface EntityFactory<TEntity> {
  create(...args: never): TEntity | Promise<TEntity>;
}

export default EntityFactory;
