import { Prop, Schema } from '@nestjs/mongoose';
import IdentifiableEntitySchema from '../../../../../shared/data/IdentifiableEntitySchema';

@Schema({
  versionKey: false,
  timestamps: false,
  id: false,
  collection: 'videos',
})
class VideoSchema extends IdentifiableEntitySchema {
  @Prop({
    required: true,
  })
  readonly title!: string;
  @Prop({
    required: true,
  })
  readonly course!: string;
  @Prop({
    required: true,
  })
  readonly url!: string;

  @Prop({
    required: true,
  })
  readonly thumbnailUrl!: string;
}

export default VideoSchema;
