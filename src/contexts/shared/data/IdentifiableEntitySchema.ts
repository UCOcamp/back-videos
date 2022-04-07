import { Prop } from '@nestjs/mongoose';

abstract class IdentifiableEntitySchema {
  @Prop({
    required: true,
    unique: true,
  })
  id!: string;
}

export default IdentifiableEntitySchema;
